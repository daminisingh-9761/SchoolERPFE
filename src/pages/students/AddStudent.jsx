import Layout from "/src/components/layouts/Layout";
import Button from "/src/components/common/Button";
import FormField from "/src/components/common/FormField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function AddStudent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    class: "",
    phone: "",
    address: "",
    gender: "",
    parentName: "",

  });
  const [errors, setErrors] = useState({});
  const handleChange = (field, value) => {

    setFormData((prev) => ({

      ...prev,

      [field]: value,

    }));

  };
  const handleAddStudent = async () => {

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

    if (!formData.class.trim()) {
      newErrors.class = "This field is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "This field is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "This field is required";
    }
    if (!formData.gender.trim()) {
      newErrors.gender = "Please select gender";
    }
    if (!formData.parentName.trim()) {
      newErrors.parentName = "This field is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    try {

      const response = await api.post("/students/", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        class_name: formData.class,
        phone: formData.phone,
        address: formData.address,
        gender: formData.gender,
        parent_name: formData.parentName,

      });

      alert(response.data.message);

      navigate("/students");

    } catch (error) {

      const details = error.response?.data?.detail;

      const fieldLabels = {
        name: "Student Name is required",
        email: "Please enter a valid email",
        password: "Password must be at least 6 characters",
        class_name: "Class is required",
        phone: "Phone number must be 10 digits",
        address: "Address is required",
        gender: "Please select gender",
        parent_name: "Parent name is required",
      };

      if (Array.isArray(details)) {

        const newErrors = {};

        details.forEach((item) => {

          const field = item.loc[item.loc.length - 1];

          newErrors[field] =
            fieldLabels[field] || item.msg;
        });

        setErrors(newErrors);

      } else {

        alert(details || "Failed to create student");
      }
    }
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
              type="name"
              placeholder="Enter Student Name"
              value={formData.name}
              onChange={(e) =>
                handleChange("name", e.target.value)
              }
              error={errors.name}
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
              error={errors.email}
            />

            {/* Password */}
            <FormField
              label="Password"
              type="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={(e) =>
                handleChange("password", e.target.value)
              }
              error={errors.password}
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
              error={errors.class}
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
              error={errors.phone}
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
              error={errors.address}
            />
            {/* Gender */}
            <div>
              <label className="block mb-2 font-semibold">
                Gender
              </label>

              <div className="flex items-center gap-6 h-[52px]">

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={(e) =>
                      handleChange("gender", e.target.value)
                    }
                  />
                  Male
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={(e) =>
                      handleChange("gender", e.target.value)
                    }
                  />
                  Female
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="Other"
                    checked={formData.gender === "Other"}
                    onChange={(e) =>
                      handleChange("gender", e.target.value)
                    }
                  />
                  Other
                </label>

              </div>

              {errors.gender && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.gender}
                </p>
              )}
            </div>
            {/* Parent Name */}
            <FormField
              label="Parent Name"
              type="text"
              placeholder="Enter Parent Name"
              value={formData.parentName}
              onChange={(e) =>
                handleChange("parentName", e.target.value)
              }
              error={errors.parentName}
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