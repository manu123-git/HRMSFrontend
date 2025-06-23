import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardBody, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react';
import { useAuth } from '../context/AuthContext';

const MyLeaveRequests = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    if (user?.emailId) {
      axios.get(`http://localhost:8081/leaves/employee/${user.emailId}`)
        .then(res => setLeaves(res.data))
        .catch(err => console.error('Error loading employee leaves:', err));
    }
  }, [user]);

  return (
    <div className="p-6">
      <Card>
        <CardBody>
          <h2 className="text-xl font-bold mb-4">My Leave Requests</h2>
          <Table isStriped>
            <TableHeader>
              <TableColumn>Date</TableColumn>
              <TableColumn>Type</TableColumn>
              <TableColumn>Status</TableColumn>
            </TableHeader>
            <TableBody>
              {leaves.map((leave) => (
                <TableRow key={leave.id}>
                  <TableCell>{leave.date}</TableCell>
                  <TableCell>{leave.leaveType}</TableCell>
                  <TableCell>{leave.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default MyLeaveRequests;
