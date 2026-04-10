import { QUESTION_GROUPS, getSeverityLabel, getSeverityStyle } from "@shared/ocat";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import OcatLayout from "@/components/OcatLayout";

interface ReportDetailProps {
  ocatId: string;
}

export default function ReportDetail({ ocatId }: ReportDetailProps) {
  const [, navigate] = useLocation();
  const reportQuery = trpc.reports.getByOcatId.useQuery({ ocatId });
  const report = reportQuery.data;

  if (reportQuery.isLoading) {
    return (
      <OcatLayout>
        <div className="p-10 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="text-4xl font-black tracking-tighter mb-2">LOADING</div>
            <div className="text-xs font-mono text-gray-400 uppercase tracking-widest">Retrieving case file...</div>
          </div>
        </div>
      </OcatLayout>
    );
  }

  if (!report) {
    return (
      <OcatLayout>
        <div className="p-10">
          <div className="text-4xl font-black mb-4">CASE NOT FOUND</div>
          <button onClick={() => navigate("/dashboard")} className="border-2 border-black px-6 py-3 font-black text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-all">
            ← BACK TO BOARD
          </button>
        </div>
      </OcatLayout>
    );
  }

  const answers = report.answers as Record<string, string>;
  const sevLabel = getSeverityLabel(report.severityScore);
  const sevStyle = getSeverityStyle(report.severityScore);

  // Compute per-group scores
  const groupScores = QUESTION_GROUPS.map((group) => {
    const total = group.questions.length;
    const yes = group.questions.filter((q) => answers[q.id] === "Yes").length;
    return { ...group, yes, total, pct: Math.round((yes / total) * 100) };
  });

  return (
    <OcatLayout>
      <div className="p-6 lg:p-10 max-w-4xl">
        {/* Back */}
        <button
          onClick={() => navigate("/dashboard")}
          className="text-[10px] font-mono text-gray-400 uppercase tracking-widest hover:text-black mb-6 inline-block"
        >
          ← BACK TO BOARD
        </button>

        {/* Case Header */}
        <div className="border-4 border-black mb-8">
          <div className="bg-black text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-[10px] font-mono tracking-widest text-white/50 uppercase mb-1">OCAT ID</div>
              <div className="text-2xl font-black font-mono">{report.ocatId}</div>
            </div>
            <div className={`px-4 py-2 font-black text-sm tracking-widest uppercase ${sevStyle.bg} ${sevStyle.color}`}>
              RISK: {sevLabel} — {report.severityScore}%
            </div>
          </div>
          <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6 border-b-2 border-black">
            <div>
              <div className="text-[9px] font-mono text-gray-400 uppercase tracking-widest mb-1">Operator</div>
              <div className="font-black text-sm uppercase">{report.casinoName}</div>
            </div>
            <div>
              <div className="text-[9px] font-mono text-gray-400 uppercase tracking-widest mb-1">Category</div>
              <div className="font-bold text-xs">{report.issueCategory}</div>
            </div>
            <div>
              <div className="text-[9px] font-mono text-gray-400 uppercase tracking-widest mb-1">Incident Date</div>
              <div className="font-mono text-sm">{report.incidentDate}</div>
            </div>
            <div>
              <div className="text-[9px] font-mono text-gray-400 uppercase tracking-widest mb-1">Filed</div>
              <div className="font-mono text-sm">{new Date(report.createdAt).toLocaleDateString()}</div>
            </div>
          </div>
          <div className="p-6">
            <div className="text-[9px] font-mono text-gray-400 uppercase tracking-widest mb-2">Incident Description</div>
            <p className="text-sm font-mono leading-relaxed text-gray-700">{report.description}</p>
          </div>
        </div>

        {/* Severity Score Breakdown */}
        <div className="mb-8">
          <div className="text-[10px] font-mono tracking-widest text-gray-400 uppercase mb-4">
            [ Severity Score Breakdown ]
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {groupScores.map((g) => {
              const gSevStyle = getSeverityStyle(g.pct);
              return (
                <div key={g.id} className="border-3 border-black p-4" style={{ border: "3px solid black" }}>
                  <div className="text-[9px] font-mono text-gray-400 uppercase tracking-widest mb-2 leading-tight">
                    {g.title.replace("Step 2: ", "").replace("Step 3: ", "").replace("Step 4: ", "").replace("Step 5: ", "")}
                  </div>
                  <div className={`text-2xl font-black ${gSevStyle.color}`}>{g.pct}%</div>
                  <div className="text-[9px] font-mono text-gray-400 mt-1">{g.yes}/{g.total} flagged</div>
                  <div className="w-full bg-gray-100 h-1 mt-2">
                    <div className="bg-black h-1 transition-all" style={{ width: `${g.pct}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Full Q&A */}
        <div>
          <div className="text-[10px] font-mono tracking-widest text-gray-400 uppercase mb-6">
            [ Systematic Question Responses — 20 Questions ]
          </div>
          <div className="space-y-8">
            {QUESTION_GROUPS.map((group, gIdx) => (
              <div key={group.id}>
                <div className="border-b-2 border-black pb-2 mb-4">
                  <div className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">{group.title}</div>
                </div>
                <div className="space-y-3">
                  {group.questions.map((q, qIdx) => {
                    const answer = answers[q.id];
                    const isYes = answer === "Yes";
                    const isNo = answer === "No";
                    return (
                      <div key={q.id} className="flex items-start gap-4">
                        <div className="text-[9px] font-mono text-gray-300 w-6 flex-shrink-0 mt-1">
                          Q{gIdx * 5 + qIdx + 1}
                        </div>
                        <div className="flex-1 flex items-start justify-between gap-4">
                          <p className="text-sm text-gray-700 leading-relaxed">{q.text}</p>
                          <div
                            className={`flex-shrink-0 px-3 py-1 font-black text-xs tracking-widest uppercase border-2 ${
                              isYes
                                ? "bg-[oklch(0.75_0.18_85)] border-[oklch(0.75_0.18_85)] text-black"
                                : isNo
                                ? "bg-black border-black text-white"
                                : "bg-gray-100 border-gray-200 text-gray-400"
                            }`}
                          >
                            {answer ?? "N/A"}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status */}
        <div className="mt-10 border-t-2 border-black pt-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[9px] font-mono text-gray-400 uppercase tracking-widest mb-1">Case Status</div>
              <div className="font-black text-sm uppercase tracking-widest">{report.status.replace("_", " ")}</div>
            </div>
            <div className="text-[10px] font-mono text-gray-300 uppercase tracking-widest">
              OCAT Registry · Public Record
            </div>
          </div>
        </div>
      </div>
    </OcatLayout>
  );
}
