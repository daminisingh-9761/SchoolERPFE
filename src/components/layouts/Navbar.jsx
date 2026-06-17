import { useState, useEffect, useRef } from "react";
import {
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaSearch,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-blue-50 px-4 py-4 shadow-sm backdrop-blur xl:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500 shadow-inner shadow-white sm:max-w-md">
          <FaSearch className="shrink-0 text-slate-400" />
          <input
            type="text"
            placeholder="Search students, teachers..."
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
          />
        </div>

        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setOpen(!open)}
            className="flex cursor-pointer items-center gap-3 rounded-2xl border border-transparent p-1.5 transition hover:border-slate-200 hover:bg-slate-50"
          >
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-600 font-bold text-white shadow-lg shadow-blue-600/25">
              JA
            </div>
            <div className="hidden text-right sm:block">
              <h3 className="text-sm font-bold text-slate-950">
                John Admin
              </h3>
              <p className="text-xs font-medium text-slate-500">
                Administrator
              </p>
            </div>
          </div>

          {open && (
            <div className="absolute right-0 mt-3 w-60 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-900/15">
              <Link to="/profile">
                <div className="flex cursor-pointer items-center gap-3 rounded-xl p-3 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                  <FaUserCircle />
                  <span>My Account</span>
                </div>
              </Link>
              <Link to="/settings">
                <div className="flex cursor-pointer items-center gap-3 rounded-xl p-3 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                  <FaCog />
                  <span>Settings</span>
                </div>
              </Link>
              <Link to="/">
                <div className="flex cursor-pointer items-center gap-3 rounded-xl p-3 text-sm font-semibold text-red-500 hover:bg-red-50">
                  <FaSignOutAlt />
                  <span>Logout</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
