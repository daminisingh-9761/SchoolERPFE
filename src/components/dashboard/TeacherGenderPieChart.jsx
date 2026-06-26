function TeacherGenderPieChart({ maleTeachers = 0, femaleTeachers = 0 }) {
  const total = maleTeachers + femaleTeachers;
  const malePct = total > 0 ? maleTeachers / total : 0.5;
  const femalePct = total > 0 ? femaleTeachers / total : 0.5;

  // SVG arc helpers
  const polarToCartesian = (cx, cy, r, angleDeg) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  const describeArc = (cx, cy, r, startAngle, endAngle) => {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
  };

  const cx = 110;
  const cy = 110;

  // Outer ring (Male — dark slate) — nearly full circle
  const outerR = 88;
  const maleAngle = Math.max(10, malePct * 340); // leave a small gap
  const maleEnd = polarToCartesian(cx, cy, outerR, maleAngle - 90);

  // Inner ring (Female — amber) — partial arc
  const innerR = 62;
  const femaleAngle = Math.max(10, femalePct * 280);

  const malePctDisplay = total > 0 ? Math.round(malePct * 100) : 0;
  const femalePctDisplay = total > 0 ? Math.round(femalePct * 100) : 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-slate-800">Teachers</h3>
        <button className="text-slate-400 hover:text-slate-600 text-xl leading-none">···</button>
      </div>

      {/* SVG Chart */}
      <div className="flex justify-center items-center" style={{ height: 220 }}>
        <svg width={220} height={220} viewBox="0 0 220 220">
          {/* Outer ring track (bg) */}
          <circle
            cx={cx}
            cy={cy}
            r={outerR}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={10}
          />
          {/* Outer arc — Male (dark slate) */}
          <path
            d={describeArc(cx, cy, outerR, -90, -90 + maleAngle)}
            fill="none"
            stroke="#475569"
            strokeWidth={10}
            strokeLinecap="round"
          />
          {/* Dot indicator at start of outer arc */}
          {(() => {
            const dotPos = polarToCartesian(cx, cy, outerR, -90);
            return (
              <circle
                cx={dotPos.x}
                cy={dotPos.y}
                r={7}
                fill="#334155"
                stroke="white"
                strokeWidth={2}
              />
            );
          })()}

          {/* Inner ring track (bg) */}
          <circle
            cx={cx}
            cy={cy}
            r={innerR}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={8}
          />
          {/* Inner arc — Female (amber) */}
          <path
            d={describeArc(cx, cy, innerR, -90, -90 + femaleAngle)}
            fill="none"
            stroke="#f59e0b"
            strokeWidth={8}
            strokeLinecap="round"
          />

          {/* Center icon — two person silhouettes using circles */}
          <circle cx={cx - 10} cy={cy - 6} r={6} fill="#cbd5e1" opacity="0.7" />
          <circle cx={cx + 10} cy={cy - 6} r={6} fill="#cbd5e1" opacity="0.7" />
          <ellipse cx={cx - 10} cy={cy + 10} rx={8} ry={5} fill="#cbd5e1" opacity="0.7" />
          <ellipse cx={cx + 10} cy={cy + 10} rx={8} ry={5} fill="#cbd5e1" opacity="0.7" />
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-2 flex justify-around">
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-slate-600" />
            <span className="text-xl font-bold text-slate-800">{maleTeachers}</span>
          </div>
          <span className="text-xs font-medium text-slate-400">Male ({malePctDisplay}%)</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-400" />
            <span className="text-xl font-bold text-slate-800">{femaleTeachers}</span>
          </div>
          <span className="text-xs font-medium text-slate-400">Female ({femalePctDisplay}%)</span>
        </div>
      </div>
    </div>
  );
}

export default TeacherGenderPieChart;
