import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { PILLARS } from "@shared/ocat";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

export default function Agreement() {
  const { user, loading } = useAuth();
  const [, navigate] = useLocation();
  const [accepted, setAccepted] = useState<Record<string, boolean>>({});

  const acceptMutation = trpc.user.acceptAgreement.useMutation({
    onSuccess: () => {
      navigate("/dashboard");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = getLoginUrl();
    }
  }, [loading, user]);

  const allAccepted = PILLARS.every((p) => accepted[p.id]);

  const handleSubmit = () => {
    if (!allAccepted) return;
    acceptMutation.mutate();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-6xl font-black tracking-tighter">OCAT</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b-4 border-black px-6 py-4 flex items-center justify-between">
        <div>
          <span className="text-2xl font-black tracking-tighter">OCAT</span>
          <span className="ml-3 text-[10px] font-mono tracking-widest text-gray-400 uppercase">Community Agreement</span>
        </div>
        <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Step 1 of 1</div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Title block */}
        <div className="mb-12">
          <div className="text-[10px] font-mono tracking-[0.3em] text-gray-400 uppercase mb-3">
            [ Contractual Consent Required ]
          </div>
          <h1 className="text-6xl font-black tracking-tighter leading-none mb-4">
            COMMUNITY<br />
            <span className="text-[oklch(0.75_0.18_85)]">AGREEMENT</span>
          </h1>
          <div className="w-24 h-1 bg-black mb-6"></div>
          <p className="text-sm font-mono text-gray-500 leading-relaxed">
            Before accessing the OCAT registry, you must acknowledge and accept all four platform pillars. 
            These agreements ensure the integrity of the accountability database.
          </p>
        </div>

        {/* Pillars */}
        <div className="space-y-4 mb-10">
          {PILLARS.map((pillar, idx) => {
            const isChecked = accepted[pillar.id] ?? false;
            return (
              <div
                key={pillar.id}
                onClick={() => setAccepted((prev) => ({ ...prev, [pillar.id]: !prev[pillar.id] }))}
                className={`border-3 p-5 cursor-pointer transition-all select-none ${
                  isChecked ? "border-black bg-black text-white" : "border-black bg-white text-black hover:bg-gray-50"
                }`}
                style={{ border: "3px solid black" }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-6 h-6 border-2 flex items-center justify-center flex-shrink-0 mt-0.5 font-black text-sm transition-all ${
                      isChecked ? "border-[oklch(0.75_0.18_85)] bg-[oklch(0.75_0.18_85)] text-black" : "border-current"
                    }`}
                  >
                    {isChecked ? "✓" : idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className={`text-[9px] font-mono tracking-widest uppercase mb-1 ${isChecked ? "text-white/60" : "text-gray-400"}`}>
                      Agreement {idx + 1} — {pillar.subtitle}
                    </div>
                    <div className="font-black text-base tracking-tight uppercase mb-2">{pillar.title}</div>
                    <p className={`text-xs leading-relaxed font-mono ${isChecked ? "text-white/70" : "text-gray-500"}`}>
                      {pillar.text}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex gap-1 mb-2">
            {PILLARS.map((p) => (
              <div
                key={p.id}
                className={`h-2 flex-1 transition-all ${accepted[p.id] ? "bg-black" : "bg-gray-200"}`}
              ></div>
            ))}
          </div>
          <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
            {Object.values(accepted).filter(Boolean).length} / {PILLARS.length} agreements accepted
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!allAccepted || acceptMutation.isPending}
          className={`w-full py-5 font-black text-sm tracking-widest uppercase border-4 transition-all ${
            allAccepted
              ? "border-black bg-black text-white hover:bg-white hover:text-black cursor-pointer"
              : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          {acceptMutation.isPending ? "PROCESSING..." : allAccepted ? "ENTER SECURE DATABASE →" : "ACCEPT ALL AGREEMENTS TO CONTINUE"}
        </button>

        <div className="mt-6 text-[10px] font-mono text-gray-300 text-center uppercase tracking-widest">
          Signed as: {user?.name ?? user?.email ?? "Anonymous"}
        </div>
      </div>
    </div>
  );
}
