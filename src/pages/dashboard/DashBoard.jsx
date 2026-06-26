import { useEffect, useState } from "react";
import StatsCard from "/src/components/dashboard/StatsCard";
import StudentsTable from "/src/components/dashboard/StudentsTable";
import TeachersTable from "/src/components/dashboard/TeachersTable";
import DonutChartCard from "/src/components/dashboard/DonutChartCard";
import AttendancePieChart from "/src/components/dashboard/AttendancePieChart";
import TeacherGenderPieChart from "/src/components/dashboard/TeacherGenderPieChart";
import Layout from "/src/components/layouts/Layout";
import AttendanceChart from "/src/components/dashboard/AttendanceChart";
import FeesChart from "/src/components/dashboard/FeesChart";
import api from "../../services/api";
import Button from "/src/components/common/Button";
import Table from "/src/components/common/Table";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;
  const studentId = user?.student_id;
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [studentFee, setStudentFee] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [attendanceSummary, setAttendanceSummary] = useState(null);
  const [attendanceHistory, setAttendanceHistory] = useState([]);

  // Superadmin States
  const [totalPresent, setTotalPresent] = useState(0);
  const [feesCollected, setFeesCollected] = useState(0);
  const [pendingFees, setPendingFees] = useState(0);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get("/students/");
        setStudents(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchTeachers = async () => {
      try {
        const response = await api.get("/teachers/");
        setTeachers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchAttendanceSummary =
      async () => {

        try {

          const response =
            await api.get(
              `/attendance/student/${studentId}/summary`
            );

          setAttendanceSummary(
            response.data
          );

        } catch (error) {
          console.log(error);
        }
      };
    const fetchAttendanceHistory = async () => {

      try {

        const response = await api.get(
          `/attendance/student/${studentId}`
        );

        setAttendanceHistory(response.data);

      } catch (error) {

        console.log(error);

      }

    };
    const fetchStudentFee =
      async () => {

        try {

          const response =
            await api.get("/fees/");

          const studentFeeData =
            response.data.find(
              (fee) =>
                fee.student_id ===
                studentId
            );

          setStudentFee(
            studentFeeData
          );

        } catch (error) {

          console.log(error);

        }
      };
    const fetchPaymentHistory =
      async () => {

        try {

          const response =
            await api.get(
              `/fees/history/${studentId}`
            );

          setPaymentHistory(
            response.data
          );

        } catch (error) {

          console.log(error);

        }
      };

    const fetchSuperAdminData = async () => {
      if (role !== "superadmin") return;
      try {
        const today = new Date().toISOString().split("T")[0];
        const [attendanceRes, feesRes] = await Promise.all([
          api.get(`/attendance/by-date?date=${today}`),
          api.get("/fees/")
        ]);

        let presentCount = 0;
        attendanceRes.data.forEach(record => {
          if (record.attendance_status === "Present") presentCount++;
        });
        setTotalPresent(presentCount);

        let collected = 0;
        let pending = 0;
        feesRes.data.forEach(fee => {
          collected += (fee.paid_amount || 0);
          pending += (fee.remaining_amount || 0);
        });
        setFeesCollected(collected);
        setPendingFees(pending);

      } catch (error) {
        console.log(error);
      }
    };

    fetchStudents();
    fetchTeachers();

    if (
      role === "student" &&
      studentId
    ) {

      fetchAttendanceSummary();
      fetchAttendanceHistory();
      fetchStudentFee();
      fetchPaymentHistory();
    } else if (role === "superadmin") {
      fetchSuperAdminData();
    }
  }, []);

  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const activeStudents = students.filter((student) => student.status === "Active").length;
  const attendanceRate = totalStudents ? Math.round((activeStudents / totalStudents) * 100) : 0;
  const totalAbsent = totalStudents - totalPresent;

  const feesCollectionText = `₹${feesCollected.toLocaleString()}`;
  const pendingFeesText = `₹${pendingFees.toLocaleString()}`;
  console.log("Teachers Count:", teachers.length);
  console.log(
    "ATTENDANCE =>",
    attendanceSummary
  );

  console.log(
    "FEE =>",
    studentFee
  );

  console.log(
    "PAYMENTS =>",
    paymentHistory
  );
  return (
    <Layout>
      {/* HEADER SECTION */}
      {role === "student" ? (
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              Welcome back, {user?.name?.split(' ')[0] || "Student"}!
            </h1>
          </div>
        </div>
      ) : role === "teacher" ? (
        <div className="mt-4 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Teacher Dashboard</h1>
            <p className="text-gray-500 mt-2">
              Welcome back. Here's what's happening with your classes today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              text="View Students"
              variant="secondary"
              onClick={() => (window.location.href = "/students")}
            />
            <Button
              text="Mark Attendance"
              onClick={() => (window.location.href = "/attendance")}
            />
          </div>
        </div>
      ) : (
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              Dashboard
            </h1>
          </div>
        </div>
      )}

      {/* TEACHER STATS */}
      {role === "teacher" && (
        <div className="mt-1 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatsCard title="Total Students" value={totalStudents.toString()} color="text-blue-600" />
          <StatsCard title="Today's Attendance %" value={`${attendanceRate}%`} color="text-purple-600" />
        </div>
      )}

      {/* SUPERADMIN DASHBOARD */}
      {role === "superadmin" && (() => {
        // Compute gender splits from real student & teacher data
        const maleStudents = students.filter(s => s.gender?.toLowerCase() === "male").length;
        const femaleStudents = totalStudents - maleStudents;
        const maleTeachers = teachers.filter(t => t.gender?.toLowerCase() === "male").length;
        const femaleTeachers = totalTeachers - maleTeachers;

        return (
          <>
            {/* --- 1. KPI CARDS (top row) --- */}
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <StatsCard title="Total Students" value={totalStudents.toString()} color="text-blue-600" />
              <StatsCard title="Total Teachers" value={totalTeachers.toString()} color="text-green-600" />
              <StatsCard title="Fees Collected" value={feesCollectionText} color="text-red-300" />
              <StatsCard title="Pending Fees" value={pendingFeesText} color="text-orange-600" />
            </div>

            {/* --- 2. CHARTS ROW --- */}
            <div className="mt-6 grid gap-6 xl:grid-cols-2">
              <AttendanceChart />
              <FeesChart />
            </div>

            {/* --- 3. PIE CHARTS ROW --- */}
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {/* Pie 1: Student Gender */}
              <DonutChartCard
                title="Students"
                data={[
                  { name: "Boys", value: maleStudents || Math.round(totalStudents * 0.47) },
                  { name: "Girls", value: femaleStudents || Math.round(totalStudents * 0.53) },
                ]}
                colors={["#7dd3fc", "#fde68a"]}
                centerIcon={<>👦👧</>}
                labels={["Boys", "Girls"]}
              />

              {/* Pie 2: Teacher Gender — arc style */}
              <TeacherGenderPieChart
                maleTeachers={maleTeachers || Math.round(totalTeachers * 0.45)}
                femaleTeachers={femaleTeachers || Math.round(totalTeachers * 0.55)}
              />

              {/* Pie 3: Today's Attendance — single thick donut */}
              <AttendancePieChart
                present={totalPresent}
                absent={Math.max(0, totalStudents - totalPresent)}
              />
            </div>

            {/* --- 4. STUDENTS TABLE --- */}
            <div className="mt-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <StudentsTable />
            </div>

            {/* --- 5. TEACHERS TABLE --- */}
            <div className="mt-6 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <TeachersTable />
            </div>
          </>
        );
      })()}

      {/* STUDENT DASHBOARD UI */}
      {role === "student" && (
        <div className="flex flex-col xl:flex-row gap-6">

          {/* Main Left Column */}
          <div className="flex-1 flex flex-col gap-6">

            {/* Top Stats Cards */}
            <div className="grid sm:grid-cols-3 gap-6">
              <StatsCard
                title="Attendance %"
                value={
                  attendanceSummary
                    ? `${attendanceSummary.attendance_percentage}%`
                    : "0%"
                }
              />
              <StatsCard
                title="Total Fee"
                value={
                  studentFee
                    ? `₹${studentFee.fee_amount}`
                    : "₹0"
                }
              />
              <StatsCard
                title="Pending Fee"
                value={
                  studentFee
                    ? `₹${studentFee.remaining_amount}`
                    : "₹0"
                }
              />
            </div>

            {/* Fee Progress & History */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-800">Fee Progress & History</h3>
                <button className="text-slate-400 hover:text-slate-600">...</button>
              </div>

              <div className="p-6 border-b border-slate-100">
                <div className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
                  <span>Fee Status:
                    {
                      studentFee
                        ?
                        `${Math.round(
                          (studentFee.paid_amount /
                            studentFee.fee_amount) * 100
                        )}% Paid`
                        :
                        "0%"
                    }</span>
                  <span className="text-slate-500">{
                    studentFee
                      ?
                      `₹${studentFee.paid_amount}/₹${studentFee.fee_amount}`
                      :
                      "₹0"
                  }</span>
                </div>
                <div className="w-full bg-red-100 rounded-full h-3 mb-3 flex overflow-hidden">
                  <div className="bg-blue-600 h-full" style={{
                    width:
                      studentFee
                        ?
                        `${(studentFee.paid_amount /
                          studentFee.fee_amount) * 100}%`
                        :
                        "0%"
                  }}></div>
                </div>
                <div className="flex gap-4 text-xs font-semibold text-slate-500">
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-600"></span> Paid:

                    {
                      studentFee
                        ?
                        `₹${studentFee.paid_amount}`
                        :
                        "₹0"
                    }</div>
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-200"></span> Pending:
                    {
                      studentFee
                        ?
                        `₹${studentFee.remaining_amount}`
                        :
                        "₹0"
                    }</div>
                </div>
              </div>

              <div className="p-6">
                <Table
                  columns={["Date", "Amount", "Status"]}
                  data={paymentHistory.map(payment => ({
                    date: payment.payment_date,
                    amount: `₹${payment.amount}`,
                    status: (
                      <span
                        className="
                      px-2.5
                      py-1
                      rounded-md
                      text-xs
                      font-bold
                      bg-green-100
                      text-green-700
                      "
                      >
                        Success
                      </span>
                    )
                  }))}

                />
              </div>
            </div>

            {/* Attendance History */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-800">Attendance History</h3>
                <div className="flex items-center gap-6 text-sm font-semibold text-slate-700">
                  <span>Total: {attendanceSummary?.total_days || 0}</span>

                  <span>Present: {attendanceSummary?.present_days || 0}</span>

                  <span>Absent: {attendanceSummary?.absent_days || 0}</span>
                </div>
              </div>
              <div className="p-6">
                <Table
                  columns={["Date", "Class", "Attendance"]}
                  data={attendanceHistory.map(record => ({
                    date: record.date,

                    class: record.class_name,

                    attendance: (
                      <div className="flex items-center gap-2">

                        <span
                          className={`w-3 h-3 rounded-full ${record.attendance_status === "Present"
                            ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                            : "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]"
                            }`}
                        />

                        <span className="font-bold text-slate-800">
                          {record.attendance_status}
                        </span>

                      </div>
                    )

                  }))}
                />
              </div>
            </div>

          </div>


          {/* <div className="xl:w-[350px] shrink-0 flex flex-col gap-6">

            Quick Actions
            <div className="bg-slate-800 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-6">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  text="Invoice"
                  icon={<FaFileInvoice size={24} className="text-green-400" />}
                  className="!flex-col !bg-slate-700/50 hover:!bg-slate-700 !text-white !p-4 !rounded-xl !gap-3 !h-auto border-0 shadow-none"
                />
                <Button
                  text="Exams"
                  icon={<FaBook size={24} className="text-green-400" />}
                  className="!flex-col !bg-slate-700/50 hover:!bg-slate-700 !text-white !p-4 !rounded-xl !gap-3 !h-auto border-0 shadow-none"
                />
                <Button
                  text="Support"
                  icon={<FaHeadset size={24} className="text-green-400" />}
                  className="!flex-col !bg-slate-700/50 hover:!bg-slate-700 !text-white !p-4 !rounded-xl !gap-3 !h-auto border-0 shadow-none"
                />
                <Button
                  text="Updates"
                  icon={<FaSyncAlt size={24} className="text-green-400" />}
                  className="!flex-col !bg-slate-700/50 hover:!bg-slate-700 !text-white !p-4 !rounded-xl !gap-3 !h-auto border-0 shadow-none"
                />
              </div>
            </div> */}


          {/* <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-800">Reminders</h3>
                <FaThumbtack className="text-blue-500" />
              </div>

              <div className="space-y-4">
                <div className="flex gap-4 p-3 hover:bg-slate-50 rounded-lg transition cursor-pointer border-l-2 border-l-red-500">
                  <div className="bg-red-50 text-red-500 font-bold text-xs p-2 rounded flex items-center justify-center h-10 w-12 shrink-0">
                    OCT
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Math Midterm Project</h4>
                    <p className="text-xs font-semibold text-slate-400 mt-0.5">Due Tomorrow at 11:59 PM</p>
                  </div>
                </div>

                <div className="flex gap-4 p-3 hover:bg-slate-50 rounded-lg transition cursor-pointer border-l-2 border-l-blue-500">
                  <div className="bg-blue-50 text-blue-500 font-bold text-xs p-2 rounded flex items-center justify-center h-10 w-12 shrink-0">
                    NOV
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Annual Sports Registration</h4>
                    <p className="text-xs font-semibold text-slate-400 mt-0.5">Opens in 5 days</p>
                  </div>
                </div>
              </div>
            </div> */}

        </div>
      )}

    </Layout>
  );
}

export default Dashboard;

