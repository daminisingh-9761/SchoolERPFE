import { useEffect, useState } from "react";
import Table from "/src/components/common/Table";
import api from "../../services/api";


function StudentsTable() {
 const [students, setStudents] = useState([]);

useEffect(() => {

  const fetchStudents = async () => {

    try {

      const response = await api.get("/students/");

      const formattedStudents = response.data.map(
        (student) => ({
          ...student,
          class: student.class,
          attendance:
            student.status === "Active"
              ? "Present"
              : "Absent",
        })
      );

      setStudents(formattedStudents);

    } catch (error) {

      console.log(error);

    }
  };

  fetchStudents();

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
