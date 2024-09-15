import { Slack } from "../slackSch.js";

const sendMessageToSlackChannel = async (channelId, message) => {
  //find the slack token from the database
  const slack = await Slack.findOne({ teamName: "DevAtoms" });
  const token = slack.slackAccessToken
    try {
      const response = await fetch('https://slack.com/api/chat.postMessage', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          channel: channelId,
          text: message,
          username: 'DevAtoms Bot',
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(`Slack API error: ${data.error}`);
      }
  
      console.log(`Message sent to channel ${channelId}: ${message}`);
    } catch (error) {
      console.error('Error sending message to Slack channel:', error);
    }
  };
  
  export { sendMessageToSlackChannel };