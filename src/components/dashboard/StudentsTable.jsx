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
    <div className="mt-8">

      <h2 className="text-2xl font-bold mb-5">
        Students List
      </h2>

      <Table
        columns={[
          "Name",
          "Class",
          "Attendance",
          "Status",
        ]}

        data={students}
      />

    </div>
  );
}

export default StudentsTable;