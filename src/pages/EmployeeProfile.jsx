import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardBody, CardHeader, Button } from '@heroui/react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const EmployeeProfile = () => {
  const { user } = useAuth();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/getemploye/${user.emailId}`);
        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.emailId) {
      fetchEmployee();
    }
  }, [user?.emailId]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!employee) return <p className="text-center mt-10 text-red-500">Employee data not found.</p>;

  const totalSalary = (employee.basesalary || 0) + (employee.bonus || 0);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="shadow-lg">
        <CardHeader className="text-lg font-semibold bg-purple-100 text-purple-800 p-4 rounded-t">
          Employee Profile
        </CardHeader>
        <CardBody className="space-y-3 text-gray-700">
          <p><strong>Full Name:</strong> {employee.name}</p>
          <p><strong>Email:</strong> {employee.emailId}</p>
          <p><strong>Department:</strong> {employee.department}</p>
          <p><strong>Role:</strong> {employee.specificrole}</p>
          <p><strong>Status:</strong> {employee.status}</p>
          <p><strong>Base Salary:</strong> ₹{employee.basesalary}</p>
          <p><strong>Bonus:</strong> ₹{employee.bonus}</p>
          <p><strong>Total Salary:</strong> ₹{totalSalary}</p>
        </CardBody>
      </Card>
    </div>
  );
};

export default EmployeeProfile;
