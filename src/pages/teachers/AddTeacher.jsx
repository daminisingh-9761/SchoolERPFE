import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "/src/components/layouts/Layout";
import Button from "/src/components/common/Button";
import FormField from "/src/components/common/FormField";
import api from "../../services/api";

function AddTeacher() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  subject: "",
  phone: "",
  address: "",
});

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddTeacher = async () => {

  const newErrors = {};

  if (!formData.name.trim()) {
    newErrors.name = "This field is required";
  }

  if (!formData.email.trim()) {
    newErrors.email = "This field is required";
  }

  if (!formData.password.trim()) {
    newErrors.password = "This field is required";
  }

  if (!formData.subject.trim()) {
    newErrors.subject = "This field is required";
  }

  if (!formData.phone.trim()) {
    newErrors.phone = "This field is required";
  }

  if (!formData.address.trim()) {
    newErrors.address = "This field is required";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setErrors({});

  try {

    const response = await api.post(
      "/teachers/",
      {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        subject: formData.subject,
        phone: formData.phone,
        address: formData.address,
      }
    );

    alert(response.data.message);

    navigate("/teachers");

  } catch (error) {

    alert(
      error.response?.data?.detail ||
      "Failed to create teacher"
    );
  }
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
              error={errors.name}
            />
            <FormField
              label="Email"
              type="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              error={errors.email}
            />
            <FormField
              label="Password"
              type="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              error={errors.password}
            />
            <FormField
              label="Subject"
              type="text"
              placeholder="Enter Subject"
              value={formData.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
              error={errors.subject}
            />
            <FormField
              label="Phone Number"
              type="text"
              placeholder="Enter Phone Number"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              error={errors.phone}
            />
            <FormField
              label="Address"
              type="text"
              placeholder="Enter Address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              error={errors.address}
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