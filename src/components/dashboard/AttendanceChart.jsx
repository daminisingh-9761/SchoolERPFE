import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function AttendanceChart() {
  const data = [
    { month: "Jan", attendance: 90 },
    { month: "Feb", attendance: 92 },
    { month: "Mar", attendance: 88 },
    { month: "Apr", attendance: 95 },
    { month: "May", attendance: 94 },
  ];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="mt-1 text-xl titlecase text-slate-700">
            Attendance Overview
          </h2>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data} margin={{ top: 10, right: 12, left: -18, bottom: 0 }}>
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
            domain={[0, 100]}
            tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }}
          />
          <Tooltip
            contentStyle={{
              border: "1px solid #e2e8f0",
              borderRadius: "14px",
              boxShadow: "0 18px 45px rgba(15, 23, 42, 0.12)",
            }}
          />
          <Line
            type="monotone"
            dataKey="attendance"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 3, fill: "#ffffff" }}
            activeDot={{ r: 6, strokeWidth: 0, fill: "#2563eb" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AttendanceChart;
