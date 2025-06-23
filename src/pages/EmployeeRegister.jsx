import React, { useState } from 'react';
import axios from 'axios';
import { Card, Input, Select, SelectItem, Button, Form, Divider } from "@heroui/react";
import { Link, useNavigate } from 'react-router-dom';

const EmployeeRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    emailId: "",
    password: "",
    department: new Set([]),
    specificrole: "",
    status: new Set([]),
    basesalary: "",
    bonus: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(false);
    setError("");

    const payload = {
      ...formData,
      department: Array.from(formData.department)[0] || "",
      status: Array.from(formData.status)[0] || "",
      basesalary: parseFloat(formData.basesalary),
      bonus: parseFloat(formData.bonus)
    };

    try {
      const response = await axios.post('http://localhost:8081/emp', payload);

      if (response.status === 200 || response.status === 201) {
        navigate('/login');
      } else {
        setError("Employee registration failed.");
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

  const statuses = [
    { key: "active", label: "Active" },
    { key: "inactive", label: "Inactive" },
    { key: "pending", label: "Pending" }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-2xl">
        <Card className="p-0 shadow-lg">
          <div className="bg-purple-700 text-white p-4 rounded-t-lg">
            <h1 className="text-xl font-semibold text-center">Register Employee</h1>
          </div>

          <Form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Full Name" value={formData.name} onValueChange={(v) => handleChange("name", v)} isRequired />
              <Input label="Email ID" type="email" value={formData.emailId} onValueChange={(v) => handleChange("emailId", v)} isRequired />
              <Input label="Password" type="password" value={formData.password} onValueChange={(v) => handleChange("password", v)} isRequired />
              <Select label="Department" selectedKeys={formData.department} onSelectionChange={(keys) => handleChange("department", keys)} isRequired>
                {departments.map((d) => <SelectItem key={d.key}>{d.label}</SelectItem>)}
              </Select>
              <Input label="Specific Role" value={formData.specificrole} onValueChange={(v) => handleChange("specificrole", v)} isRequired />
              <Select label="Status" selectedKeys={formData.status} onSelectionChange={(keys) => handleChange("status", keys)} isRequired>
                {statuses.map((s) => <SelectItem key={s.key}>{s.label}</SelectItem>)}
              </Select>
              <Input label="Base Salary (INR)" type="number" value={formData.basesalary} onValueChange={(v) => handleChange("basesalary", v)} isRequired />
              <Input label="Bonus (INR)" type="number" value={formData.bonus} onValueChange={(v) => handleChange("bonus", v)} isRequired />
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
                Register Employee
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeRegister;
