import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Input, Button, Card, Select, SelectItem } from '@heroui/react';

const UpdateSalary = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [salaryData, setSalaryData] = useState({
    name: '',
    department: '',
    specificrole: '',
    basesalary: '',
    bonus: ''
  });

  const departments = ["Software", "HR", "Finance", "Marketing"];

  useEffect(() => {
    axios.get(`http://localhost:8081/getemployee/${id}`)
      .then(res => setSalaryData(res.data))
      .catch(err => console.error("Failed to fetch employee:", err));
  }, [id]);

  const handleChange = (e) => {
    setSalaryData({ ...salaryData, [e.target.name]: e.target.value });
  };

  const handleSelection = (field, value) => {
    setSalaryData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = {
      ...salaryData,
      basesalary: parseInt(salaryData.basesalary),
      bonus: parseInt(salaryData.bonus)
    };

    axios.put(`http://localhost:8081/updatesalary/${id}`, updated)
      .then(() => {
        alert("Salary updated successfully!");
        navigate("/employee-salary");
      })
      .catch(err => alert("Update failed: " + (err.response?.data?.message || err.message)));
  };

  return (
    <div className="flex justify-center mt-10">
      <Card className="p-6 w-full max-w-xl">
        <h2 className="text-xl font-bold mb-4">Update Salary Details</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Name"
            name="name"
            value={salaryData.name}
            onChange={handleChange}
            isRequired
          />
          <Select
            label="Department"
            placeholder="Select department"
            selectedKeys={salaryData.department ? [salaryData.department] : []}
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
            value={salaryData.specificrole}
            onChange={handleChange}
            isRequired
          />

          <Input
            label="Base Salary"
            name="basesalary"
            value={salaryData.basesalary}
            onChange={handleChange}
            type="number"
            isRequired
          />
          <Input
            label="Bonus"
            name="bonus"
            value={salaryData.bonus}
            onChange={handleChange}
            type="number"
            isRequired
          />
          <div className="col-span-2 flex justify-start gap-4 mt-4">
          <Button color="primary" type="submit" >Update Salary</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default UpdateSalary;
