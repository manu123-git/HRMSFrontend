// src/layout/MainLayout.js

import React from 'react';
import {
  Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Dropdown,
  DropdownTrigger, DropdownMenu, DropdownItem, Avatar
} from "@heroui/react";
import { Icon } from '@iconify/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MainLayout = ({ children }) => {
  const { user, userRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar className="border-b" maxWidth="full">
        <NavbarBrand>
          <Link as={RouterLink} to="/" className="font-bold text-inherit flex items-center">
            <Icon icon="lucide:briefcase" className="text-primary mr-2" width={24} />
            <span className="text-purple-800">HR Management System</span>
          </Link>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link as={RouterLink} to="/authLayout" color="foreground">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link as={RouterLink} to="/about" color="foreground">
              About Us
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link as={RouterLink} to="/contact" color="foreground">
              Contact Us
            </Link>
          </NavbarItem>
        </NavbarContent>

        {/* 👇 Show this only if user is logged in and role is manager */}

        {userRole === 'manager' && (
          <Link
            as={RouterLink}
            to="/post-job"
            className="flex items-center p-2 rounded-md hover:underline text-blue-800"
          >
            <Icon icon="lucide:clipboard-plus" className="mr-2" />
            Job Posting
          </Link>
        )}

        <NavbarContent justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                name={user?.name || "User"}
                size="sm"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Sign in as</p>
                <p className="font-semibold">{user?.emailId || "user@example.com"}</p>
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onPress={handleLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r hidden md:block">
          <div className="p-4">
            <div className="mb-8">
              <p className="text-xs text-gray-500 mb-2">ROLE: {userRole?.toUpperCase() || "USER"}</p>
              <p className="text-sm font-medium">{user?.emailId || "User"}</p>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-gray-500 mb-2">{userRole?.toUpperCase()} DASHBOARD</p>
              <Link as={RouterLink} to="/" className="flex items-center p-2 rounded-md hover:bg-gray-100 text-gray-700">
                <Icon icon="lucide:home" className="mr-3" />
                Dashboard
              </Link>

              {(userRole === 'admin' || userRole === 'manager') && (
                <>
                  <p className="text-xs text-gray-500 mt-4 mb-2">EMPLOYEES</p>
                  <Link as={RouterLink} to="/employees" className="flex items-center p-2 rounded-md hover:bg-gray-100 text-gray-700">
                    <Icon icon="lucide:users" className="mr-3" />
                    View Employees
                  </Link>
                  <Link as={RouterLink} to="/register/employee" className="flex items-center p-2 rounded-md hover:bg-gray-100 text-gray-700">
                    <Icon icon="lucide:user-plus" className="mr-3" />
                    Register Employee
                  </Link>
                  <Link as={RouterLink} to="/employee-salary" className="flex items-center p-2 rounded-md hover:bg-gray-100 text-gray-700">
                    <Icon icon="lucide:dollar-sign" className="mr-3" />
                    Employee Salary
                  </Link>
                  <Link as={RouterLink} to="/add-attendance" className="flex items-center p-2 rounded-md hover:bg-gray-100 text-gray-700">
                    <Icon icon="lucide:folder-plus" className="mr-3" />
                    Employee Attendance
                  </Link>
                </>
              )}

              {userRole === 'admin' && (
                <>
                  <p className="text-xs text-gray-500 mt-4 mb-2">MANAGERS</p>
                  <Link as={RouterLink} to="/departments" className="flex items-center p-2 rounded-md hover:bg-gray-100 text-gray-700">
                    <Icon icon="lucide:briefcase" className="mr-3" />
                    View Departments
                  </Link>
                  <Link as={RouterLink} to="/register/manager" className="flex items-center p-2 rounded-md hover:bg-gray-100 text-gray-700">
                    <Icon icon="lucide:user-check" className="mr-3" />
                    Register Manager
                  </Link>
                </>
              )}
              {userRole === 'employee' && (
                <>
                  <Link as={RouterLink} to="/EmpLeave" className="flex items-center p-2 rounded-md hover:bg-gray-100 text-gray-700">
                    <Icon icon="lucide:calendar-plus" className="mr-3" />
                    Leave Requests
                  </Link>
                  <Link as={RouterLink} to="/employee-profile" className="flex items-center p-2 rounded-md hover:bg-gray-100 text-gray-700">
                    <Icon icon="lucide:user-check" className="mr-3" />
                    View Profile
                  </Link>

                </>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
