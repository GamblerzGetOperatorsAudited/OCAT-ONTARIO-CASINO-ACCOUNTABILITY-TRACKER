import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function Gateway() {
  const { user, loading } = useAuth();
  const [, navigate] = useLocation();
  const profileQuery = trpc.user.profile.useQuery(undefined, { enabled: !!user, retry: false });

  useEffect(() => {
    if (!loading && user) {
      if (profileQuery.data) {
        if (profileQuery.data.agreementAccepted) {
          navigate("/dashboard");
        } else {
          navigate("/agreement");
        }
      }
    }
  }, [loading, user, profileQuery.data, navigate]);

  if (loading || (user && profileQuery.isLoading)) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-6xl font-black tracking-tighter">OCAT</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Player Safety Panel */}
      <div className="flex-1 bg-black text-white flex flex-col items-center justify-center p-12 text-center relative overflow-hidden min-h-[50vh]">
        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
        <div className="relative z-10 max-w-sm">
          <div className="text-[80px] font-black leading-none tracking-tighter text-emerald-400 mb-6">
            HELP
          </div>
          <div className="text-4xl font-black tracking-tighter mb-2 uppercase">Player Safety</div>
          <div className="w-16 h-1 bg-emerald-500 mx-auto mb-6"></div>
          <p className="text-sm font-mono text-white/60 leading-relaxed mb-8">
            Immediate tools for responsible gambling and self-exclusion resources. Your wellbeing comes first.
          </p>
          <a
            href="https://www.igamingontario.ca/en/player/responsible-gambling"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-3 border-emerald-500 bg-emerald-500 text-black font-black text-xs tracking-widest uppercase px-8 py-4 hover:bg-transparent hover:text-emerald-400 transition-all"
            style={{ border: "3px solid" }}
          >
            GET HELP NOW →
          </a>
          <div className="mt-6 text-[10px] font-mono text-white/30 uppercase tracking-widest">
            iGaming Ontario · AGCO · ConnexOntario
          </div>
        </div>
        {/* Decorative */}
        <div className="absolute bottom-8 right-8 text-[120px] font-black text-white/5 leading-none select-none">
          ⬛
        </div>
      </div>

      {/* OCAT Platform Panel */}
      <div className="flex-1 bg-white flex flex-col items-center justify-center p-12 text-center relative overflow-hidden min-h-[50vh] border-l-4 border-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-[oklch(0.75_0.18_85)]"></div>
        <div className="relative z-10 max-w-sm">
          <div className="text-[80px] font-black leading-none tracking-tighter text-black mb-2">
            OCAT
          </div>
          <div className="text-xs font-mono tracking-[0.3em] text-gray-400 mb-6 uppercase">
            Ontario Casino Accountability
          </div>
          <div className="w-16 h-1 bg-black mx-auto mb-6"></div>
          <p className="text-sm font-mono text-gray-500 leading-relaxed mb-8">
            Public database for regulatory accountability and fair player assurance. File allegations. Track compliance.
          </p>
          <button
            onClick={() => (window.location.href = getLoginUrl())}
            className="w-full border-4 border-black bg-black text-white font-black text-xs tracking-widest uppercase px-8 py-4 hover:bg-white hover:text-black transition-all"
          >
            ENTER REGISTRY →
          </button>
          <div className="mt-4 text-[10px] font-mono text-gray-300 uppercase tracking-widest">
            Sign in or create account to continue
          </div>
        </div>
        {/* Decorative bracket */}
        <div className="absolute bottom-8 left-8 text-[120px] font-black text-black/5 leading-none select-none">
          [
        </div>
        <div className="absolute top-8 right-8 text-[120px] font-black text-black/5 leading-none select-none">
          ]
        </div>
      </div>
    </div>
  );
}
