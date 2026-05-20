import Layout from "/src/components/layouts/Layout";
import { useMemo, useState } from "react";
import Table from "/src/components/common/Table";
import { students as initialStudents } from "../../utils/constants";

function Attendance() {
  const students = useMemo(() => {
    const saved = localStorage.getItem("students");
    if (!saved) return initialStudents;

    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : initialStudents;
    } catch {
      return initialStudents;
    }
  }, []);

  const [search, setSearch] = useState("");
  const filteredData = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  const attendanceData = filteredData.map((student) => ({
    studentName: student.name,
    class: student.class,
    date: "18 May 2026",
    status: student.status === "Active" ? "Present" : "Absent",
  }));

  return (

  <Layout>

    <div className="p-8 bg-slate-100 min-h-screen">

      {/* Heading */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800">
          Attendance Management
        </h1>

        <p className="text-gray-500 mt-2">
          Manage and track student attendance
        </p>

      </div>

      {/* Top Section */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* Present Card */}

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h3 className="text-gray-500 text-lg">
            Present Students
          </h3>

          <p className="text-3xl font-bold text-green-600 mt-2">
            {students.filter((student) => student.status === "Active").length}
          </p>

        </div>

        {/* Absent Card */}

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h3 className="text-gray-500 text-lg">
            Absent Students
          </h3>

          <p className="text-3xl font-bold text-red-500 mt-2">
            {students.filter((student) => student.status !== "Active").length}
          </p>

        </div>

        {/* Total Card */}

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h3 className="text-gray-500 text-lg">
            Total Students
          </h3>

          <p className="text-3xl font-bold text-blue-600 mt-2">
            {students.length}
          </p>

        </div>

      </div>

      {/* Search */}

      <div className="bg-white p-6 rounded-2xl shadow-md mb-8">

        <input
          type="text"
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      {/* Attendance Table */}

      <Table
        columns={["Student Name", "Class", "Date", "Status"]}
        data={attendanceData}
      />

    </div>

  </Layout>
);
}
export default Attendance;