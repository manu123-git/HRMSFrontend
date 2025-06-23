import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Table, Input, Button, Card, CardBody } from "@heroui/react";
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';
import { blockquote } from 'framer-motion/client';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = () => {
    axios.get("http://localhost:8081/departments")
      .then(res => setDepartments(res.data))
      .catch(err => console.error("Failed to fetch departments:", err));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this manager?")) {
      try {
        await axios.delete(`http://localhost:8081/deletemanager/${id}`);
        fetchDepartments(); // Refresh after delete
      } catch (error) {
        console.error("Failed to delete manager:", error);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/update/manager/${id}`);
  };

  const filteredDepartments = useMemo(() => {
    return departments.filter(dept => {
      const managerName = `${dept.fname || ""} ${dept.lname || ""}`.toLowerCase();
      return (
        dept.department?.toLowerCase().includes(filterValue.toLowerCase()) ||
        managerName.includes(filterValue.toLowerCase())
      );
    });
  }, [departments, filterValue]);

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Department List</h1>
          <Button color="primary" as="a" href="/add-department">
            <Icon icon="lucide:folder-plus" className="mr-1" />
            Add Department
          </Button>
        </div>

        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by department name or manager..."
          startContent={<Icon icon="lucide:search" className="text-default-400" />}
          value={filterValue}
          onValueChange={setFilterValue}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredDepartments.map((dept) => (
          <Card key={dept.id} className="shadow-sm">
            <CardBody>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{dept.department}</h3>
                  {dept ? (
                    <>
                      <p className="text-sm text-gray-500">
                        Manager: {dept.fname} {dept.lname}
                      </p>
                      <p className="text-sm text-gray-400">
                        Experience: {dept.experience}
                      </p>
                    </>
                  ) : (
                    <p className="text-sm text-red-400">No Manager Assigned</p>
                  )}
                </div>
                <div className="bg-purple-100 p-2 rounded-full">
                  <Icon icon="lucide:users" className="text-purple-600" width={20} />
                </div>
              </div>

              <div className="flex items-center mb-4">
                <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {dept.employeeCount || 0} Employees
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="flat" color="primary" onClick={() => navigate(`/view-department-employees/${dept.id}`)}>
                  <Icon icon="lucide:eye" className="mr-1" />
                  View
                </Button>

                <Button size="sm" variant="flat" onClick={() => handleEdit(dept.id)}>
                  <Icon icon="lucide:edit" className="mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="flat" color="danger" onClick={() => handleDelete(dept.id)}>
                  <Icon icon="lucide:trash" className="mr-1" />
                  Delete
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {filteredDepartments.length === 0 && (
        <div className="mt-6 text-center text-gray-500">No departments found.</div>
      )}
    </div>
  );
};

export default DepartmentList;
