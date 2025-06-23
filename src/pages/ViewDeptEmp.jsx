import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableHeader, TableColumn, TableBody,
  TableRow, TableCell, Button, Card, CardBody
} from "@heroui/react";
import { Icon } from '@iconify/react';
import { useParams, useNavigate } from 'react-router-dom';

const ViewDeptEmp = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const { managerId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, [managerId]);

  const fetchEmployees = () => {
    if (!managerId) {
      setError("Missing manager ID");
      setLoading(false);
      return;
    }

    setLoading(true);
    axios.get(`http://localhost:8081/employees/manager-department/${managerId}`)
      .then(res => setEmployees(res.data))
      .catch(() => setError("Failed to load employees"))
      .finally(() => setLoading(false));
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this employee?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:8081/deleteemp/${id}`);
      fetchEmployees(); // refresh list after deletion
    } catch (err) {
      alert("Failed to delete employee");
    }
  };

  const handleEdit = (id) => {
    navigate(`/update/employee/${id}`);
  };

  if (loading) return <div className="p-6">Loading employee list...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Employee List</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <Card>
        <CardBody>
          <Table isStriped aria-label="Employees in Department">
            <TableHeader>
              <TableColumn>Name</TableColumn>
              <TableColumn>Email</TableColumn>
              <TableColumn>Department</TableColumn>
              <TableColumn>Role</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
              {employees.map(emp => (
                <TableRow key={emp.id}>
                  <TableCell>{emp.name}</TableCell>
                  <TableCell>{emp.emailId}</TableCell>
                  <TableCell>{emp.department}</TableCell>
                  <TableCell>{emp.specificrole}</TableCell>
                  <TableCell>{emp.status}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="flat" color="primary" onClick={() => handleEdit(emp.id)}>
                        <Icon icon="lucide:edit" className="mr-1" /> Edit
                      </Button>
                      <Button size="sm" variant="flat" color="danger" onClick={() => handleDelete(emp.id)}>
                        <Icon icon="lucide:trash" className="mr-1" /> Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {employees.length === 0 && !error && (
        <div className="text-gray-500 mt-4">No employees found.</div>
      )}
    </div>
  );
};

export default ViewDeptEmp;
