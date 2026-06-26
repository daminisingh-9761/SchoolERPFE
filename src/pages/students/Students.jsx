import Layout from "/src/components/layouts/Layout";
import { Link } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import Button from "/src/components/common/Button";
import Table from "/src/components/common/Table";
import api from "../../services/api";
import { FaEdit, FaTrash } from "react-icons/fa";

function Students() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );
  const role = user?.role;
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editFormData, setEditFormData] = useState(null);

  const filteredStudents = useMemo(() => {
    return students.filter((student) =>
      [student.name, student.email, student.class_name, student.status]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, students]);

  const fetchStudents = async () => {
    try {
      const response = await api.get("/students/");

      setStudents(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleEdit = (index) => {
    if (role !== "superadmin") {
      return;
    }
    setEditingIndex(index);
    setEditFormData({ ...students[index] });
  };

  const handleSaveEdit = async () => {

    try {

      const response = await api.put(
        `/students/${editFormData._id}`,
        {
          name: editFormData.name,
          email: editFormData.email,
          class_name: editFormData.class_name,
          gender: editFormData.gender,
          phone: editFormData.phone || "",
          address: editFormData.address || "",
          parent_name: editFormData.parent_name || "",
          status: editFormData.status,
        }
      );

      alert(response.data.message);

      await fetchStudents();

      setEditingIndex(null);
      setEditFormData(null);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.detail ||
        "Update Failed"
      );
    }
  };

  const handleDelete = async (
    studentId
  ) => {

    if (role !== "superadmin") {
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {

      const response = await api.delete(
        `/students/${studentId}`
      );

      alert(response.data.message);

      await fetchStudents();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.detail ||
        "Delete Failed"
      );
    }
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

            {
              role === "superadmin" && (
                <Button
                  text="+ Add Student"
                />
              )
            }

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
            "Gender",
            "Status",
          ]}

          data={filteredStudents.map((student, idx) => ({
            ...student,
            class: student.class_name,
            gender: student.gender,
            _index: idx,
          }))}

          renderActions={
            role === "superadmin"
              ? (item) => (
                <div className="flex gap-4 items-center">
                  <button
                    onClick={() =>
                      handleEdit(item._index)
                    }
                    className="text-slate-700 hover:text-blue-600 transition"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() =>
                      handleDelete(item._id)
                    }
                    className="text-slate-700 hover:text-red-600 transition"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              )
              : null
          }
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
                    Class_name
                  </label>
                  <input
                    type="text"
                    value={editFormData.class_name}
                    onChange={(e) =>
                      handleEditFormChange("class_name", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>

                  <select
                    value={editFormData.gender}
                    onChange={(e) =>
                      handleEditFormChange(
                        "gender",
                        e.target.value
                      )
                    }
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Male">
                      Male
                    </option>

                    <option value="Female">
                      Female
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>
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