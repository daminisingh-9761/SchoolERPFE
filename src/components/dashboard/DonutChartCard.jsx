import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

function DonutChartCard({ title, data, colors, centerIcon, labels }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length && payload[0].name !== 'rest') {
      const pct = total > 0 ? Math.round((payload[0].value / total) * 100) : 0;
      return (
        <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-lg text-sm">
          <span className="font-semibold text-slate-700">{payload[0].name}:</span>{" "}
          <span style={{ color: payload[0].payload.fill }}>
            {payload[0].value.toLocaleString()} ({pct}%)
          </span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
        <button className="text-slate-400 hover:text-slate-600 text-xl leading-none">···</button>
      </div>

      {/* Chart area */}
      <div className="relative flex justify-center items-center" style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* Outer ring — item[0] */}
            <Pie
              data={[
                { name: data[0]?.name, value: data[0]?.value || 0 },
                { name: "rest", value: Math.max(0, total - (data[0]?.value || 0)) },
              ]}
              innerRadius={70}
              outerRadius={88}
              startAngle={90}
              endAngle={-270}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              <Cell fill={colors[0]} />
              <Cell fill="#e2e8f0" />
            </Pie>
            {/* Inner ring — item[1] */}
            <Pie
              data={[
                { name: data[1]?.name, value: data[1]?.value || 0 },
                { name: "rest", value: Math.max(0, total - (data[1]?.value || 0)) },
              ]}
              innerRadius={48}
              outerRadius={62}
              startAngle={90}
              endAngle={-270}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              <Cell fill={colors[1]} />
              <Cell fill="#e2e8f0" />
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {centerIcon && (
            <div className="flex items-center gap-1 text-3xl select-none">
              {centerIcon}
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex justify-around">
        {data.map((item, index) => {
          const pct = total > 0 ? Math.round((item.value / total) * 100) : 0;
          return (
            <div key={item.name} className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors[index % colors.length] }}
                />
                <span className="text-xl font-bold text-slate-800">
                  {item.value.toLocaleString()}
                </span>
              </div>
              <span className="text-xs font-medium text-slate-400">
                {labels ? labels[index] : item.name} ({pct}%)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DonutChartCard;
