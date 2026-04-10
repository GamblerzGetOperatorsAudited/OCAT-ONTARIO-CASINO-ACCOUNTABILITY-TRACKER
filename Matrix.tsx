import { STANDARDS } from "@shared/ocat";
import OcatLayout from "@/components/OcatLayout";

export default function Matrix() {
  return (
    <OcatLayout>
      <div className="p-6 lg:p-10">
        {/* Header */}
        <div className="mb-10 border-b-4 border-black pb-6">
          <div className="text-[10px] font-mono tracking-[0.3em] text-gray-400 uppercase mb-2">
            [ Regulatory Knowledge Base ]
          </div>
          <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-none">
            REGULATION<br />
            <span className="text-[oklch(0.75_0.18_85)]">MATRIX</span>
          </h1>
          <p className="mt-4 text-sm font-mono text-gray-500 max-w-xl">
            AGCO iGaming Ontario regulatory standards that govern licensed operators. 
            Reference these when filing allegations to cite the specific breach.
          </p>
        </div>

        {/* Standards Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {STANDARDS.map((std) => (
            <div
              key={std.id}
              className="border-l-8 border-black bg-white p-6 border-3"
              style={{ border: "3px solid black", borderLeft: "8px solid black" }}
            >
              <div className="text-[9px] font-mono text-gray-400 uppercase tracking-widest mb-1">{std.agco}</div>
              <div className="text-xl font-black tracking-tight uppercase mb-1 text-[oklch(0.75_0.18_85)]">{std.id}</div>
              <div className="font-black text-base uppercase mb-3">{std.title}</div>
              <div className="w-8 h-0.5 bg-black mb-3"></div>
              <p className="text-sm font-mono text-gray-600 leading-relaxed">{std.desc}</p>
            </div>
          ))}
        </div>

        {/* Provincial Due Process */}
        <div className="border-4 border-black bg-black text-white p-8 mb-8">
          <div className="text-[10px] font-mono tracking-widest text-white/50 uppercase mb-4">
            [ Provincial Due Process ]
          </div>
          <h2 className="text-3xl font-black tracking-tighter mb-6">
            HOW TO ESCALATE<br />
            <span className="text-[oklch(0.75_0.18_85)]">YOUR COMPLAINT</span>
          </h2>
          <div className="space-y-4">
            {[
              { step: "01", title: "File Internal Complaint", desc: "Submit a formal complaint directly to the casino operator through their official dispute resolution channel." },
              { step: "02", title: "Obtain Case Number", desc: "Request and record your Internal Dispute ID number. This is required for all subsequent escalations." },
              { step: "03", title: "Wait 90-Day Response Period", desc: "Ontario regulations require operators to provide a final response within 90 days of your complaint." },
              { step: "04", title: "File via iAGCO Portal", desc: "If unresolved, escalate to the Alcohol and Gaming Commission of Ontario (AGCO) via the iAGCO portal." },
              { step: "05", title: "Contact iGaming Ontario", desc: "iGO oversees the market and can investigate systemic operator compliance failures." },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 border-b border-white/10 pb-4">
                <div className="text-3xl font-black text-[oklch(0.75_0.18_85)] font-mono flex-shrink-0 w-12">{item.step}</div>
                <div>
                  <div className="font-black text-sm uppercase tracking-tight mb-1">{item.title}</div>
                  <p className="text-xs font-mono text-white/60 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="border-3 border-black p-6" style={{ border: "3px solid black" }}>
          <div className="text-[10px] font-mono tracking-widest text-gray-400 uppercase mb-4">
            Official Resources
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { name: "AGCO iAGCO Portal", url: "https://www.agco.ca/iagco", desc: "File formal regulatory complaints" },
              { name: "iGaming Ontario", url: "https://www.igamingontario.ca", desc: "Market oversight & player protection" },
              { name: "ConnexOntario", url: "https://www.connexontario.ca", desc: "Mental health & addiction support" },
            ].map((r) => (
              <a
                key={r.name}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-black p-4 hover:bg-black hover:text-white transition-all group block"
              >
                <div className="font-black text-sm uppercase mb-1">{r.name}</div>
                <div className="text-[10px] font-mono text-gray-400 group-hover:text-white/60">{r.desc}</div>
                <div className="text-[10px] font-mono text-gray-300 group-hover:text-white/40 mt-2">→ Visit</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </OcatLayout>
  );
}
