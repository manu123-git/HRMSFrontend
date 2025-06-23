import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, CardBody, CardHeader, Divider } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const JobPostingsList = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8081/jobs/all')
      .then(res => setJobs(res.data))
      .catch(() => setError('Failed to load job postings'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 text-gray-600">Loading job postings...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-green-800">Job Postings</h1>

      {jobs.length === 0 ? (
        <p className="text-gray-500">No job postings available.</p>
      ) : (
        jobs.map(job => (
          <Card key={job.id} className="shadow-md">
            <CardHeader className="flex justify-between items-start">
              <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
              <span className="text-sm text-blue-600 flex items-center">
                <Icon icon="lucide:calendar" className="mr-1" />
                {job.postedDate}
              </span>
            </CardHeader>
            <Divider />
            <CardBody className="space-y-2 text-sm text-gray-700">
              <p><span className="font-semibold">Skills:</span> {job.skills}</p>
              <p><span className="font-semibold">Department:</span> {job.department}</p>
              <p><span className="font-semibold">Location:</span> {job.location}</p>
              <p><span className="font-semibold">Job Type:</span> {job.jobType}</p>
              <div className="pt-2">
                <Button
                  color="primary"
                  onClick={() => navigate(`/apply-job/${job.id}`)}
                >
                  <Icon icon="lucide:send" className="mr-2" />
                  Apply Now
                </Button>
              </div>
            </CardBody>
          </Card>
        ))
      )}

      {/* ✅ Back Button */}
      <div className="pt-6">
        <Button
          variant="ghost"
          color="secondary"
          onClick={() => navigate(-1)}
        >
          <Icon icon="lucide:arrow-left" className="mr-2" />
          Back
        </Button>
      </div>
    </div>
  );
};

export default JobPostingsList;
