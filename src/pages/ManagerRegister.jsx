import React from 'react';
import axios from 'axios';
import { Card, Input, Select, SelectItem, Button, Form, Divider } from "@heroui/react";
import { Link, useNavigate } from 'react-router-dom';

const ManagerRegister = () => {
  const [formData, setFormData] = React.useState({
    fname: "",
    lname: "",
    emailId: "",
    password: "",
    gender: new Set([]),
    department: new Set([]),
    experience: "",
    salary: ""
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const payload = {
      ...formData,
      gender: Array.from(formData.gender)[0] || "",
      department: Array.from(formData.department)[0] || "",
      salary: parseFloat(formData.salary)
    };

    try {
      const response = await axios.post("http://localhost:8081/manager", payload);
      if (response.status === 200 || response.status === 201) {
        navigate("/login");
      } else {
        setError("Manager registration failed.");
      }
    } catch (err) {
      setError("Error: " + (err.response?.data?.message || err.message));
    } finally {
      setIsLoading(false);
    }
  };

  const departments = [
    { key: "software", label: "Software Development" },
    { key: "marketing", label: "Marketing" },
    { key: "hr", label: "HR" },
    { key: "finance", label: "Finance" }
  ];

  const genders = [
    { key: "male", label: "Male" },
    { key: "female", label: "Female" },
    { key: "other", label: "Other" }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-2xl">
        <Card className="p-0 shadow-lg">
          <div className="bg-purple-700 text-white p-4 rounded-t-lg">
            <h1 className="text-xl font-semibold text-center">Register Manager</h1>
          </div>

          <Form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="First Name" value={formData.fname} onValueChange={(v) => handleChange("fname", v)} isRequired />
              <Input label="Last Name" value={formData.lname} onValueChange={(v) => handleChange("lname", v)} isRequired />
              <Input label="Email ID" type="email" value={formData.emailId} onValueChange={(v) => handleChange("emailId", v)} isRequired />
              <Input label="Password" type="password" value={formData.password} onValueChange={(v) => handleChange("password", v)} isRequired />
              <Select label="Gender" selectedKeys={formData.gender} onSelectionChange={(keys) => handleChange("gender", keys)} isRequired>
                {genders.map((g) => <SelectItem key={g.key}>{g.label}</SelectItem>)}
              </Select>
              <Select label="Department" selectedKeys={formData.department} onSelectionChange={(keys) => handleChange("department", keys)} isRequired>
                {departments.map((d) => <SelectItem key={d.key}>{d.label}</SelectItem>)}
              </Select>
              <Input label="Experience (Years)" value={formData.experience} onValueChange={(v) => handleChange("experience", v)} isRequired />
              <Input label="Salary (INR)" type="number" value={formData.salary} onValueChange={(v) => handleChange("salary", v)} isRequired />
            </div>

            <Divider />

            <div className="flex justify-end gap-4 mt-6">
              <Link
                to="/"
                className="inline-flex items-center justify-center px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-100 transition duration-200"
              >
                Cancel
              </Link>
              <Button
                type="submit"
                color="primary"
                isLoading={isLoading}
                className="rounded-lg px-6 py-2 shadow-md hover:shadow-lg transition duration-200"
              >
                Register Manager
              </Button>
            </div>

          </Form>
        </Card>
      </div>
    </div>
  );
};

export default ManagerRegister;
