import { getSeverityLabel, getSeverityStyle } from "@shared/ocat";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { useLocation } from "wouter";
import AllegationWizard from "@/components/AllegationWizard";
import OcatLayout from "@/components/OcatLayout";

export default function Dashboard() {
  const [, navigate] = useLocation();
  const [showWizard, setShowWizard] = useState(false);
  const [search, setSearch] = useState("");
  const [filterCasino, setFilterCasino] = useState("");
  const [page, setPage] = useState(0);
  const LIMIT = 10;

  const reportsQuery = trpc.reports.list.useQuery({
    limit: LIMIT,
    offset: page * LIMIT,
    search: search || undefined,
    casino: filterCasino || undefined,
  });

  const statsQuery = trpc.reports.stats.useQuery();

  const reports = reportsQuery.data?.rows ?? [];
  const total = reportsQuery.data?.total ?? 0;
  const stats = statsQuery.data;

  return (
    <OcatLayout>
      <div className="p-6 lg:p-10">
        {/* Page Header */}
        <div className="mb-10 border-b-4 border-black pb-6">
          <div className="text-[10px] font-mono tracking-[0.3em] text-gray-400 uppercase mb-2">
            [ Public Registry ]
          </div>
          <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-none">
            CAMPAIGN<br />
            <span className="text-[oklch(0.75_0.18_85)]">BOARD</span>
          </h1>
          <div className="flex items-center gap-6 mt-4">
            <div>
              <div className="text-3xl font-black">{stats?.total ?? 0}</div>
              <div className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Total Allegations</div>
            </div>
            <div className="w-px h-10 bg-black"></div>
            <div>
              <div className="text-3xl font-black">{stats?.avgSeverity ?? 0}%</div>
              <div className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Avg. Risk Score</div>
            </div>
            <div className="w-px h-10 bg-black"></div>
            <div>
              <div className="text-3xl font-black">{stats?.byCasino?.length ?? 0}</div>
              <div className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Operators Named</div>
            </div>
          </div>
        </div>

        {/* Compliance Comparison Bar */}
        {stats && stats.byCasino.length > 0 && (
          <div className="bg-black text-white p-6 mb-8 border-4 border-black">
            <div className="text-[10px] font-mono tracking-widest uppercase text-white/50 mb-4">
              Compliance Comparison — Reports by Operator
            </div>
            <div className="space-y-3">
              {stats.byCasino.slice(0, 6).map((s) => {
                const maxCount = stats.byCasino[0]?.count ?? 1;
                const pct = Math.round((s.count / maxCount) * 100);
                return (
                  <div key={s.casino}>
                    <div className="flex justify-between text-[10px] font-mono mb-1">
                      <span className="text-white/70">{s.casino}</span>
                      <span className="text-[oklch(0.75_0.18_85)]">{s.count} reports · {Math.round(Number(s.avgSeverity))}% risk</span>
                    </div>
                    <div className="w-full bg-white/10 h-2">
                      <div
                        className="bg-[oklch(0.75_0.18_85)] h-2 transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Search allegations, OCAT IDs, casinos..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            className="flex-1 border-3 border-black p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.75_0.18_85)]"
            style={{ border: "3px solid black" }}
          />
          <select
            value={filterCasino}
            onChange={(e) => { setFilterCasino(e.target.value); setPage(0); }}
            className="border-3 border-black p-3 font-mono text-sm bg-white focus:outline-none"
            style={{ border: "3px solid black" }}
          >
            <option value="">All Operators</option>
            {stats?.byCasino.map((s) => (
              <option key={s.casino} value={s.casino}>{s.casino}</option>
            ))}
          </select>
          <button
            onClick={() => setShowWizard(true)}
            className="border-4 border-black bg-black text-white font-black text-xs tracking-widest uppercase px-6 py-3 hover:bg-white hover:text-black transition-all whitespace-nowrap"
          >
            + FILE ALLEGATION
          </button>
        </div>

        {/* Report Count */}
        <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-4">
          {reportsQuery.isLoading ? "Loading..." : `Showing ${reports.length} of ${total} allegations`}
        </div>

        {/* Report Feed */}
        <div className="space-y-4">
          {reportsQuery.isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="border-3 border-gray-200 p-6 animate-pulse" style={{ border: "3px solid #e5e7eb" }}>
                <div className="h-4 bg-gray-100 rounded w-1/4 mb-3"></div>
                <div className="h-6 bg-gray-100 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-100 rounded w-3/4"></div>
              </div>
            ))
          ) : reports.length === 0 ? (
            <div className="border-4 border-dashed border-gray-200 p-16 text-center">
              <div className="text-4xl font-black text-gray-200 mb-4">NO REPORTS</div>
              <div className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                {search || filterCasino ? "No results match your filters" : "Be the first to file an allegation"}
              </div>
            </div>
          ) : (
            reports.map((report) => {
              const sevLabel = getSeverityLabel(report.severityScore);
              const sevStyle = getSeverityStyle(report.severityScore);
              return (
                <div
                  key={report.id}
                  className="border-3 border-black bg-white hover:bg-gray-50 transition-all cursor-pointer"
                  style={{ border: "3px solid black" }}
                  onClick={() => navigate(`/report/${report.ocatId}`)}
                >
                  <div className="border-b-2 border-black px-4 py-2 flex justify-between items-center bg-black text-white">
                    <span className="text-[10px] font-mono tracking-widest">{report.ocatId}</span>
                    <div className="flex items-center gap-3">
                      <span className={`text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 ${sevStyle.bg} ${sevStyle.color}`}>
                        {sevLabel} {report.severityScore}%
                      </span>
                      <span className="text-[9px] font-mono text-white/60 uppercase">{report.status.replace("_", " ")}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          <h3 className="font-black text-xl tracking-tight uppercase">{report.casinoName}</h3>
                        </div>
                        <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">{report.issueCategory}</div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-[10px] font-mono text-gray-400">FILED</div>
                        <div className="text-xs font-mono font-bold">{new Date(report.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <p className="text-sm font-mono text-gray-600 leading-relaxed line-clamp-2">{report.description}</p>
                    <div className="mt-3 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                      Click to view full case →
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination */}
        {total > LIMIT && (
          <div className="flex justify-between items-center mt-8 border-t-2 border-black pt-6">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="border-2 border-black px-6 py-2 font-black text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-all disabled:opacity-30"
            >
              ← PREV
            </button>
            <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
              Page {page + 1} of {Math.ceil(total / LIMIT)}
            </div>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={(page + 1) * LIMIT >= total}
              className="border-2 border-black px-6 py-2 font-black text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-all disabled:opacity-30"
            >
              NEXT →
            </button>
          </div>
        )}
      </div>

      {showWizard && (
        <AllegationWizard
          onClose={() => setShowWizard(false)}
          onSuccess={() => setShowWizard(false)}
        />
      )}
    </OcatLayout>
  );
}
