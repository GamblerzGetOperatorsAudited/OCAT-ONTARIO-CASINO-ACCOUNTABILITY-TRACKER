import { CASINO_LIST, getSeverityLabel } from "@shared/ocat";
import { ISSUE_CATEGORIES } from "@shared/issue-categories";
import { useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";

interface AllegationWizardProps {
  onClose: () => void;
  onSuccess: () => void;
}

type Answers = Record<string, string>;

interface FormData {
  casinoName: string;
  issueCategory: string;
  description: string;
  incidentDate: string;
  answers: Answers;
}

const EMPTY_FORM: FormData = {
  casinoName: "",
  issueCategory: "",
  description: "",
  incidentDate: "",
  answers: {},
};

export default function AllegationWizard({ onClose, onSuccess }: AllegationWizardProps) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const utils = trpc.useUtils();

  const createMutation = trpc.reports.create.useMutation({
    onSuccess: (data) => {
      toast.success(`Allegation filed — OCAT ID: ${data?.ocatId}`);
      utils.reports.list.invalidate();
      utils.reports.stats.invalidate();
      onSuccess();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const scoreQuery = trpc.reports.computeScore.useQuery(
    { answers: form.answers },
    { enabled: Object.keys(form.answers).length > 0 }
  );

  const currentCategory = ISSUE_CATEGORIES.find((c) => c.id === form.issueCategory);
  const currentQuestions = currentCategory?.questions || [];

  const handleNext = () => {
    if (step === 1 && (!form.casinoName || !form.issueCategory || !form.description || !form.incidentDate)) {
      toast.error("Please fill in all fields");
      return;
    }
    setStep(step + 1);
  };

  const handlePrev = () => setStep(step - 1);

  const handleSubmit = async () => {
    if (Object.keys(form.answers).length === 0) {
      toast.error("Please answer at least one question");
      return;
    }
    createMutation.mutate({
      casinoName: form.casinoName,
      category: form.issueCategory,
      description: form.description,
      incidentDate: form.incidentDate,
      answers: form.answers,
    });
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setForm({
      ...form,
      answers: {
        ...form.answers,
        [questionId]: value,
      },
    });
  };

  const answeredCount = Object.keys(form.answers).length;
  const totalQuestions = currentQuestions.length;
  const progressPercent = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg border-4 border-black">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b-4 border-black p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">Step {step} of 2</div>
              <h2 className="font-black text-3xl uppercase leading-tight">
                {step === 1 ? "File Allegation" : "Answer Questions"}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-2xl font-black hover:opacity-50 transition"
            >
              ✕
            </button>
          </div>

          {/* Progress bar for step 2 */}
          {step === 2 && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono uppercase tracking-widest">Progress</span>
                <span className="text-xs font-mono font-bold">
                  {answeredCount}/{totalQuestions}
                </span>
              </div>
              <div className="h-2 bg-gray-200 border-2 border-black">
                <div
                  className="h-full bg-black transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {step === 1 ? (
            // Step 1: Basic Info
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest mb-2">Casino Name</label>
                <select
                  value={form.casinoName}
                  onChange={(e) => setForm({ ...form, casinoName: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-black font-bold text-sm focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="">Select a casino...</option>
                  {CASINO_LIST.map((casino) => (
                    <option key={casino} value={casino}>
                      {casino}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest mb-2">Issue Category</label>
                <select
                  value={form.issueCategory}
                  onChange={(e) => setForm({ ...form, issueCategory: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-black font-bold text-sm focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="">Select an issue...</option>
                  {ISSUE_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name} — {cat.description.slice(0, 40)}...
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest mb-2">Incident Date</label>
                <input
                  type="date"
                  value={form.incidentDate}
                  onChange={(e) => setForm({ ...form, incidentDate: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-black font-bold text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest mb-2">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe what happened..."
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-black font-mono text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>
          ) : (
            // Step 2: Questions
            <div className="space-y-6">
              <div className="bg-amber-50 border-2 border-amber-900 p-4">
                <div className="text-xs font-mono uppercase tracking-widest text-amber-900 mb-1">Issue</div>
                <div className="font-black text-lg uppercase text-amber-900">{currentCategory?.name}</div>
                <div className="text-xs text-amber-800 mt-2">{currentCategory?.description}</div>
              </div>

              <div className="space-y-4">
                {currentQuestions.map((q) => (
                  <div key={q.id} className="border-2 border-black p-4 hover:bg-gray-50 transition">
                    <div className="text-xs font-mono text-gray-500 mb-2">{q.id}</div>
                    <p className="font-bold text-sm mb-3">{q.text}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAnswerChange(q.id, "Yes")}
                        className={`flex-1 px-3 py-2 border-2 border-black font-bold text-sm transition ${
                          form.answers[q.id] === "Yes"
                            ? "bg-black text-white"
                            : "bg-white text-black hover:bg-gray-100"
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => handleAnswerChange(q.id, "No")}
                        className={`flex-1 px-3 py-2 border-2 border-black font-bold text-sm transition ${
                          form.answers[q.id] === "No"
                            ? "bg-black text-white"
                            : "bg-white text-black hover:bg-gray-100"
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {scoreQuery.data && (
                <div className="bg-blue-50 border-2 border-blue-900 p-4">
                  <div className="text-xs font-mono uppercase tracking-widest text-blue-900 mb-1">Severity Score</div>
                  <div className="font-black text-2xl text-blue-900">{scoreQuery.data.score}/100</div>
                  <div className="text-sm font-bold text-blue-900 mt-1">{getSeverityLabel(scoreQuery.data.score)}</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t-4 border-black p-6 flex gap-3">
          {step === 2 && (
            <Button
              onClick={handlePrev}
              variant="outline"
              className="flex-1 border-2 border-black font-bold"
            >
              ← Back
            </Button>
          )}
          {step === 1 ? (
            <Button
              onClick={handleNext}
              className="flex-1 bg-black text-white font-bold border-2 border-black hover:bg-gray-900"
            >
              Next →
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={createMutation.isPending}
              className="flex-1 bg-black text-white font-bold border-2 border-black hover:bg-gray-900"
            >
              {createMutation.isPending ? "Filing..." : "File Allegation"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
