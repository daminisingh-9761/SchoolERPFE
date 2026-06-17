import { useEffect, useState } from "react";
import Table from "/src/components/common/Table";
import { students as initialStudents } from "../../utils/constants";

function StudentsTable() {
  const [students, setStudents] = useState(initialStudents);

  useEffect(() => {
    const loadStudents = () => {
      const saved = localStorage.getItem("students");
      if (!saved) {
        setStudents(initialStudents);
        return;
      }

      try {
        const parsed = JSON.parse(saved);
        if (!Array.isArray(parsed)) {
          setStudents(initialStudents);
          return;
        }

        setStudents(
          parsed.map((student) => ({
            ...student,
            attendance: student.status === "Active" ? "Present" : "Absent",
          }))
        );
      } catch {
        setStudents(initialStudents);
      }
    };

    loadStudents();

    const handleStudentsUpdated = () => {
      loadStudents();
    };

    window.addEventListener("storage", handleStudentsUpdated);
    window.addEventListener("studentsUpdated", handleStudentsUpdated);
    return () => {
      window.removeEventListener("storage", handleStudentsUpdated);
      window.removeEventListener("studentsUpdated", handleStudentsUpdated);
    };
  }, []);

  return (
    <section>
      <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <h2 className="mt-1 text-xl tracking-tight text-black-600">
            Students List
          </h2>
        </div>
        <span className="text-sm font-semibold text-slate-500">
          {students.length} records
        </span>
      </div>

      <Table
        columns={[
          "Name",
          "Class",
          "Attendance",
          "Status",
        ]}

        data={students}
      />
    </section>
  );
}

export default StudentsTable;
