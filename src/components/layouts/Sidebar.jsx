import { NavLink } from "react-router-dom";

import {
  FaHome,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaClipboardCheck,
  FaMoneyBill,
  FaCog,
} from "react-icons/fa";


// const navItems = [
//   { to: "/dashboard", label: "Dashboard", icon: FaHome },
//   { to: "/students", label: "Students", icon: FaUserGraduate },
//   { to: "/teachers", label: "Teachers", icon: FaChalkboardTeacher },
//   { to: "/attendance", label: "Attendance", icon: FaClipboardCheck },
//   { to: "/fees", label: "Fees", icon: FaMoneyBill },
//   { to: "/settings", label: "Settings", icon: FaCog },
// ];

function Sidebar() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const role = user?.role;
  let navItems = [];
  if (role === "superadmin") {
    navItems = [
      {
        to: "/dashboard",
        label: "Dashboard",
        icon: FaHome,
      },
      {
        to: "/students",
        label: "Students",
        icon: FaUserGraduate,
      },
      {
        to: "/teachers",
        label: "Teachers",
        icon: FaChalkboardTeacher,
      },
      {
        to: "/attendance",
        label: "Attendance",
        icon: FaClipboardCheck,
      },
      {
        to: "/fees",
        label: "Fees",
        icon: FaMoneyBill,
      },
      {
        to: "/settings",
        label: "Settings",
        icon: FaCog,
      },
    ];
  }
  //teacher
  if (role === "teacher") {
    navItems = [
      {
        to: "/dashboard",
        label: "Dashboard",
        icon: FaHome,
      },
      {
        to: "/students",
        label: "Students",
        icon: FaUserGraduate,
      },
      {
        to: "/attendance",
        label: "Attendance",
        icon: FaClipboardCheck,
      },
    ];
  }
  //student
  if (role === "student") {
    navItems = [
      {
        to: "/dashboard",
        label: "Dashboard",
        icon: FaHome,
      },
    ];
  }
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-slate-200 bg-blue-50 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur lg:block">
        <div className="mb-10 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-600 text-lg font-black text-white shadow-lg shadow-blue-600/25">
            S
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-950">
              School ERP
            </h1>
            <p className="text-sm font-medium text-slate-500">
              Smart campus console
            </p>
          </div>
        </div>

        <div className="mb-8 rounded-2xl bg-slate-200 p-5 text-black shadow-xl shadow-slate-900/15">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-800">
            Welcome!
          </p>
          <h2 className="mt-3 text-xl font-bold leading-tight">
            Manage your school with clarity.
          </h2>
        </div>

        <nav className="space-y-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${isActive
                  ? "bg-blue-400 text-white shadow-lg shadow-blue-600/25"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                }`
              }
            >
              <Icon className="text-base" />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <nav className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-6 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-2xl shadow-slate-900/15 backdrop-blur lg:hidden">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            aria-label={label}
            className={({ isActive }) =>
              `grid min-h-12 place-items-center rounded-xl text-sm transition ${isActive
                ? "bg-blue-600 text-white"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-950"
              }`
            }
          >
            <Icon />
          </NavLink>
        ))}
      </nav>
    </>
  );
}

export default Sidebar;
