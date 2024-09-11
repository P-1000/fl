import express from "express";
import https from "https";
import fs from "fs";
import axios from "axios";

dotenv.config();
const app = express();

// Load SSL certificate and key
const privateKey = fs.readFileSync("server.key", "utf8");
const certificate = fs.readFileSync("server.cert", "utf8");
const credentials = { key: privateKey, cert: certificate };
import dotenv from "dotenv";

const CLIENT_ID = process.env.SLACK_CLIENT_ID;
const CLIENT_SECRET = process.env.SLACK_CLIENT_SECRET;
const REDIRECT_URI = "https://localhost:3000/slack/callback";

const sendSlackMessage = async (accessToken, channelId, message, userId) => {
  //if bot is not in the channel add it
  const response = await axios.post(
    "https://slack.com/api/conversations.invite",
    {
      channel: channelId,
      users: userId,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response.data);

  try {
    const response = await axios.post(
      "https://slack.com/api/chat.postMessage",
      {
        channel: channelId, // The dev channel ID
        text: message, // The message content
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Set the token in Authorization header
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.ok) {
      console.log("Message sent successfully to dev channel");
    } else {
      console.error("Error sending message:", response.data.error);
    }
  } catch (error) {
    console.error("Error in sending message:", error);
  }
};

const getChannelId = async (accessToken, channelName) => {
  return "C0718R6DYHY";
  try {
    const response = await axios.get(
      "https://slack.com/api/conversations.list",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.data.ok) {
      console.log(response.data.channels);
      const channel = response.data.channels.find(
        (c) => c.name === channelName
      );
      return channel ? channel.id : null;
    }
  } catch (error) {
    console.error("Error fetching channel list:", error);
  }
  return null;
};

// Step 1: Redirect the user to Slack's OAuth page
app.get("/auth/slack", (req, res) => {
  const slackOAuthUrl = `https://slack.com/oauth/v2/authorize?client_id=${CLIENT_ID}&scope=channels:read,users:read&redirect_uri=${REDIRECT_URI}`;
  res.redirect(slackOAuthUrl);
});

// Step 2: Handle the OAuth callback and exchange code for token
app.get("/slack/callback", async (req, res) => {
  const code = req.query.code;

  try {
    const response = await axios.post(
      "https://slack.com/api/oauth.v2.access",
      null,
      {
        params: {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code,
          redirect_uri: REDIRECT_URI,
        },
      }
    );

    console.log(response.data);

    const { access_token, team, authed_user } = response.data;

    if (response.data.ok) {
      const channelId = await getChannelId(access_token, "#dev");
      if (channelId) {
        await sendSlackMessage(
          access_token,
          channelId,
          "Slack successfully connected!",
          authed_user.id
        );
      } else {
        console.error("Channel not found");
        console.log(response.data);
      }
      res.send("Slack successfully connected!");
    } else {
      res.status(400).send("Error during Slack OAuth process");
    }
  } catch (error) {
    res.status(500).send("OAuth Error");
  }
});

// Create HTTPS server
https.createServer(credentials, app).listen(3000, () => {
  console.log("Server running on https://localhost:3000");
});
