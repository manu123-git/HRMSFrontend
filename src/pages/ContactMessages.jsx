import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardBody } from '@heroui/react';

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/api/contact')
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => {
        console.error('Error fetching contact messages:', err);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-800">All Contact Messages</h1>
      {messages.length === 0 ? (
        <p className="text-center text-gray-600">No messages found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {messages.map((msg) => (
            <Card key={msg.id} className="shadow-md">
              <CardBody>
                <p><strong>Name:</strong> {msg.name}</p>
                <p><strong>Email:</strong> {msg.email}</p>
                <p><strong>Message:</strong> {msg.message}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactMessages;
