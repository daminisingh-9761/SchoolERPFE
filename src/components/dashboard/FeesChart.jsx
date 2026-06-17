import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function FeesChart() {
  const data = [
    { month: "Jan", fees: 4000 },
    { month: "Feb", fees: 3000 },
    { month: "Mar", fees: 5000 },
    { month: "Apr", fees: 4500 },
    { month: "May", fees: 6000 },
  ];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="mt-1 text-xl titlecase text-slate-700">
            Fees Collection
          </h2>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} margin={{ top: 10, right: 12, left: -10, bottom: 0 }}>
          <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" vertical={false} />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }}
          />
          <Tooltip
            cursor={{ fill: "#f1f5f9" }}
            contentStyle={{
              border: "1px solid #e2e8f0",
              borderRadius: "14px",
              boxShadow: "0 18px 45px rgba(15, 23, 42, 0.12)",
            }}
          />
          <Bar
            dataKey="fees"
            fill="#4f7bb0"
            radius={[12, 12, 0, 0]}
            barSize={48}
          />

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default FeesChart;
