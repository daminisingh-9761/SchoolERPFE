import { useState, useEffect } from "react";
import Layout from "/src/components/layouts/Layout";
import { Link } from "react-router-dom";
import Button from "/src/components/common/Button";
import Table from "/src/components/common/Table";
import SearchBar from "/src/components/common/SearchBar";
import StatusBadge from "/src/components/common/StatusBadge";
import api from "../../services/api";
import { FaEdit, FaTrash } from "react-icons/fa";
function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const fetchTeachers = async () => {
    try {

      const response = await api.get("/teachers/");

      setTeachers(response.data);

    } catch (error) {

      console.log(error);

    }
  };
  const [editingIndex, setEditingIndex] = useState(null);
  const [editFormData, setEditFormData] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditFormData({ ...teachers[index] });
  };

 const handleDelete = async (teacherId) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this teacher?"
  );

  if (!confirmDelete) return;

  try {

    const response = await api.delete(
      `/teachers/${teacherId}`
    );

    alert(response.data.message);

    await fetchTeachers();

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.detail ||
      "Delete Failed"
    );
  }
};

  const handleEditFormChange = (field, value) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

 const handleSaveEdit = async () => {

  try {

    const response = await api.put(
      `/teachers/${editFormData._id}`,
      {
        name: editFormData.name,
        email: editFormData.email,
        subject: editFormData.subject,
        phone: editFormData.phone || "",
        address: editFormData.address || "",
        status: editFormData.status,
      }
    );

    alert(response.data.message);

    await fetchTeachers();

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

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditFormData(null);
  };

  return (
    <Layout>

      <div className="p-8">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-4xl font-bold">
            Teachers Management
          </h1>

          <Link to="/add-teacher">

            <Button  text="Add Teacher"   className="px-5 py-3 rounded-xl shadow-md" />

          </Link>

        </div>


        <SearchBar placeholder="Search Teachers..." />
        <Table
          columns={["Name", "Email", "Subject", "Status"]}
          data={teachers.map((teacher) => ({
            ...teacher,
            class: teacher.subject,
            status: <StatusBadge status={teacher.status} />,
          }))}
          renderActions={(item) => (
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(
                  teachers.findIndex(
                    (teacher) => teacher._id === item._id
                  )
                )}
                className="text-slate-700 hover:text-blue-600 transition"
              >
                <FaEdit size={18} />
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="text-slate-700 hover:text-red-600 transition"
              >
                <FaTrash size={18} />
              </button>
            </div>
          )}
        />

        {editingIndex !== null && editFormData && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-6">Edit Teacher</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={editFormData.name}
                    onChange={(e) => handleEditFormChange("name", e.target.value)}
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
                    onChange={(e) => handleEditFormChange("email", e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={editFormData.subject}
                    onChange={(e) => handleEditFormChange("subject", e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={editFormData.status}
                    onChange={(e) => handleEditFormChange("status", e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button
                  text="Cancel"
                  variant="secondary"
                  className="px-5 py-2"
                  onClick={handleCancelEdit}
                />
                <Button
                  text="Save"
                  variant="primary"
                  className="px-5 py-2"
                  onClick={handleSaveEdit}
                />
              </div>
            </div>
          </div>
        )}

      </div>

    </Layout>
  );
}

export default Teachers;