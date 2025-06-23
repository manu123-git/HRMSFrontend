import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Select, SelectItem, Button, Card, CardBody } from '@heroui/react';
import { useAuth } from '../context/AuthContext';

const EmpLeaves = () => {
  const { user } = useAuth();

  const [form, setForm] = useState({
    employeeName: '',
    emailId: '',
    date: '',
    leaveType: 'Sick',
    reason: '',
    status: 'Pending'
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const leaveTypes = ['Sick',  'Vacation', 'Personal', 'Other'];

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        employeeName: user.name || '',
        emailId: user.emailId || ''
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.date || !form.leaveType || !form.reason) {
      setMessage("Please fill all required fields.");
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:8081/addleave', form);
      setMessage('✅ Leave request submitted successfully!');
      setForm((prev) => ({ ...prev, date: '', leaveType: 'Sick', reason: '' }));
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to submit leave request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <Card>
        <CardBody>
          <h2 className="text-xl font-semibold mb-4">Leave Request Form</h2>

          <Input name="employeeName" label="Employee Name" value={form.employeeName} readOnly className="mb-4" />
          <Input name="emailId" label="Email" value={form.emailId} readOnly className="mb-4" />
          <Input
            name="date"
            type="date"
            label="Leave Date"
            value={form.date}
            onChange={handleChange}
            className="mb-4"
          />

          <Select
            label="Leave Type"
            name="leaveType"
            selectedKeys={[form.leaveType]}
            onSelectionChange={(key) =>
              setForm((prev) => ({ ...prev, leaveType: Array.from(key)[0] }))
            }
            className="mb-4"
          >
            {leaveTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </Select>

          <Input
            name="reason"
            label="Reason"
            placeholder="Brief reason for leave"
            value={form.reason}
            onChange={handleChange}
            className="mb-4"
          />

          <Button color="primary" isLoading={loading} onClick={handleSubmit}>
            Submit Request
          </Button>

          {message && <p className="mt-4 text-sm text-center">{message}</p>}
        </CardBody>
      </Card>
    </div>
  );
};

export default EmpLeaves;
