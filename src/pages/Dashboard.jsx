import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardBody, Button } from "@heroui/react";
import { Icon } from '@iconify/react';
import { useAuth } from '../context/AuthContext';
import { Link as RouterLink } from 'react-router-dom';

const Dashboard = () => {
  const { userRole } = useAuth();
  const [employeeCount, setEmployeeCount] = useState(0);
  const [managerCount, setManagerCount] = useState(0);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8081/getemployees")
      .then(res => setEmployeeCount(res.data.length))
      .catch(err => console.error("Error fetching employees:", err));

    axios.get("http://localhost:8081/departments")
      .then(res => setManagerCount(res.data.length))
      .catch(err => console.error("Error fetching managers:", err));

    axios.get("http://localhost:8081/departments")
      .then(res => setDepartments(res.data))
      .catch(err => console.error("Error fetching departments:", err));
  }, []);

  const statCards = [
    { title: "Total Employees", value: employeeCount, icon: "lucide:users", color: "bg-blue-500" },
    { title: "Departments", value: departments.length, icon: "lucide:briefcase", color: "bg-purple-500" },
    { title: "Managers", value: managerCount, icon: "lucide:user-check", color: "bg-green-500" }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome to HR Management System</h1>
      <p className="text-gray-600 mb-6">Manage employees and their information efficiently</p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, idx) => (
          <Card key={idx} className="shadow-sm">
            <CardBody className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                <Icon icon={stat.icon} className="text-white" width={24} />
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Hero Banner */}
      <Card className="mb-8 overflow-hidden">
        <div className="hero-banner text-white p-8 flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-indigo-600 to-purple-500">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">NOW MANAGE EMPLOYEES EFFECTIVELY FROM ANYWHERE</h2>
            <p className="mb-4">Manage Employees Department-Wise</p>
            <Button color="default" variant="solid" as={RouterLink} to="/departments">
              Get Started
            </Button>
          </div>
          <div className="w-full md:w-1/3">
            <img
              src="https://img.heroui.chat/image/dashboard?w=400&h=300&u=emp-mgmt-1"
              alt="Team working"
              className="rounded-lg object-cover w-full"
            />
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {userRole === 'admin' && (
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardBody className="flex flex-col items-center p-6">
                <div className="bg-blue-100 p-3 rounded-full mb-4">
                  <Icon icon="lucide:folder-plus" className="text-blue-600" width={24} />
                </div>
                <h3 className="font-semibold mb-2">Feedback Details</h3>
                <p className="text-sm text-gray-500 text-center mb-4">Can see the Contact/Feedback details</p>
                <Button color="primary" variant="flat" size="sm" as={RouterLink} to="/contact/messages">
                  Add Now
                </Button>
              </CardBody>
            </Card>
          )}

          {userRole === 'manager' && (
            <>
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardBody className="flex flex-col items-center p-6">
                  <div className="bg-purple-100 p-3 rounded-full mb-4">
                    <Icon icon="lucide:users" className="text-purple-600" width={24} />
                  </div>
                  <h3 className="font-semibold mb-2">Recruitment & Onboarding</h3>
                  <p className="text-sm text-gray-500 text-center mb-4">Select candidates for interview</p>
                  <Button color="primary" variant="flat" size="sm" as={RouterLink} to="/manager/applications">
                    View Now
                  </Button>
                </CardBody>
              </Card>

              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardBody className="flex flex-col items-center p-6">
                  <div className="bg-blue-100 p-3 rounded-full mb-4">
                    <Icon icon="lucide:user-plus" className="text-blue-600" width={24} />
                  </div>
                  <h3 className="font-semibold mb-2">Manage Leave Request</h3>
                  <p className="text-sm text-gray-500 text-center mb-4">Approve or reject leave requests</p>
                  <Button color="primary" variant="flat" size="sm" as={RouterLink} to="/manage-leaves">
                    Manage Leaves
                  </Button>
                </CardBody>
              </Card>
            </>
          )}

          {userRole === 'employee' && (
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardBody className="flex flex-col items-center p-6">
                <div className="bg-blue-100 p-3 rounded-full mb-4">
                  <Icon icon="lucide:calendar" className="text-blue-500" width={24} />
                </div>
                <h3 className="font-semibold mb-2">View Leave Requests</h3>
                <p className="text-sm text-gray-500 text-center mb-4">Track your leave status</p>
                <Button color="primary" variant="flat" size="sm" as={RouterLink} to="/my-leaves">
                  Request Leave
                </Button>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
