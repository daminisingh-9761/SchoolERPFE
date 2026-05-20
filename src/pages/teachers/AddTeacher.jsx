import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "/src/components/layouts/Layout";
import Button from "/src/components/common/Button";
import FormField from "/src/components/common/FormField";

function AddTeacher() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    status: "Active",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddTeacher = () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.phone) {
      alert("Please fill in all fields before adding a teacher.");
      return;
    }

    const savedTeachers = localStorage.getItem("teachers");
    const teachers = savedTeachers ? JSON.parse(savedTeachers) : [];

    const newTeacher = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      phone: formData.phone,
      status: formData.status,
    };

    teachers.push(newTeacher);
    localStorage.setItem("teachers", JSON.stringify(teachers));
    window.dispatchEvent(new Event("teachersUpdated"));
    navigate("/teachers");
  };

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-8">Add Teacher</h1>
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="grid grid-cols-2 gap-6">
            <FormField
              label="Teacher Name"
              type="text"
              placeholder="Enter Teacher Name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <FormField
              label="Email"
              type="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            <FormField
              label="Subject"
              type="text"
              placeholder="Enter Subject"
              value={formData.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
            />
            <FormField
              label="Phone Number"
              type="text"
              placeholder="Enter Phone Number"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>
          <Button
            text="Add Teacher"
            className="mt-8"
            onClick={handleAddTeacher}
          />
        </div>
      </div>
    </Layout>
  );
}

export default AddTeacher;