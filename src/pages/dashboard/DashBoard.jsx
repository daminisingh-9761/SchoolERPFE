
import { useEffect, useState } from "react";
import StatsCard from "/src/components/dashboard/StatsCard";
import StudentsTable from "/src/components/dashboard/StudentsTable";
import Layout from "/src/components/layouts/Layout";
import AttendanceChart from "/src/components/dashboard/AttendanceChart";
import FeesChart from "/src/components/dashboard/FeesChart";
import { students as initialStudents, feesRecords } from "../../utils/constants";

function Dashboard() {
  const [students, setStudents] = useState(initialStudents);
  const [teachers, setTeachers] = useState(() => {
    const saved = localStorage.getItem("teachers");
    if (!saved) return [];

    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const loadStudents = () => {
      const saved = localStorage.getItem("students");
      if (!saved) {
        setStudents(initialStudents);
        return;
      }

      try {
        const parsed = JSON.parse(saved);
        setStudents(Array.isArray(parsed) ? parsed : initialStudents);
      } catch {
        setStudents(initialStudents);
      }
    };

    const loadTeachers = () => {
      const saved = localStorage.getItem("teachers");
      if (!saved) {
        setTeachers([]);
        return;
      }

      try {
        const parsed = JSON.parse(saved);
        setTeachers(Array.isArray(parsed) ? parsed : []);
      } catch {
        setTeachers([]);
      }
    };

    loadStudents();
    loadTeachers();

    const handleDataUpdated = (event) => {
      if (event.type === "storage" && event.key === "students") {
        loadStudents();
      }
      if (event.type === "storage" && event.key === "teachers") {
        loadTeachers();
      }
      if (event.type === "studentsUpdated") {
        loadStudents();
      }
      if (event.type === "teachersUpdated") {
        loadTeachers();
      }
    };

    window.addEventListener("storage", handleDataUpdated);
    window.addEventListener("studentsUpdated", handleDataUpdated);
    window.addEventListener("teachersUpdated", handleDataUpdated);
    return () => {
      window.removeEventListener("storage", handleDataUpdated);
      window.removeEventListener("studentsUpdated", handleDataUpdated);
      window.removeEventListener("teachersUpdated", handleDataUpdated);
    };
  }, []);

  const totalStudents = students.length;
  const activeStudents = students.filter((student) => student.status === "Active").length;
  const attendanceRate = totalStudents ? Math.round((activeStudents / totalStudents) * 100) : 0;
  const feesCollection = feesRecords.reduce((sum, record) => {
    const amount = Number(record.feeAmount.replace(/[$,]/g, "")) || 0;
    return sum + amount;
  }, 0);
  const feesCollectionText = `$${feesCollection.toLocaleString()}`;

  return (
    <Layout>
      {/* <main className="px-2 pb-16 pt-4 sm:px-6 lg:pb-6 xl:px-8"> */}
        {/* <section className="mb-8 overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-2xl shadow-slate-900/15 sm:p-8"> */}
          <div className=" mt-2 px-1 py-1 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        
              <p className=" text-2xl font-black uppercase tracking-[0.22em] text-black">
                Dashboard
              </p>
            
          </div>
        {/* </section> */}

        <div className="mt-1 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

          <StatsCard
            title="Total Students"
            value={totalStudents.toString()}
            color="text-blue-600"
          />

          <StatsCard
            title="Total Teachers"
            value={teachers.length.toString()}
            color="text-green-600"
          />

          <StatsCard
            title="Attendance Rate"
            value={`${attendanceRate}%`}
            color="text-purple-600"
          />

          <StatsCard
            title="Fees Collection"
            value={feesCollectionText}
            color="text-orange-600"
          />

        </div>
        <div className="mt-6 grid gap-6 xl:grid-cols-2">

         <AttendanceChart />
         
         <FeesChart />
        </div>
        <div className="mt-6">
          <StudentsTable />
        </div>
      {/* </main> */}
    </Layout>
  );
}

export default Dashboard;
