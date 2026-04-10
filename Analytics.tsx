import { getSeverityLabel, getSeverityStyle } from "@shared/ocat";
import { trpc } from "@/lib/trpc";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, CartesianGrid, Legend,
} from "recharts";
import OcatLayout from "@/components/OcatLayout";

const COLORS = ["#f59e0b", "#ef4444", "#22c55e", "#3b82f6", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316"];

export default function Analytics() {
  const statsQuery = trpc.reports.stats.useQuery();
  const stats = statsQuery.data;

  if (statsQuery.isLoading) {
    return (
      <OcatLayout>
        <div className="p-10 flex items-center justify-center min-h-[60vh]">
          <div className="text-4xl font-black tracking-tighter">LOADING DATA...</div>
        </div>
      </OcatLayout>
    );
  }

  const byCasino = stats?.byCasino ?? [];
  const byCategory = stats?.byCategory ?? [];
  const byMonth = stats?.byMonth ?? [];
  const total = stats?.total ?? 0;
  const avgSeverity = stats?.avgSeverity ?? 0;

  const topCasino = byCasino[0];
  const topCategory = byCategory[0];
  const sevLabel = getSeverityLabel(avgSeverity);
  const sevStyle = getSeverityStyle(avgSeverity);

  // Prepare monthly trend data
  const monthlyData = byMonth.map((m) => ({
    month: m.month,
    reports: m.count,
    avgRisk: Math.round(Number(m.avgSeverity)),
  }));

  return (
    <OcatLayout>
      <div className="p-6 lg:p-10">
        {/* Header */}
        <div className="mb-10 border-b-4 border-black pb-6">
          <div className="text-[10px] font-mono tracking-[0.3em] text-gray-400 uppercase mb-2">
            [ Data Intelligence ]
          </div>
          <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-none">
            ANALYTICS<br />
            <span className="text-[oklch(0.75_0.18_85)]">DASHBOARD</span>
          </h1>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Allegations", value: total, sub: "All time" },
            { label: "Avg. Risk Score", value: `${avgSeverity}%`, sub: sevLabel, color: sevStyle.color },
            { label: "Operators Named", value: byCasino.length, sub: "Unique entities" },
            { label: "Categories", value: byCategory.length, sub: "Regulatory areas" },
          ].map((kpi) => (
            <div key={kpi.label} className="border-3 border-black p-5" style={{ border: "3px solid black" }}>
              <div className="text-[9px] font-mono text-gray-400 uppercase tracking-widest mb-2">{kpi.label}</div>
              <div className={`text-4xl font-black tracking-tighter ${kpi.color ?? ""}`}>{kpi.value}</div>
              <div className="text-[9px] font-mono text-gray-400 mt-1">{kpi.sub}</div>
            </div>
          ))}
        </div>

        {/* Monthly Trend */}
        {monthlyData.length > 0 && (
          <div className="border-3 border-black p-6 mb-8" style={{ border: "3px solid black" }}>
            <div className="text-[10px] font-mono tracking-widest text-gray-400 uppercase mb-6">
              Monthly Filing Trend — Last 12 Months
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fontFamily: "Space Mono" }} />
                <YAxis tick={{ fontSize: 10, fontFamily: "Space Mono" }} />
                <Tooltip
                  contentStyle={{ border: "2px solid black", borderRadius: 0, fontFamily: "Space Mono", fontSize: 11 }}
                />
                <Line type="monotone" dataKey="reports" stroke="#000" strokeWidth={3} dot={{ fill: "#000", r: 4 }} name="Reports" />
                <Line type="monotone" dataKey="avgRisk" stroke="#f59e0b" strokeWidth={2} dot={{ fill: "#f59e0b", r: 3 }} name="Avg Risk %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Reports by Casino */}
          {byCasino.length > 0 && (
            <div className="border-3 border-black p-6" style={{ border: "3px solid black" }}>
              <div className="text-[10px] font-mono tracking-widest text-gray-400 uppercase mb-6">
                Allegations by Operator
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={byCasino.slice(0, 8)} layout="vertical">
                  <XAxis type="number" tick={{ fontSize: 10, fontFamily: "Space Mono" }} />
                  <YAxis dataKey="casino" type="category" tick={{ fontSize: 9, fontFamily: "Space Mono" }} width={100} />
                  <Tooltip
                    contentStyle={{ border: "2px solid black", borderRadius: 0, fontFamily: "Space Mono", fontSize: 11 }}
                  />
                  <Bar dataKey="count" fill="#000" name="Reports" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Category Pie */}
          {byCategory.length > 0 && (
            <div className="border-3 border-black p-6" style={{ border: "3px solid black" }}>
              <div className="text-[10px] font-mono tracking-widest text-gray-400 uppercase mb-6">
                Breakdown by Regulatory Category
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={byCategory}
                    dataKey="count"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ category, count }) => `${count}`}
                    labelLine={false}
                  >
                    {byCategory.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ border: "2px solid black", borderRadius: 0, fontFamily: "Space Mono", fontSize: 10 }}
                    formatter={(value, name) => [value, name]}
                  />
                  <Legend
                    formatter={(value) => <span style={{ fontSize: 9, fontFamily: "Space Mono" }}>{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Risk Score Table */}
        {byCasino.length > 0 && (
          <div className="border-3 border-black" style={{ border: "3px solid black" }}>
            <div className="bg-black text-white px-6 py-3">
              <div className="text-[10px] font-mono tracking-widest uppercase">
                Operator Risk Score Ranking
              </div>
            </div>
            <div className="divide-y-2 divide-black">
              {byCasino.map((c, i) => {
                const sev = getSeverityLabel(Math.round(Number(c.avgSeverity)));
                return (
                  <div key={c.casino} className="px-6 py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-black text-gray-200 w-8">{i + 1}</div>
                      <div>
                        <div className="font-black text-sm uppercase">{c.casino}</div>
                        <div className="text-[9px] font-mono text-gray-400">{c.count} allegations filed</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-gray-100 h-2">
                        <div
                          className="h-2 bg-black transition-all"
                          style={{ width: `${Math.round(Number(c.avgSeverity))}%` }}
                        ></div>
                      </div>
                      <div className={`text-xs font-black uppercase tracking-widest w-20 text-right ${sevStyle.color}`}>
                        {Math.round(Number(c.avgSeverity))}% {sevLabel}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty state */}
        {total === 0 && (
          <div className="border-4 border-dashed border-gray-200 p-16 text-center">
            <div className="text-4xl font-black text-gray-200 mb-4">NO DATA YET</div>
            <div className="text-xs font-mono text-gray-400 uppercase tracking-widest">
              File the first allegation to populate analytics
            </div>
          </div>
        )}
      </div>
    </OcatLayout>
  );
}
