import React, { useState } from 'react';
import axios from 'axios';
import { Input, Textarea, Select, SelectItem, Button, Card, CardBody } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const JobPostForm = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: '',
        skills: '',
        department: '',
        location: '',
        jobType: 'Full-Time',
        postedDate: ''
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const jobTypes = ['Full-Time', 'Part-Time', 'Internship', 'Contract'];

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        const { title, skills, department, location, jobType, postedDate } = form;

        if (!title || !skills || !department || !location || !jobType || !postedDate) {
            setError('All fields are required.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8081/jobs/create', {
                ...form,
                postedBy: user?.id,
            });

            if (response.status === 201) {
                setMessage('Job posted successfully!');
                setForm({
                    title: '',
                    skills: '',
                    department: '',
                    location: '',
                    jobType: 'Full-Time',
                    postedDate: ''
                });
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to post job.');
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <Card>
                <CardBody>
                    <h1 className="text-xl font-bold mb-4">Post a New Job</h1>

                    {message && <div className="text-green-600 mb-4">{message}</div>}
                    {error && <div className="text-red-500 mb-4">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Job Title"
                            placeholder="e.g., Software Engineer"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            isRequired
                            startContent={<Icon icon="lucide:briefcase" />}
                        />

                        <Textarea
                            label="Skills"
                            placeholder="e.g., Java, React, SQL"
                            name="skills"
                            value={form.skills}
                            onChange={handleChange}
                            isRequired
                        />

                        <Input
                            label="Department"
                            placeholder="e.g., IT, HR, Marketing"
                            name="department"
                            value={form.department}
                            onChange={handleChange}
                            isRequired
                            startContent={<Icon icon="lucide:building" />}
                        />

                        <Input
                            label="Location"
                            placeholder="e.g., Bangalore, Remote"
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            isRequired
                            startContent={<Icon icon="lucide:map-pin" />}
                        />

                        <Select
                            label="Job Type"
                            selectedKeys={[form.jobType]}
                            onSelectionChange={(keys) => setForm({ ...form, jobType: [...keys][0] })}
                        >
                            {jobTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                    {type}
                                </SelectItem>
                            ))}
                        </Select>

                        <Input
                            type="date"
                            label="Posted Date"
                            name="postedDate"
                            value={form.postedDate}
                            onChange={handleChange}
                            isRequired
                            startContent={<Icon icon="lucide:calendar" />}
                        />
                        <div className="flex justify-start gap-4 pt-4">
                            <Button type="button" className="bg-blue-600 text-white hover:bg-blue-700" onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button type="submit" color="primary" className="bg-purple-600 hover:bg-purple-700">
                                Post Job
                            </Button>
                        </div>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
};

export default JobPostForm;
