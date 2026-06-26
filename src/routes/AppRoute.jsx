import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/dashboard/Dashboard";
import Students from "../pages/students/Students";
import Teachers from "../pages/teachers/Teachers";
import AddStudent from "../pages/students/AddStudent";
import AddTeacher from "../pages/teachers/AddTeacher";
import Login from "../pages/auth/Login";
import Attendance from "../pages/attendance/Attendance";
import Fees from "../pages/fees/Fees";
import Settings from "../pages/settings/Settings";
import ProtectedRoute from "./ProtectedRoute";

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
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/students"
          element={
            <ProtectedRoute
              allowedRoles={[
                "superadmin",
                "teacher",
              ]}
            >
              <Students />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teachers"
          element={
            <ProtectedRoute
              allowedRoles={["superadmin"]}
            >
              <Teachers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-student"
          element={
            <ProtectedRoute
              allowedRoles={["superadmin"]}
            >
              <AddStudent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-teacher"
          element={
            <ProtectedRoute
              allowedRoles={["superadmin"]}
            >
              <AddTeacher />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance"
          element={
            <ProtectedRoute
              allowedRoles={[
                "superadmin",
                "teacher",
              ]}
            >
              <Attendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fees"
          element={
            <ProtectedRoute
              allowedRoles={["superadmin"]}
            >
              <Fees />
            </ProtectedRoute>
          }
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