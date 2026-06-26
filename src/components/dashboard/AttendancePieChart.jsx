import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

function AttendancePieChart({ present = 0, absent = 0 }) {
  const total = present + absent;
  const data = [
    { name: "Present", value: present },
    { name: "Absent", value: absent },
  ];
  const COLORS = ["#f59e0b", "#3b82f6"]; // amber for present, blue for absent

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const pct = total > 0 ? Math.round((payload[0].value / total) * 100) : 0;
      return (
        <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-lg text-sm">
          <span className="font-semibold" style={{ color: payload[0].payload.fill }}>
            {payload[0].name}:
          </span>{" "}
          <span className="text-slate-700 font-bold">
            {payload[0].value.toLocaleString()} ({pct}%)
          </span>
        </div>
      );
    }
    return null;
  };

  const presentPct = total > 0 ? Math.round((present / total) * 100) : 0;
  const absentPct = total > 0 ? Math.round((absent / total) * 100) : 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-slate-800">Today's Attendance</h3>
        <button className="text-slate-400 hover:text-slate-600 text-xl leading-none">···</button>
      </div>

      {/* Donut Chart — single thick ring */}
      <div className="relative flex justify-center items-center" style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={68}
              outerRadius={95}
              startAngle={90}
              endAngle={-270}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-extrabold text-slate-800">{total}</span>
            <span className="text-xs font-semibold text-slate-400">Total</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex justify-around">
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-400" />
            <span className="text-xl font-bold text-slate-800">{present.toLocaleString()}</span>
          </div>
          <span className="text-xs font-medium text-slate-400">Present ({presentPct}%)</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-xl font-bold text-slate-800">{absent.toLocaleString()}</span>
          </div>
          <span className="text-xs font-medium text-slate-400">Absent ({absentPct}%)</span>
        </div>
      </div>
    </div>
  );
}

export default AttendancePieChart;
