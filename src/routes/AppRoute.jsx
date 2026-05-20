import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/dashboard/Dashboard";
import Students from "../pages/students/Students";
import Teachers from "../pages/teachers/Teachers";
import AddStudent from "../pages/students/AddStudent";
import AddTeacher from "../pages/teachers/AddTeacher";
import Login from "../pages/auth/Login";
import Profile from "../pages/profile/Profile";
import Attendance from "../pages/attendance/Attendance";
import Fees from "../pages/fees/Fees";
import Settings from "../pages/settings/Settings";

function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>
          <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/students"
          element={<Students />}
        />

        <Route
          path="/teachers"
          element={<Teachers />}
        />
        <Route
            path="/add-student"
            element={<AddStudent />}
       />
        <Route
            path="/add-teacher"
            element={<AddTeacher />}
        />

        <Route
            path="/profile"
            element={<Profile />}
        />
       <Route
         path="/attendance"
          element={<Attendance />}
       />
        <Route
          path="/fees"
          element={<Fees />}
        />
        <Route
          path="/settings"
          element={<Settings />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;