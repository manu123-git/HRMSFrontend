import React from 'react';
import axios from 'axios';
import { Card, Input, Select, SelectItem, Button, Form } from "@heroui/react";
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [emailId, setEmailId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState(new Set([]));
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const selectedRole = Array.from(role)[0]; // Convert Set to string

    if (!emailId || !password || !selectedRole) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      let response;

      if (selectedRole === "admin") {
        response = await axios.post('http://localhost:8081/adminlogin', { emailId, password });
      } else if (selectedRole === "manager") {
        response = await axios.post('http://localhost:8081/managerlogin', { emailId, password });
      } else if (selectedRole === "employee") {
        response = await axios.post('http://localhost:8081/employeelogin', { emailId, password });
      }

      if (response.status === 200 && response.data.message === "Login Successful") {
        const userData = {
          ...response.data.user, // 👈 includes id, emailId, etc.
          role: selectedRole     // ✅ add role here
        };

        login(userData);          // ✅ saves full user object in context
        navigate('/');
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const roles = [
    { key: "admin", label: "Admin" },
    { key: "manager", label: "Manager" },
    { key: "employee", label: "Employee" }
  ];

  return (
    <div className="w-full max-w-md">
      <Card className="p-0 shadow-md">
        <div className="bg-[#6b21a8] text-white p-4 rounded-t-lg">
          <h1 className="text-xl font-semibold text-center">User Login</h1>
        </div>

        <Form onSubmit={handleLogin} className="p-6 space-y-5">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            value={emailId}
            onValueChange={setEmailId}
            isRequired
            startContent={<Icon icon="lucide:mail" className="text-default-400" />}
          />

          <Select
            label="User Role"
            placeholder="Select role"
            selectedKeys={role}
            onSelectionChange={setRole}
            isRequired
            className="w-full"
          >
            {roles.map((role) => (
              <SelectItem key={role.key} value={role.key}>
                {role.label}
              </SelectItem>
            ))}
          </Select>

          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onValueChange={setPassword}
            isRequired
            startContent={<Icon icon="lucide:lock" className="text-default-400" />}
          />

          <div className="pt-2">
            <Button
              type="submit"
              color="primary"
              className="w-full bg-[#6b21a8] hover:bg-[#581c87]"
              isLoading={isLoading}
            >
              Login
            </Button>
          </div>
        </Form>
      </Card>

      <div className="mt-4 text-center text-sm text-gray-600">
        <p>Don't have an account? Contact your administrator</p>
      </div>
    </div>
  );
};

export default Login;
