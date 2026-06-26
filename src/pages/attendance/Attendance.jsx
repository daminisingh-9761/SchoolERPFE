
import StatsCard from "/src/components/dashboard/StatsCard";
import Button from "/src/components/common/Button";
import Table from "/src/components/common/Table";
import StatusBadge from "/src/components/common/StatusBadge";
import Layout from "/src/components/layouts/Layout"
import {
  useState,
  useEffect,
  useRef,
} from "react";
import { FaFilter, FaRegSave } from "react-icons/fa";
import api from "../../services/api";

const columns = ["Roll No", "Student Name", "Class", "Status"];
const getStudentKey = (student) => student._id;

const getInitialStatus = () => "Present";

function Attendance() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const role = user?.role;
  const [students, setStudents] = useState([]);
  const dropdownRef = useRef(null);
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [attendance, setAttendance] = useState({});
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await api.get("/students/");

      setStudents(response.data);

      setAttendance(
        buildAttendance(
          response.data,
          getInitialStatus
        )
      );

    } catch (error) {
      console.log(error);
    }
  };
  const filteredStudents = students.filter((student, index) => {
    const rollNo = String(index + 1).padStart(2, "0");

    return (
      student.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      rollNo.includes(search)
    );
  });

  const roster = filteredStudents.map((student, index) => {
    const key = getStudentKey(student);
    const status = attendance[key] || getInitialStatus(student);
    return {
      ...student,
      key,
      class_name: student.class_name,
      attendanceStatus: status,
      rollNo: String(index + 1).padStart(2, "0"),
      studentName: <StudentInfo student={student} />,
      class: student.class_name,
      status: <StatusBadge status={student.status} />
    };
  });

  const presentCount = roster.filter(
    (student) => student.attendanceStatus === "Present"
  ).length;
  const absentCount = roster.length - presentCount;
  const attendanceRate = roster.length
    ? Math.round((presentCount / roster.length) * 100)
    : 0;
  const modifiedCount = roster.filter(
    (student) => getInitialStatus(student) !== student.attendanceStatus
  ).length;

  const updateAttendance = (key, status) => {
    setAttendance((current) => ({ ...current, [key]: status }));
  };
  // const [selectedDate, setSelectedDate] = useState(
  //   new Date().toISOString().split("T")[0]
  // );
  const markAll = (status) => {
    setAttendance(
      roster.reduce((records, student) => {
        records[student.key] = status;
        return records;
      }, {})
    );
  };

  const discardChanges = () => {
    setAttendance(buildAttendance(students, getInitialStatus));
  };

  const saveAttendance = async () => {
    try {

      const payload = roster.map((student) => ({
        student_id: student._id,
        student_name: student.name,
        class_name: student.class_name,
        date: selectedDate,
        attendance_status: student.attendanceStatus,
      }));

      console.log(payload);

      const response = await api.post(
        "/attendance/",
        payload
      );

      console.log(response.data);

      alert("Attendance Saved");

    } catch (error) {
      console.log("ERROR => ", error.response.data);
    }
  };
  const loadAttendance = async () => {
    try {

      const response = await api.get(
        `/attendance/by-date?date=${selectedDate}`
      );

      console.log(
        "ATTENDANCE FROM DB =>",
        response.data
      );

      const records = {};

      response.data.forEach((item) => {
        records[item.student_id] =
          item.attendance_status;
      });

      console.log(
        "MAPPED RECORDS =>",
        records
      );

      setAttendance(records);

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {

    if (students.length > 0) {
      loadAttendance();
    }

  }, [students, selectedDate]);

  return (
    <Layout>
      <div className="space-y-6">
        <PageHeader
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          search={search}
          setSearch={setSearch}
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <StatsCard title="Total Students" value={roster.length} color="text-blue-600" />
          <StatsCard title="Present Today" value={presentCount} color="text-green-600" />
          <StatsCard title="Absent Today" value={absentCount} color="text-red-600" />
          <StatsCard
            title="Attendance Rate"
            value={`${attendanceRate}%`}
            color="text-purple-600"
          />
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-black text-slate-900">Student Roster</h2>

            {
              role === "teacher" && (
                <div
                  className="relative"
                  ref={dropdownRef}
                >
                  <Button
                    text="All"
                    variant="primary"
                    className="px-3 py-1 text-sm"
                    onClick={() =>
                      setShowDropdown(!showDropdown)
                    }
                  />
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-lg z-50">
                      <button
                        className="w-full text-left px-4 py-3 hover:bg-green-50"
                        onClick={() => {
                          markAll("Present");
                          setShowDropdown(false);
                        }}
                      >
                        Mark All Present
                      </button>
                      <button
                        className="w-full text-left px-4 py-3 hover:bg-red-50"
                        onClick={() => {
                          markAll("Absent");
                          setShowDropdown(false);
                        }}
                      >
                        Mark All Absent
                      </button>
                    </div>
                  )}
                </div>
              )
            }
          </div>

          <Table
            columns={columns}
            data={roster}
            renderActions={(student) => (
              <div className="flex gap-2">

                {/* Present Button */}

                <button
                  disabled={role !== "teacher"}
                  onClick={() =>
                    updateAttendance(
                      student.key,
                      "Present"
                    )
                  }
                  className={`
                      px-2
                      py-1
                      rounded-lg
                      border
                      font-medium
                      transition-all

                      ${role !== "teacher"
                      ? "opacity-60 cursor-not-allowed"
                      : ""
                    }
${student.attendanceStatus === "Present"
                      ?
                      "bg-green-600 text-white border-green-600"
                      :
                      "bg-white text-green-600 border-gray-300"
                    }
`}
                >
                  ✓ P
                </button>

                {/* Absent Button */}

                <button
                  disabled={role !== "teacher"}
                  onClick={() =>
                    updateAttendance(
                      student.key,
                      "Absent"
                    )
                  }
                  className={`
    px-2
    py-1
    rounded-lg
    border
    font-medium
    transition-all

    ${role !== "teacher"
                      ? "opacity-60 cursor-not-allowed"
                      : ""
                    }

    ${student.attendanceStatus === "Absent"
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-white text-red-600 border-gray-300"
                    }
  `}
                >
                  ✕ A
                </button>

              </div>
            )}
          />
        </section>

        <div className="flex gap-3">

          {role === "teacher" && (
            <Button
              text="Discard Changes"
              variant="secondary"
              onClick={discardChanges}
            />
          )}

          {role === "teacher" && (
            <Button
              text="Bulk Save Attendance"
              icon={<FaRegSave />}
              onClick={saveAttendance}
            />
          )}

        </div>
      </div>
    </Layout >
  );
}

