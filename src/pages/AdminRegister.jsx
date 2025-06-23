import React, { useState } from 'react';
import axios from 'axios';
import { Card, Input, Button, Form } from "@heroui/react";
import { Icon } from '@iconify/react';
import { useNavigate, Link } from 'react-router-dom';

const AdminRegister = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!emailId || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8081/admin', {
        emailId,
        password
      });

      if (response.data) {
        navigate('/login');
      } else {
        setError("Registration failed.");
      }
    } catch (err) {
      setError("Error: " + (err.response?.data?.message || err.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-5">
      <Card className="p-0 shadow-md">
        <div className="bg-[#6b21a8] text-white p-4 rounded-t-lg">
          <h1 className="text-xl font-semibold text-center">Admin Register</h1>
        </div>

        <Form onSubmit={handleRegister} className="p-6 space-y-5">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <Input
            label="Email ID"
            placeholder="Enter your email"
            type="email"
            value={emailId}
            onValueChange={setEmailId}
            isRequired
            startContent={<Icon icon="lucide:mail" className="text-default-400" />}
          />

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
              Register
            </Button>
          </div>
        </Form>
      </Card>

      <div className="mt-4 text-center text-sm text-gray-600">
        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminRegister;
