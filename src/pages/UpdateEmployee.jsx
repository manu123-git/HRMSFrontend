import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Input, Button, Card, Select, SelectItem } from '@heroui/react';

const UpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: '',
    emailId: '',
    department: '',
    specificrole: '',
    status: ''
  });

  const departments = ["Software", "HR", "Finance", "Marketing"];
  const statuses = ["Active", "Inactive", "Pending"];

  useEffect(() => {
    axios.get(`http://localhost:8081/getemployee/${id}`)
      .then(res => setEmployee(res.data))
      .catch(err => console.error("Failed to fetch employee:", err));
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSelection = (field, value) => {
    setEmployee(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8081/updateemp/${id}`, employee)
      .then(() => {
        alert("Employee updated successfully!");
        navigate("/employees");
      })
      .catch(err => alert("Update failed: " + (err.response?.data?.message || err.message)));
  };

  return (
    <div className="flex justify-center mt-10">
      <Card className="p-6 w-full max-w-xl">
        <h2 className="text-xl font-bold mb-4">Update Employee Data</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Name"
            name="name"
            value={employee.name}
            onChange={handleChange}
            isRequired
          />

          <Input
            label="Email"
            name="emailId"
            value={employee.emailId}
            onChange={handleChange}
            type="email"
            isRequired
          />

          <Select
            label="Department"
            placeholder="Select department"
            selectedKeys={employee.department ? [employee.department] : []}
            onSelectionChange={(keys) => handleSelection("department", Array.from(keys)[0])}
            isRequired
          >
            {departments.map(dept => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </Select>

          <Input
            label="Role"
            name="specificrole"
            value={employee.specificrole}
            onChange={handleChange}
            isRequired
          />

          <Select
            label="Status"
            placeholder="Select status"
            selectedKeys={employee.status ? [employee.status] : []}
            onSelectionChange={(keys) => handleSelection("status", Array.from(keys)[0])}
            isRequired
          >
            {statuses.map(status => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </Select>

          <Button color="primary" size="lg" type="submit" className="w-50 self-center">
            Update
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default UpdateEmployee;
