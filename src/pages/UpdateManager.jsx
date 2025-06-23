import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Input, Button, Card, Select, SelectItem } from '@heroui/react';

const UpdateManager = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [manager, setManager] = useState({
    fname: '',
    lname: '',
    emailId: '',
    password: '',
    gender: '',
    department: '',
    salary: '',
    experience: ''
  });

  const departments = ["Software", "HR", "Finance", "Marketing"];
  const genders = ["Male", "Female"];

  useEffect(() => {
    axios.get(`http://localhost:8081/getmanager/${id}`)
      .then(res => setManager(res.data))
      .catch(err => console.error("Failed to fetch manager:", err));
  }, [id]);

  const handleChange = (e) => {
    setManager({ ...manager, [e.target.name]: e.target.value });
  };

  const handleSelection = (field, value) => {
    setManager(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8081/updatemanager/${id}`, manager)
      .then(() => {
        alert("Manager updated successfully!");
        navigate("/departments");
      })
      .catch(err => alert("Update failed: " + (err.response?.data?.message || err.message)));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-xl p-8 shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Update Manager Details</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            name="fname"
            value={manager.fname}
            onChange={handleChange}
            isRequired
          />
          <Input
            label="Last Name"
            name="lname"
            value={manager.lname}
            onChange={handleChange}
            isRequired
          />
          <Input
            label="Email"
            name="emailId"
            value={manager.emailId}
            onChange={handleChange}
            type="email"
            isRequired
          />
          <Input
            label="New Password"
            name="password"
            placeholder="Enter new password"
            value={manager.password}
            onChange={handleChange}
            type="password"
          />

          <Select
            label="Gender"
            placeholder="Select gender"
            selectedKeys={manager.gender ? [manager.gender] : []}
            onSelectionChange={(keys) => handleSelection("gender", Array.from(keys)[0])}
            isRequired
          >
            {genders.map(g => (
              <SelectItem key={g} value={g}>{g}</SelectItem>
            ))}
          </Select>

          <Select
            label="Department"
            placeholder="Select department"
            selectedKeys={manager.department ? [manager.department] : []}
            onSelectionChange={(keys) => handleSelection("department", Array.from(keys)[0])}
            isRequired
          >
            {departments.map(dept => (
              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
            ))}
          </Select>

          <Input
            label="Salary"
            name="salary"
            value={manager.salary}
            onChange={handleChange}
            type="number"
            isRequired
          />
          <Input
            label="Experience"
            name="experience"
            value={manager.experience}
            onChange={handleChange}
            isRequired
          />

          <div className="col-span-2 flex justify-center gap-4 mt-4">
            <button type="button" onClick={() => navigate('/departments')} className="px-3 py-1 text-sm border border-gray-400 rounded hover:bg-gray-100">
              Cancel
            </button>
            <Button color="primary" type="submit" className="text-sm h-9 px-4 min-w-[100px]">
              Update
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default UpdateManager;
