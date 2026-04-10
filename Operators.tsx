import { getSeverityLabel, getSeverityStyle } from "@shared/ocat";
import { GAMING_WEBSITES, getWebsitesByOperator } from "@shared/gaming-websites";
import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import OcatLayout from "@/components/OcatLayout";

export default function Operators() {
  const [, navigate] = useLocation();
  const [search, setSearch] = useState("");
  const [expandedOperator, setExpandedOperator] = useState<number | null>(null);
  const casinosQuery = trpc.casinos.list.useQuery();
  const casinos = casinosQuery.data ?? [];

  const filtered = casinos.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.operator ?? "").toLowerCase().includes(search.toLowerCase())
  );

  // Sort by report count desc
  const sorted = [...filtered].sort((a, b) => b.reportCount - a.reportCount);

  return (
    <OcatLayout>
      <div className="p-6 lg:p-10">
        {/* Header */}
        <div className="mb-10 border-b-4 border-black pb-6">
          <div className="text-[10px] font-mono tracking-[0.3em] text-gray-400 uppercase mb-2">
            [ Licensed Operators ]
          </div>
          <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-none">
            OPERATOR<br />
            <span className="text-[oklch(0.75_0.18_85)]">DIRECTORY</span>
          </h1>
          <p className="mt-4 text-sm font-mono text-gray-500">
            All {casinos.length} iGaming Ontario licensed operators with {GAMING_WEBSITES.length} regulated gaming websites. Complaint counts and risk scores derived from filed allegations.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search operators..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md border-3 border-black p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.75_0.18_85)]"
            style={{ border: "3px solid black" }}
          />
        </div>

        {/* Summary Bar */}
        <div className="flex gap-6 mb-8 border-b-2 border-black pb-6">
          <div>
            <div className="text-3xl font-black">{casinos.length}</div>
            <div className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Licensed Operators</div>
          </div>
          <div className="w-px bg-black"></div>
          <div>
            <div className="text-3xl font-black">{casinos.reduce((s, c) => s + c.reportCount, 0)}</div>
            <div className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Total Allegations</div>
          </div>
          <div className="w-px bg-black"></div>
          <div>
            <div className="text-3xl font-black">{casinos.filter((c) => c.reportCount > 0).length}</div>
            <div className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Named in Reports</div>
          </div>
        </div>

        {/* Operator Cards */}
        {casinosQuery.isLoading ? (
          <div className="grid md:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="border-3 border-gray-200 p-6 animate-pulse h-36" style={{ border: "3px solid #e5e7eb" }}></div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {sorted.map((casino) => {
              const sevLabel = casino.reportCount > 0 ? getSeverityLabel(casino.avgSeverity) : null;
              const sevStyle = casino.reportCount > 0 ? getSeverityStyle(casino.avgSeverity) : null;
              return (
                <div
                  key={casino.id}
                  className="border-3 border-black bg-white hover:bg-gray-50 transition-all cursor-pointer"
                  style={{ border: "3px solid black" }}
                  onClick={() => navigate(`/dashboard?casino=${encodeURIComponent(casino.name)}`)}
                >
                  <div className="border-b-2 border-black px-5 py-3 flex items-center justify-between">
                    <div className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">
                      {casino.licenseNumber ?? "License Pending"}
                    </div>
                    {casino.reportCount > 0 ? (
                      <div className={`text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 border ${sevStyle?.color} border-current`}>
                        {casino.reportCount} REPORT{casino.reportCount !== 1 ? "S" : ""}
                      </div>
                    ) : (
                      <div className="text-[9px] font-mono text-gray-300 uppercase tracking-widest">
                        NO REPORTS
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="font-black text-lg uppercase tracking-tight mb-1">{casino.name}</div>
                    <div className="text-xs font-mono text-gray-400 mb-3">{casino.operator ?? "Independent Operator"}</div>
                    {casino.reportCount > 0 && sevLabel ? (
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="text-[9px] font-mono text-gray-400 uppercase tracking-widest mb-1">Avg. Risk Score</div>
                          <div className={`text-xl font-black ${sevStyle?.color}`}>{casino.avgSeverity}%</div>
                        </div>
                        <div className="flex-1">
                          <div className="w-full bg-gray-100 h-2">
                            <div
                              className="h-2 bg-black transition-all"
                              style={{ width: `${casino.avgSeverity}%` }}
                            ></div>
                          </div>
                          <div className={`text-[9px] font-mono font-bold uppercase tracking-widest mt-1 ${sevStyle?.color}`}>
                            {sevLabel} RISK
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-[10px] font-mono text-gray-300 uppercase tracking-widest">
                        Clean record — no allegations filed
                      </div>
                    )}
                    
                    {/* Gaming Websites */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => setExpandedOperator(expandedOperator === casino.id ? null : casino.id)}
                        className="text-[9px] font-mono font-bold text-[oklch(0.75_0.18_85)] uppercase tracking-widest hover:underline"
                      >
                        {expandedOperator === casino.id ? "▼" : "▶"} {getWebsitesByOperator(casino.operator ?? "").length} Websites
                      </button>
                      {expandedOperator === casino.id && (
                        <div className="mt-3 space-y-1 max-h-48 overflow-y-auto">
                          {getWebsitesByOperator(casino.operator ?? "").map((site) => (
                            <div key={site.id} className="text-[8px] font-mono text-gray-600 flex items-center justify-between">
                              <span className="truncate">{site.name}</span>
                              <span className="text-[7px] text-gray-400 uppercase tracking-widest ml-2 flex-shrink-0">
                                {site.categories.join(" • ")}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {filtered.length === 0 && !casinosQuery.isLoading && (
          <div className="border-4 border-dashed border-gray-200 p-16 text-center">
            <div className="text-4xl font-black text-gray-200 mb-4">NO RESULTS</div>
            <div className="text-xs font-mono text-gray-400 uppercase tracking-widest">
              No operators match your search
            </div>
          </div>
        )}
      </div>
    </OcatLayout>
  );
}
