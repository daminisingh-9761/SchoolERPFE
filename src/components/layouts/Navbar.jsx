import { useState, useEffect, useRef } from "react";
import {
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  useEffect(() => {

  function handleClickOutside(event) {

    // Agar click dropdown ke bahar hua

    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {

      setOpen(false);

    }
  }

  // Event Listener

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  // Cleanup

  return () => {

    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );

  };

}, []);
  return (
    <div className="h-20 bg-white shadow-sm flex items-center justify-between px-8">
      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        className="border border-gray-300 rounded-xl px-5 py-3 w-96 outline-none"
      />

      {/* Profile Section */}
      <div
        className="relative"
        ref={dropdownRef}
      >
        {/* Profile Button */}
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center gap-4 cursor-pointer"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-full"></div>
          <div>
            <h3 className="font-semibold">
              John Admin
            </h3>
            <p className="text-gray-500 text-sm">
              Administrator
            </p>
          </div>
        </div>
        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-4 w-60 bg-white rounded-2xl shadow-xl p-4 z-50">
            {/* My Account */}
            <Link to="/profile">
              <div className="flex items-center gap-3 p-3 hover:bg-slate-100 rounded-xl cursor-pointer">
                <FaUserCircle />
                <span>
                  My Account
                </span>
              </div>
            </Link>
            {/* Settings */}
            <Link to="/settings">
              <div className="flex items-center gap-3 p-3 hover:bg-slate-100 rounded-xl cursor-pointer">
                <FaCog />
                <span>
                  Settings
                </span>
              </div>
            </Link>
            {/* Logout */}
            <Link to="/">

              <div className="flex items-center gap-3 p-3 hover:bg-red-100 text-red-500 rounded-xl cursor-pointer">

                <FaSignOutAlt />

                <span>
                  Logout
                </span>

              </div>

            </Link>

          </div>

        )}

      </div>

    </div>
  );
}

export default Navbar;