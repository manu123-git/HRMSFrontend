import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Button, Input, Pagination, Dropdown, DropdownTrigger, DropdownMenu,
  DropdownItem, Chip
} from "@heroui/react";
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchEmployees = () => {
    setLoading(true);
    axios.get("http://localhost:8081/getemployees")
      .then(response => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load employee data.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await axios.delete(`http://localhost:8081/deleteemp/${id}`);
      fetchEmployees();
    } catch (err) {
      alert("Delete failed: " + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = (id) => {
    navigate(`/update/employee/${id}`);
  };

  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      const matchesSearch = filterValue === "" ||
        employee.name?.toLowerCase().includes(filterValue.toLowerCase()) ||
        employee.emailId?.toLowerCase().includes(filterValue.toLowerCase()) ||
        employee.department?.toLowerCase().includes(filterValue.toLowerCase()) ||
        employee.specificrole?.toLowerCase().includes(filterValue.toLowerCase());

      const matchesDepartment = selectedDepartment === "all" ||
        employee.department?.toLowerCase() === selectedDepartment.toLowerCase();

      const matchesStatus = selectedStatus === "all" ||
        employee.status?.toLowerCase() === selectedStatus.toLowerCase();

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [employees, filterValue, selectedDepartment, selectedStatus]);

  const pages = Math.ceil(filteredEmployees.length / rowsPerPage);
  const paginatedEmployees = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredEmployees.slice(start, start + rowsPerPage);
  }, [filteredEmployees, currentPage]);

  const statusColorMap = {
    active: "success",
    inactive: "danger",
    pending: "warning"
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Employee List</h1>
          <Button color="primary" as="a" href="/register/employee">
            <Icon icon="lucide:user-plus" className="mr-1" />
            Add Employee
          </Button>
        </div>

        <div className="flex justify-between items-center">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name, email, department..."
            startContent={<Icon icon="lucide:search" className="text-default-400" />}
            value={filterValue}
            onValueChange={setFilterValue}
          />

          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger>
                <Button variant="flat" endContent={<Icon icon="lucide:chevron-down" />}>
                  Department
                </Button>
              </DropdownTrigger>
              <DropdownMenu onAction={(key) => setSelectedDepartment(key)}>
                <DropdownItem key="all">All Departments</DropdownItem>
                <DropdownItem key="Software">Software</DropdownItem>
                <DropdownItem key="Marketing">Marketing</DropdownItem>
                <DropdownItem key="HR">HR</DropdownItem>
                <DropdownItem key="Finance">Finance</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Dropdown>
              <DropdownTrigger>
                <Button variant="flat" endContent={<Icon icon="lucide:chevron-down" />}>
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu onAction={(key) => setSelectedStatus(key)}>
                <DropdownItem key="all">All Status</DropdownItem>
                <DropdownItem key="Active">Active</DropdownItem>
                <DropdownItem key="Inactive">Inactive</DropdownItem>
                <DropdownItem key="Pending">Pending</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>

      {loading ? (
        <p className="mt-4 text-center">Loading...</p>
      ) : error ? (
        <p className="mt-4 text-center text-red-500">{error}</p>
      ) : (
        <div className="mt-6">
          <Table
            aria-label="Employee table"
            bottomContent={
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="primary"
                  page={currentPage}
                  total={pages}
                  onChange={setCurrentPage}
                />
              </div>
            }
            classNames={{ wrapper: "min-h-[222px]" }}
          >
            <TableHeader>
              <TableColumn>NAME</TableColumn>
              <TableColumn>EMAIL</TableColumn>
              <TableColumn>DEPARTMENT</TableColumn>
              <TableColumn>ROLE</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody items={paginatedEmployees}>
              {(item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.emailId}</TableCell>
                  <TableCell>{item.department}</TableCell>
                  <TableCell>{item.specificrole}</TableCell>
                  <TableCell>
                    <Chip
                      color={statusColorMap[item.status?.toLowerCase()] || "default"}
                      size="sm"
                      variant="flat"
                    >
                      {item.status}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button isIconOnly size="sm" variant="light" onClick={() => handleEdit(item.id)}>
                        <Icon icon="lucide:edit" />
                      </Button>
                      <Button isIconOnly size="sm" variant="light" onClick={() => handleDelete(item.id)}>
                        <Icon icon="lucide:trash" className="text-danger" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
