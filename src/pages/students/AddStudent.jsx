import Layout from "/src/components/layouts/Layout";
import Button from "/src/components/common/Button";
import FormField from "/src/components/common/FormField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddStudent() {
  const navigate = useNavigate();

const [formData, setFormData] = useState({

  name: "",
  email: "",
  class: "",
  phone: "",
  address: "",
  parentName: "",

});
const handleChange = (field, value) => {

  setFormData((prev) => ({

    ...prev,

    [field]: value,

  }));

};
const handleAddStudent = () => {
  console.log(formData);

  const existingStudents =
    JSON.parse(localStorage.getItem("students")) || [];

  const newStudent = {

    id: Date.now(),

    name: formData.name,

    email: formData.email,

    class: formData.class,

    status: "Active",

  };

  const updatedStudents = [

    ...existingStudents,

    newStudent,

  ];

  localStorage.setItem(
    "students",
    JSON.stringify(updatedStudents)
  );
  window.dispatchEvent(new Event("studentsUpdated"));

  navigate("/students");

};
  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-8">
          Add Student
        </h1>
         {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          {/* Form Grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Student Name */}
                <FormField
  label="Student Name"
  type="text"
  placeholder="Enter Student Name"
  value={formData.name}
  onChange={(e) =>
    handleChange("name", e.target.value)
  }
/>
            {/* Email */}
           <FormField
  label="Email"
  type="email"
  placeholder="Enter Email"
  value={formData.email}
  onChange={(e) =>
    handleChange("email", e.target.value)
  }
/>
            {/* Class */}
           <FormField
  label="Class"
  type="text"
  placeholder="Enter Class"
  value={formData.class}
  onChange={(e) =>
    handleChange("class", e.target.value)
  }
/>
            {/* Phone */}
           <FormField
  label="Phone Number"
  type="text"
  placeholder="Enter Phone Number"
  value={formData.phone}
  onChange={(e) =>
    handleChange("phone", e.target.value)
  }
/>
            {/* Address */}
            <FormField
  label="Address"
  type="text"
  placeholder="Enter Address"
  value={formData.address}
  onChange={(e) =>
    handleChange("address", e.target.value)
  }
/>
            {/* Parent Name */}
            <FormField
  label="Parent Name"
  type="text"
  placeholder="Enter Parent Name"
  value={formData.parentName}
  onChange={(e) =>
    handleChange("parentName", e.target.value)
  }
/>
          </div>
        
          {/* Button */}
          <Button
            text="Add Student"
            className="mt-8"
            onClick={handleAddStudent}
          />
        </div>
      </div>
    </Layout>
  );
}
export default AddStudent;