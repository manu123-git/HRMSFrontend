import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardBody, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from '@heroui/react';

const ManageLeaveRequests = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/leaves')
      .then(res => setLeaves(res.data))
      .catch(err => console.error('Error fetching leaves:', err));
  }, []);

  const updateStatus = (id, newStatus) => {
    axios.put(`http://localhost:8081/leaves/${id}`, { status: newStatus })
      .then(() => {
        setLeaves(prev => prev.map(leave => leave.id === id ? { ...leave, status: newStatus } : leave));
      })
      .catch(err => alert('Error updating status', err));
  };

  return (
    <div className="p-6">
      <Card>
        <CardBody>
          <h2 className="text-xl font-bold mb-4">Leave Requests</h2>
          <Table isStriped>
            <TableHeader>
              <TableColumn>Name</TableColumn>
              <TableColumn>Email</TableColumn>
              <TableColumn>Date</TableColumn>
              <TableColumn>Type</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
              {leaves.map(leave => (
                <TableRow key={leave.id}>
                  <TableCell>{leave.employeeName}</TableCell>
                  <TableCell>{leave.emailId}</TableCell>
                  <TableCell>{leave.date}</TableCell>
                  <TableCell>{leave.leaveType}</TableCell>
                  <TableCell>{leave.status}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button size="sm" color="success" onClick={() => updateStatus(leave.id, 'Approved')}>Approve</Button>
                    <Button size="sm" color="danger" onClick={() => updateStatus(leave.id, 'Rejected')}>Reject</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default ManageLeaveRequests;
