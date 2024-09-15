import React, { useState } from 'react';
import axios from 'axios';

const SendMessage = ({ selectedGroup }) => {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const handleSendMessage = async () => {
    if (!message) {
      setError('Message cannot be empty');
      return;
    }

    setSending(true);
    setError(null);

    try {
      await axios.post('https://localhost:3000/send-group-message', {
        groupId: selectedGroup.id,
        message,
      });
      setMessage('');
      alert('Message sent successfully!');
    } catch (err) {
      setError('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <h2>Send Message to {selectedGroup.name}</h2>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message here"
      />
      <button onClick={handleSendMessage} disabled={sending}>
        {sending ? 'Sending...' : 'Send Message'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default SendMessage;
