import React from 'react';
import { Card, CardBody } from '@heroui/react';
import { Icon } from '@iconify/react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-lg bg-gradient-to-r from-purple-100 to-blue-100">
        <CardBody>
          <div className="text-center mb-4">
            <Icon icon="mdi:information-outline" className="text-purple-600" width={40} />
            <h1 className="text-3xl font-bold text-purple-800 mt-2">About Our System</h1>
          </div>

          <p className="text-lg text-gray-700">
            The <strong>Employee Management System</strong> is a modern HR solution designed to help organizations
            manage employee data, track attendance, assign departments, and manage salaries seamlessly.
            Our system empowers Admins, Managers, and Employees to collaborate efficiently through a secure and intuitive platform.
          </p>

          <ul className="mt-6 space-y-3">
            <li className="flex items-center">
              <Icon icon="mdi:account-tie" className="text-indigo-600 mr-2" width={20} />
              Admins can manage users, departments, and roles.
            </li>
            <li className="flex items-center">
              <Icon icon="mdi:account-group" className="text-indigo-600 mr-2" width={20} />
              Managers can view their department’s employees.
            </li>
            <li className="flex items-center">
              <Icon icon="mdi:clock-check-outline" className="text-indigo-600 mr-2" width={20} />
              Employees can monitor attendance and leaves.
            </li>
          </ul>
        </CardBody>
      </Card>
    </div>
  );
};

export default About;
