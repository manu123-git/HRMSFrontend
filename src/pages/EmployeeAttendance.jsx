import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Input, Button, Card, CardBody, CardHeader,
  Select, SelectItem,
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell
} from "@heroui/react";
import { Icon } from "@iconify/react";

const EmployeeAttendance = () => {
  const [employeeName, setEmployeeName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('present');
  const [leaveType, setLeaveType] = useState('');
  const [records, setRecords] = useState([]);



  // Fetch all records from backend on load
  useEffect(() => {
    axios.get('http://localhost:8081/api/attendance')
      .then(res => setRecords(res.data))
      .catch(err => console.error("Failed to load records:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRecord = {
      employeeName,
      emailId,
      date,
      status,
      leaveType: status === 'leave' ? leaveType : '-'
    };

    try {
      await axios.post('http://localhost:8081/api/attendance', newRecord);
      setRecords(prev => [...prev, newRecord]); // Add to local view
      setEmployeeName('');
      setEmailId('');
      setDate('');
      setStatus('present');
      setLeaveType('');
    } catch (error) {
      alert("Failed to add record: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-6">
        <CardHeader className="flex gap-3">
          <Icon icon="lucide:calendar-check" width={24} />
          <div className="flex flex-col">
            <p className="text-md">Attendance & Leave Records</p>
            <p className="text-small text-default-500">Add employee attendance or leave records</p>
          </div>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Employee Name"
              placeholder="Enter employee name"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              required
            />
            <Input
              label="Email ID"
              type="email"
              placeholder="Enter email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              required
            />
            <Input
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <Select
              label="Status"
              placeholder="Select status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <SelectItem key="present" value="present">Present</SelectItem>
              <SelectItem key="absent" value="absent">Absent</SelectItem>
              <SelectItem key="leave" value="leave">Leave</SelectItem>
            </Select>
            {status === 'leave' && (
              <Select
                label="Leave Type"
                placeholder="Select leave type"
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
              >
                <SelectItem key="sick" value="sick">Sick Leave</SelectItem>
                <SelectItem key="vacation" value="vacation">Vacation</SelectItem>
                <SelectItem key="personal" value="personal">Personal Leave</SelectItem>
              </Select>
            )}
            <Button type="submit" color="primary">Add Record</Button>
          </form>
        </CardBody>
      </Card>

      <Card>
        <CardHeader className="flex gap-3">
          <Icon icon="lucide:list" width={24} />
          <div className="flex flex-col">
            <p className="text-md">Attendance & Leave Tracking</p>
            <p className="text-small text-default-500">View all employee records</p>
          </div>
        </CardHeader>
        <CardBody>
          <Table aria-label="Attendance and Leave Records" removeWrapper>
            <TableHeader>
              <TableColumn>EMPLOYEE NAME</TableColumn>
              <TableColumn>EMAIL</TableColumn>
              <TableColumn>DATE</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>LEAVE TYPE</TableColumn>
            </TableHeader>
            <TableBody>
              {records.map((record, index) => (
                <TableRow key={index}>
                  <TableCell>{record.employeeName}</TableCell>
                  <TableCell>{record.emailId}</TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.status}</TableCell>
                  <TableCell>{record.leaveType}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default EmployeeAttendance;
