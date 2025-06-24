import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Image
} from "@heroui/react";
import { Icon } from '@iconify/react';
import { useAuth } from '../context/AuthContext';

const AuthLayout = ({ children }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar className="border-b">
        <NavbarBrand>
          <Link as={RouterLink} to="/" className="font-bold text-inherit flex items-center">
            <Icon icon="lucide:briefcase" className="text-primary mr-2" width={24} />
            <span className="text-purple-800">HR Management System</span>
          </Link>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link as={RouterLink} color="foreground" to="/about">
              About Us
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link as={RouterLink} color="foreground" to="/contact">
              Contact Us
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              as={RouterLink}
              to="/job-postings"
              className="flex items-center p-2 rounded-md hover:underline text-blue-800"
            >
              <Icon icon="lucide:clipboard-plus" className="mr-2" />
              Job Posting Details
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <Button as={RouterLink} to="/login" variant="flat" color="primary">
              Login
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button as={RouterLink} to="/register/admin" color="primary">
              Register Admin
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      {/* Banner with background image and centered content */}
      <div className="relative w-full h-[600px]">
        <img
          src="https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"
          alt="Employee Meeting"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg">
            HR Management System
          </h1>
        </div>

        <div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center">
          {children}
        </div>
      </div>

    </div>
  );
};

export default AuthLayout;
