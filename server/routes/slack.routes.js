import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import { Slack } from "../slackSch.js";
const slackrouter = express.Router();
dotenv.config();

const CLIENT_ID = process.env.SLACK_CLIENT_ID;
const CLIENT_SECRET = process.env.SLACK_CLIENT_SECRET;
const REDIRECT_URI = "https://localhost:3000/slack/callback";


slackrouter.get("/auth", (req, res) => {
  const slackOAuthUrl = `https://slack.com/oauth/v2/authorize?client_id=${CLIENT_ID}&scope=chat:write,channels:read,groups:read,mpim:read,im:read&user_scope=chat:write,channels:read,groups:read,mpim:read,im:read,channels:write.invites,groups:write.invites&redirect_uri=${REDIRECT_URI}`;
  res.redirect(slackOAuthUrl);
});

slackrouter.get("/callback", async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send("Code not provided");
  }

  try {
    const response = await fetch("https://slack.com/api/oauth.v2.access", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
      }),
    });

    const data = await response.json();

    if (!data.ok) {
      return res.status(400).send(`Slack OAuth failed: ${data.error}`);
    }

    const {
      app_id: appId,
      authed_user: { id: userId, access_token: userToken },
      access_token: accessToken,
      bot_user_id: botUserId,
      team: { id: teamId, name: teamName },
    } = data;

    // Create and save the Slack model instance
    const slackInstance = new Slack({
      appId,
      authedUserId: userId,
      authedUserToken: userToken,
      slackAccessToken: accessToken,
      botUserId,
      teamId,
      teamName,
    }); 
    console.log(data)
    await slackInstance.save(); 
    res.redirect("http://localhost:5173/apps");
  } catch (error) {
    console.error("OAuth Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

const getChannelList = async (token) => {
  const url = "https://slack.com/api/conversations.list";
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.data.ok) {
    throw new Error(response.data.error || "Failed to fetch channels");
  }

  return response.data.channels.map((channel) => ({
    id: channel.id,
    name: channel.name,
  }));
};

slackrouter.get("/channels", async (req, res) => {
  const slack = await Slack.findOne({ teamName: "DevAtoms" });
  const token = slack.slackAccessToken
  try {
    const channels = await getChannelList(token);
    if (channels.length === 0) {
      return res.status(404).json({ error: "No channels found" });
    }
    return res.json(channels);
  } catch (error) {
    console.error("Error fetching channels:", error.message);
    return res.status(500).json({ error: "Failed to fetch channels" });
  }
});


// Route to send a message to a Slack channel
slackrouter.get("/send-message", async (req, res) => {
  const { channelName, message } = req.query;
  console.log(channelName, message)
  if (!channelName || !message) {
    return res.status(400).json({ error: "Channel and message are required" });
  }

  const url = "https://slack.com/api/chat.postMessage";
  try {
    const slack = await Slack.findOne({ teamName: "DevAtoms" });
    const token = slack.slackAccessToken
    const response = await axios.post(
      url,
      { channel: channelName, text: message },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!response.data.ok) {
      return res.status(500).json({ error: response.data.error || "Failed to send message" });
    }

    return res.json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending message:", error.message);
    return res.status(500).json({ error: "Failed to send message" });
  }
});






export { slackrouter };
