import React, { useEffect, useState } from "react";
import axios from "axios";

const SendMessageToSlack = () => {
  const [channels, setChannels] = useState([]); // Initialize as an array
  const [selectedChannel, setSelectedChannel] = useState("");
  const [message, setMessage] = useState("");
  const [isLoadingChannels, setIsLoadingChannels] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChannels = async () => {
      setIsLoadingChannels(true);
      setError(null);
      try {
        const response = await axios.get("https://localhost:3000/slack/channels");

        if (Array.isArray(response.data)) {
          setChannels(response.data);
        } else {
          setError("Unexpected response format. Please try again later.");
        }
      } catch (error) {
        console.error("Error fetching channels:", error);
        setError("Failed to load channels. Please try again later.");
      } finally {
        setIsLoadingChannels(false);
      }
    };

    fetchChannels();
  }, []);

  const handleSendMessage = async () => {
    setStatus(null);
    setError(null);

    if (!selectedChannel || !message.trim()) {
      setError("Please select a channel and enter a message.");
      return;
    }

    setIsSendingMessage(true);
    try {
      const response = await axios.get("https://localhost:3000/slack/send-message", {
        params: { channelName: selectedChannel, message },
      });

      if (response.data.message) {
        setStatus("Message sent successfully!");
      } else {
        setError("Failed to send message.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message. Please try again.");
    } finally {
      setIsSendingMessage(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-lg font-semibold mb-4">Send Message to Slack Channel</h1>

      {isLoadingChannels ? (
        <p>Loading channels...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div>
          {/* Channel Selection */}
          <div className="mb-4">
            <label htmlFor="channel-select" className="block text-sm font-medium text-gray-700">
              Select Channel
            </label>
            <select
              id="channel-select"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
              disabled={channels.length === 0}
            >
              <option value="" disabled>
                {channels.length === 0 ? "No channels available" : "Select a channel"}
              </option>
              {Array.isArray(channels) &&
                channels.map((channel) => (
                  <option key={channel.id} value={channel.name}>
                    {channel.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Message Input */}
          <div className="mb-4">
            <label htmlFor="message-input" className="block text-sm font-medium text-gray-700">
              Enter Message
            </label>
            <textarea
              id="message-input"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
              disabled={channels.length === 0}
            />
          </div>

          {/* Send Button */}
          <div className="mb-4">
            <button
              className={`bg-blue-500 text-white py-2 px-4 rounded-md ${isSendingMessage ? "opacity-50" : ""}`}
              onClick={handleSendMessage}
              disabled={isSendingMessage || channels.length === 0}
            >
              {isSendingMessage ? "Sending..." : "Send Message"}
            </button>
          </div>
        </div>
      )}

      {/* Status Message */}
      {status && <p className="text-green-500">{status}</p>}
      {error && !isLoadingChannels && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default SendMessageToSlack;
