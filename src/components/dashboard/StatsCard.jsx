import {
  FaArrowUp,
  FaChalkboardTeacher,
  FaClipboardCheck,
  FaMoneyBill,
  FaUserGraduate,
} from "react-icons/fa";

const cardStyles = {
  "Total Students": {
    icon: FaUserGraduate,
    accent: "from-blue-500 to-cyan-400",
    text: "text-blue-600",
    tint: "bg-blue-50",
  },
  "Total Teachers": {
    icon: FaChalkboardTeacher,
    accent: "from-emerald-500 to-teal-400",
    text: "text-emerald-600",
    tint: "bg-emerald-50",
  },
  "Attendance Rate": {
    icon: FaClipboardCheck,
    accent: "from-violet-500 to-fuchsia-400",
    text: "text-violet-600",
    tint: "bg-violet-50",
  },
  "Fees Collection": {
    icon: FaMoneyBill,
    accent: "from-orange-500 to-amber-400",
    text: "text-orange-600",
    tint: "bg-orange-50",
  },
};

function StatsCard({ title, value, color }) {
  const style = cardStyles[title] || {
    icon: FaArrowUp,
    accent: "from-slate-500 to-slate-400",
    text: color,
    tint: "bg-slate-50",
  };
  const Icon = style.icon;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-200/70">
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${style.accent}`} />

      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-500">
            {title}
          </h3>
          <p className={`mt-3 text-4xl font-black tracking-tight ${style.text || color}`}>
            {value}
          </p>
        </div>

        <div className={`grid h-7 w-7 shrink-0 place-items-center rounded-xl ${style.tint} ${style.text || color}`}>
          <Icon className="text-xl" />
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
