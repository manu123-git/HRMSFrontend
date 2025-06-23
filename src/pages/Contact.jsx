import React, { useState } from 'react';
import { Card, CardBody, Input, Textarea, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import axios from 'axios';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/api/contact', form);
      alert('Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      alert('Failed to send message');
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <Card className="shadow-lg bg-gradient-to-r from-green-100 to-blue-100">
        <CardBody>
          <div className="text-center mb-4">
            <Icon icon="mdi:email-outline" className="text-green-600" width={40} />
            <h1 className="text-3xl font-bold text-green-800 mt-2">Contact Us</h1>
            <p className="text-gray-700 mt-2">
              Have questions or feedback? We'd love to hear from you.
            </p>
          </div>

          <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
            <Input
              type="text"
              label="Name"
              placeholder="Your full name"
              name="name"
              value={form.name}
              onChange={handleChange}
              isRequired
            />
            <Input
              type="email"
              label="Email"
              placeholder="you@example.com"
              name="email"
              value={form.email}
              onChange={handleChange}
              isRequired
            />
            <Textarea
              label="Message"
              placeholder="Write your message here..."
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              isRequired
            />

            <div className="text-center">
              <Button type="submit" color="success">Send Message</Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Contact;
