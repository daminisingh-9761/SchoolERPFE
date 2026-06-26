import { useEffect, useState } from "react";
import Table from "/src/components/common/Table";
import api from "../../services/api";

function TeachersTable() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await api.get("/teachers/");
        setTeachers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTeachers();
  }, []);

  return (
    <section>
      <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <h2 className="mt-1 text-xl tracking-tight text-black-600">
            Teachers List
          </h2>
        </div>
        <span className="text-sm font-semibold text-slate-500">
          {teachers.length} records
        </span>
      </div>

      <Table
        columns={["Name", "Subject", "Qualification", "Contact"]}
        data={teachers.map((t) => ({
          name: t.name,
          subject: t.subject || t.subjects || "—",
          qualification: t.qualification || "—",
          contact: t.contact || t.phone || "—",
        }))}
      />
    </section>
  );
}

export default TeachersTable;