function PageHeader({
  selectedDate,
  setSelectedDate,
  search,
  setSearch,
}) {

  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Roll No");
  const [showFilters, setShowFilters] = useState(false);
  const [classFilter, setClassFilter] = useState("All Classes");
  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target)
      ) {
        setShowFilters(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <h1 className="text-3xl font-black text-slate-950">
          Mark Daily Attendance
        </h1>
        {/* <p className="mt-1 text-sm font-medium text-slate-500">
          {selectedClass}
        </p> */}
      </div>

      <div className="grid gap-3 lg:grid-cols-[350px_220px_180px]">
        <label>
          <input
            type="text"
            placeholder="Search by name or roll no..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-1 h-[46px] w-full rounded-xl border border-slate-200 bg-white px-3 text-sm shadow-sm outline-none"
          />
        </label>
        <label>
          <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-1.5 shadow-sm">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="text-sm outline-none"
            />
            {/* <FaCalendarAlt className="text-slate-400" /> */}
          </div>
        </label>
        <div
          className="relative flex flex-col"
          ref={filterRef}
        >

          <Button
            text="Filter"
            variant="secondary"
            className="rounded-xl px-3 h-[40px] text-sm w-full"
            onClick={() =>
              setShowFilters(!showFilters)
            }
          />

          {showFilters && (

            <div className="absolute right-0 top-full mt-2 w-64 bg-white border rounded-xl shadow-lg p-4 z-50">

              <p className="font-bold mb-3">
                Class & Section
              </p>

              <select
                value={classFilter}
                onChange={(e) =>
                  setClassFilter(e.target.value)
                }
                className="w-full border rounded-lg px-3 py-2 mb-4"
              >
                <option>All Classes</option>
                <option>Class 10-A</option>
                <option>Class 9-B</option>
                <option>Class 8-C</option>
              </select>

              <p className="font-bold mb-3">
                Status
              </p>

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
                className="w-full border rounded-lg px-3 py-2 mb-4"
              >
                <option>All</option>
                <option>Present</option>
                <option>Absent</option>
              </select>

              <p className="font-bold mb-3">
                Sort By
              </p>

              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value)
                }
                className="w-full border rounded-lg px-3 py-2 mb-4"
              >
                <option>Roll No</option>
                <option>Name</option>
              </select>

              <button
                className="w-full bg-red-50 text-red-600 rounded-lg py-2 font-medium"
                onClick={() => {
                  setClassFilter("All Classes");
                  setStatusFilter("All");
                  setSortBy("Roll No");
                  setSearch("");
                  setShowFilters(false);
                }}
              >
                Reset Filters
              </button>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StudentInfo({ student }) {
  return (
    <div className="flex items-center gap-3">
      {/* <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 font-black text-blue-700">
        {student.name.charAt(0)}
      </div> */}
      <div>
        <p className="font-black text-slate-900">{student.name}</p>
      </div>
    </div>
  );
}

function buildAttendance(students, getStatus) {
  return students.reduce((records, student) => {
    records[getStudentKey(student)] = getStatus(student);
    return records;
  }, {});
}

export default Attendance;
