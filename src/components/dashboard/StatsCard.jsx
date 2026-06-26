import {
  FaArrowUp,
  FaChalkboardTeacher,
  FaClipboardCheck,
  FaMoneyBill,
  FaUserGraduate,
  FaWallet,
  FaExclamationCircle,
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
  "Attendance %": {
    icon: FaClipboardCheck,
    accent: "from-blue-500 to-cyan-400",
    text: "text-blue-600",
    tint: "bg-blue-50",
  },
  "Total Fee": {
    icon: FaWallet,
    accent: "from-emerald-500 to-teal-400",
    text: "text-emerald-600",
    tint: "bg-emerald-50",
  },
  "Pending Fee": {
    icon: FaExclamationCircle,
    accent: "from-rose-500 to-red-400",
    text: "text-rose-600",
    tint: "bg-rose-50",
  },
  "Today's Attendance %": {
    icon: FaClipboardCheck,
    accent: "from-violet-500 to-fuchsia-400",
    text: "text-violet-600",
    tint: "bg-violet-50",
  },
};

function StatsCard({ title, value, color }) {
  const style = cardStyles[title] || {
    icon: FaArrowUp,
    accent: "from-slate-500 to-slate-400",
    text: color || "text-slate-600",
    tint: "bg-slate-50",
  };
  const Icon = style.icon;

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/40 bg-white/60 backdrop-blur-xl p-6 shadow-lg shadow-indigo-100/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-200/50">
      <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${style.accent} opacity-80 group-hover:opacity-100 transition-opacity`} />
      <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${style.accent} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-500`} />

      <div className="relative flex items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">
            {title}
          </h3>
          <p className={`mt-2 text-3xl font-black tracking-tight ${style.text || color}`}>
            {value}
          </p>
        </div>

        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${style.tint} ${style.text || color} shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
          <Icon className="text-xl" />
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
