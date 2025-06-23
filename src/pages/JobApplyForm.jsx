import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Input, Textarea, Button, Card, CardBody } from '@heroui/react';

const JobApplyForm = () => {
  const { jobId } = useParams();
  const [formData, setFormData] = useState({
    fullName: '',
    emailId: '',
    mobileNo: '',
    experience: '',
    resume: null,
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      setFormData({ ...formData, resume: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('fullName', formData.fullName);
    data.append('emailId', formData.emailId);
    data.append('mobileNo', formData.mobileNo);
    data.append('experience', formData.experience);
    data.append('resume', formData.resume);
    data.append('jobId', jobId);

    try {
      await axios.post('http://localhost:8081/job-apply', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('Application submitted successfully!');
      setFormData({
        fullName: '',
        emailId: '',
        mobileNo: '',
        experience: '',
        resume: null,
      });
    } catch {
      setMessage('Failed to submit application.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <Card>
        <CardBody>
          <h2 className="text-xl font-bold mb-4">Apply for Job</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="fullName" label="Full Name" value={formData.fullName} onChange={handleChange} required />
            <Input name="emailId" label="Email ID" type="email" value={formData.emailId} onChange={handleChange} required />
            <Input name="mobileNo" label="Mobile Number" type="tel" value={formData.mobileNo} onChange={handleChange} required />
            <Input name="experience" label="Experience" value={formData.experience} onChange={handleChange} />
            <Input name="resume" type="file" label="Upload Resume" accept=".pdf,.doc,.docx" onChange={handleChange} required />
            <Button type="submit" color="primary">Submit Application</Button>
          </form>
          {message && <p className="mt-4 text-center text-sm text-green-600">{message}</p>}
        </CardBody>
      </Card>
    </div>
  );
};

export default JobApplyForm;
