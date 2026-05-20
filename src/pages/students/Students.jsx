import Layout from "/src/components/layouts/Layout";
import { Link } from "react-router-dom";
import { useState, useMemo, useEffect} from "react";
import Button from "/src/components/common/Button";
import Table from "/src/components/common/Table";
import { students as initialStudents } from "../../utils/constants";


function Students() {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState(() => {

  const savedStudents =
    localStorage.getItem("students");

  return savedStudents
    ? JSON.parse(savedStudents)
    : initialStudents;

});
  const [editingIndex, setEditingIndex] = useState(null);
  const [editFormData, setEditFormData] = useState(null);
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
    window.dispatchEvent(new Event("studentsUpdated"));
  }, [students]);

  const filteredStudents = useMemo(() => {
    return students.filter((student) =>
      [student.name, student.email, student.class, student.status]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, students]);

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditFormData({ ...students[index] });
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null && editFormData) {
      const newStudents = [...students];
      newStudents[editingIndex] = editFormData;
      setStudents(newStudents);
      setEditingIndex(null);
      setEditFormData(null);
    }
  };

  const handleDelete = (index) => {
    const newStudents = students.filter((_, i) => i !== index);
    setStudents(newStudents);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditFormData(null);
  };

  const handleEditFormChange = (field, value) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  return (
    <Layout>

      <div className="p-8">

        <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
            Students Management
          </h1>
        
            <Link to="/add-student">

              <Button text="Add Student" />

            </Link>
          </div>
      

        {/* Search */}
        <div className="bg-white p-5 rounded-2xl shadow-md mb-8">
          <input
            type="text"
            placeholder="Search Students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Table */}
        <Table
          columns={[
            "Name",
            "Email",
            "Class",
            "Status",
          ]}

          data={filteredStudents.map((student, idx) => ({
            ...student,
            _index: idx,
          }))}

          renderActions={(item) => (
            <div className="flex gap-2">
              <Button
                text="Edit"
                variant="warning"
                className="px-4 py-2 text-sm"
                onClick={() => handleEdit(item._index)}
              />

              <Button
                text="Delete"
                variant="danger"
                className="px-4 py-2 text-sm"
                onClick={() => handleDelete(item._index)}
              />
            </div>
          )}
        />

        {/* Edit Modal */}
        {editingIndex !== null && editFormData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-6 text-slate-800">Edit Student</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={editFormData.name}
                    onChange={(e) =>
                      handleEditFormChange("name", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editFormData.email}
                    onChange={(e) =>
                      handleEditFormChange("email", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Class
                  </label>
                  <input
                    type="text"
                    value={editFormData.class}
                    onChange={(e) =>
                      handleEditFormChange("class", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={editFormData.status}
                    onChange={(e) =>
                      handleEditFormChange("status", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <Button
                  text="Save Changes"
                  variant="primary"
                  className="flex-1"
                  onClick={handleSaveEdit}
                />
                <Button
                  text="Cancel"
                  variant="secondary"
                  className="flex-1"
                  onClick={handleCancelEdit}
                />
              </div>
            </div>
          </div>
        )}

      </div>

    </Layout>
  );
}

export default Students;