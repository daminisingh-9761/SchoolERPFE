import { NavLink } from "react-router-dom";

import {
  FaHome,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaClipboardCheck,
  FaMoneyBill,
  FaCog,
} from "react-icons/fa";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-blue-200 text-black p-5">

      {/* Logo */}
      <h1 className="text-3xl font-bold mb-12">
        School ERP
      </h1>
      <h6 className="text-3xl font-bold mb-12">
        Welcome to Our School ERP!
      </h6>

      {/* Menu */}
      <ul className="space-y-6 text-lg">

        {/* Dashboard */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "bg-blue-300 p-3 rounded-xl flex items-center gap-3 cursor-pointer"
              : "p-3 flex items-center gap-3 hover:text-blue-400 cursor-pointer transition"
          }
        >
          <FaHome />
          Dashboard
        </NavLink>

        {/* Students */}
        <NavLink
          to="/students"
          className={({ isActive }) =>
            isActive
              ? "bg-blue-300 p-3 rounded-xl flex items-center gap-3 cursor-pointer"
              : "p-3 flex items-center gap-3 hover:text-blue-400 cursor-pointer transition"
          }
        >
          <FaUserGraduate />
          Students
        </NavLink>

        {/* Teachers */}
        <NavLink
          to="/teachers"
          className={({ isActive }) =>
            isActive
              ? "bg-blue-300 p-3 rounded-xl flex items-center gap-3 cursor-pointer"
              : "p-3 flex items-center gap-3 hover:text-blue-400 cursor-pointer transition"
          }
        >
          <FaChalkboardTeacher />
          Teachers
        </NavLink>

        {/* Attendance */}
        <NavLink
          to="/attendance"
          className={({ isActive }) =>
            isActive
              ? "bg-blue-300 p-3 rounded-xl flex items-center gap-3 cursor-pointer"
              : "p-3 flex items-center gap-3 hover:text-blue-400 cursor-pointer transition"
          }
        >
          <FaClipboardCheck />
          Attendance
        </NavLink>

        {/* Fees */}
        <NavLink
          to="/fees"
          className={({ isActive }) =>
            isActive
              ? "bg-blue-300 p-3 rounded-xl flex items-center gap-3 cursor-pointer"
              : "p-3 flex items-center gap-3 hover:text-blue-400 cursor-pointer transition"
          }
        >
          <FaMoneyBill />
          Fees
        </NavLink>

        {/* Settings */}
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive
              ? "bg-blue-300 p-3 rounded-xl flex items-center gap-3 cursor-pointer"
              : "p-3 flex items-center gap-3 hover:text-blue-400 cursor-pointer transition"
          }
        >
          <FaCog />
          Settings
        </NavLink>

      </ul>
    </div>
  );
}

export default Sidebar;