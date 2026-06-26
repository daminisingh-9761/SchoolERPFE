import { useState, useEffect, useRef } from "react";
import {
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaBell,
  FaMoon,
  FaSun,
  FaCheckCircle,
  FaInfoCircle
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ProfileModal from "../profile/ProfileModal";

function Navbar() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );
  const [open, setOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  
  const dropdownRef = useRef();
  const notifRef = useRef();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-blue-50 px-6 py-2 shadow-sm">
      <div className="flex justify-end items-center gap-6">
        
        {/* Notifications Dropdown */}
        <div ref={notifRef} className="relative">
          <button 
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative text-slate-700 hover:text-blue-600 transition"
          >
            <FaBell size={20} />
            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-red-500 shadow-sm shadow-red-500/50"></span>
          </button>
          
          {notificationsOpen && (
            <div className="absolute right-0 mt-4 w-80 rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/15 overflow-hidden z-50">
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-800">Notifications</h3>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">2 New</span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                <div className="p-4 border-b border-slate-50 hover:bg-slate-50 transition cursor-pointer flex gap-3">
                  <div className="text-blue-500 mt-1"><FaInfoCircle size={16} /></div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Exam schedule updated</p>
                    <p className="text-xs text-slate-500 mt-1">The mid-term exam schedule has been published. Please check your exams portal.</p>
                    <p className="text-[10px] text-slate-400 mt-2 font-semibold uppercase">2 hours ago</p>
                  </div>
                </div>
                <div className="p-4 hover:bg-slate-50 transition cursor-pointer flex gap-3">
                  <div className="text-green-500 mt-1"><FaCheckCircle size={16} /></div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Fee payment successful</p>
                    <p className="text-xs text-slate-500 mt-1">We received your recent payment. Your fee receipt is now available for download.</p>
                    <p className="text-[10px] text-slate-400 mt-2 font-semibold uppercase">1 day ago</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 px-4 py-3 border-t border-slate-100 text-center">
                <button className="text-sm font-bold text-blue-600 hover:underline">Mark all as read</button>
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="text-slate-700 hover:text-blue-600 transition transform hover:rotate-12"
          title="Toggle Dark Mode"
        >
          {isDarkMode ? <FaSun size={20} className="text-amber-500" /> : <FaMoon size={20} />}
        </button>

        <div className="h-10 w-px bg-slate-300"></div>

        <div
          ref={dropdownRef}
          className="relative"
        >
          <div
            onClick={() => setOpen(!open)}
            className="
          flex items-center gap-3
          cursor-pointer
          rounded-2xl
          bg-white
          px-4 py-2
          border border-slate-200
          shadow-sm
          hover:shadow-md
          transition-all
        "
          >
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-200 font-bold text-white shadow-lg shadow-blue-600/25">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
            <div className="hidden text-right sm:block">
              <h3 className="font-semibold text-blue-700">
                {user?.name}
              </h3>

              <p className="text-sm text-slate-500">
                {
                  user?.role === "superadmin"
                    ? "Admin Portal"
                    : user?.role
                }
              </p>
            </div>
          </div>

          {open && (
            <div className="absolute right-0 mt-3 w-60 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-900/15">
              <div 
                onClick={() => {
                  setIsProfileModalOpen(true);
                  setOpen(false);
                }}
                className="flex cursor-pointer items-center gap-3 rounded-xl p-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                <FaUserCircle />
                <span>My Account</span>
              </div>
              <Link to="/settings">
                <div className="flex cursor-pointer items-center gap-3 rounded-xl p-3 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                  <FaCog />
                  <span>Settings</span>
                </div>
              </Link>
              <div
                onClick={handleLogout}
                className="flex cursor-pointer items-center gap-3 rounded-xl p-3 text-sm font-semibold text-red-500 hover:bg-red-50"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <ProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
      />
    </header>
  );
}

export default Navbar;
