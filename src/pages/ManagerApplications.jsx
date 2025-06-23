import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card, CardBody, Table, TableHeader,
  TableColumn, TableBody, TableRow, TableCell, Select, SelectItem
} from '@heroui/react';
import { useAuth } from '../context/AuthContext';

const ManagerApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    axios.get(`http://localhost:8081/jobs/posted-by/${user.id}`)
      .then(jobRes => {
        const jobIds = jobRes.data.map(job => job.id);
        const promises = jobIds.map(jobId =>
          axios.get(`http://localhost:8081/job-apply/by-job?jobId=${jobId}`)
        );
        return Promise.all(promises);
      })
      .then(appResList => {
        const allApps = appResList.flatMap(res => res.data);
        setApplications(allApps);
      })
      .catch(err => {
        console.error('Failed to fetch applications', err);
      })
      .finally(() => setLoading(false));
  }, [user]);

  const updateStatus = async (appId, newStatus) => {
    try {
      await axios.put(`http://localhost:8081/job-apply/update-status?appId=${appId}&status=${newStatus}`);
      setApplications(prev =>
        prev.map(app => (app.id === appId ? { ...app, status: newStatus } : app))
      );
    } catch (err) {
      alert("Failed to update status: " + err.message);
    }
  };

  if (loading) return <div className="p-6">Loading applications...</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Job Applications</h2>
      <Card>
        <CardBody>
          <Table aria-label="Job Applications Table" isStriped>
            <TableHeader>
              <TableColumn>Name</TableColumn>
              <TableColumn>Email</TableColumn>
              <TableColumn>Mobile</TableColumn>
              <TableColumn>Experience</TableColumn>
              <TableColumn>Resume</TableColumn>
              <TableColumn>Status</TableColumn>
            </TableHeader>
            <TableBody>
              {applications.map(app => (
                <TableRow key={app.id}>
                  <TableCell>{app.fullName}</TableCell>
                  <TableCell>{app.emailId}</TableCell>
                  <TableCell>{app.mobileNo}</TableCell>
                  <TableCell>{app.experience}</TableCell>
                  <TableCell>
                    <a
                      href={`http://localhost:8081/resumes/${app.resumeFileName}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 underline"
                    >
                      View
                    </a>
                  </TableCell>
                  <TableCell>
                    <Select
                      size="sm"
                      selectedKeys={[app.status || 'Pending']}
                      onSelectionChange={(keys) =>
                        updateStatus(app.id, Array.from(keys)[0])
                      }
                    >
                      {["Pending", "Accepted", "Rejected"].map(status => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </Select>
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

export default ManagerApplications;
