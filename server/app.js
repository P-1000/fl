import express from "express";
import https from "https";
import fs from "fs";
import axios from "axios";
import { User } from "./userSch.js";

dotenv.config();
const app = express();

// Load SSL certificate and key
const privateKey = fs.readFileSync("server.key", "utf8");
const certificate = fs.readFileSync("server.cert", "utf8");
const credentials = { key: privateKey, cert: certificate };
import dotenv from "dotenv";
import { connectDB } from "./db.js";

const CLIENT_ID = process.env.SLACK_CLIENT_ID;
const CLIENT_SECRET = process.env.SLACK_CLIENT_SECRET;
const REDIRECT_URI = "https://localhost:3000/slack/callback";



const joinChannel = async (channelId , BOT_TOKEN) => {
  try {
    const response = await axios.post(
      'https://slack.com/api/conversations.join',
      {
        channel: channelId, // Channel ID to join
      },
      {
        headers: {
          Authorization: `Bearer ${BOT_TOKEN}`, // Set the bot token in the Authorization header
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.ok) {
      console.log('Bot successfully joined the channel');
      return true; // Success
    } else {
      console.error('Failed to join channel:', response.data.error);
      return false; // Failed to join
    }
  } catch (error) {
    console.error('Error joining channel:', error.message);
    return false;
  }
};



const sendSlackMessage = async (accessToken, channelId, message, userId , utok) => {
  await joinChannel(channelId, utok);
  try {
    const response = await axios.post(
      "https://slack.com/api/chat.postMessage",
      {
        channel: channelId, // The dev channel ID
        text: message, // The message content
      },
      {
        headers: {
          Authorization: `Bearer ${utok}`, // Set the token in Authorization header
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
  const slackOAuthUrl = `https://slack.com/oauth/v2/authorize?client_id=${CLIENT_ID}&scope=chat:write,channels:read,groups:read,mpim:read,im:read&user_scope=chat:write,channels:read,groups:read,mpim:read,im:read,channels:write.invites,groups:write.invites&redirect_uri=${REDIRECT_URI}`;
  res.redirect(slackOAuthUrl);
});

// Step 2: Handle the OAuth callback and exchange code for token
app.get("/slack/callback", async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send('Code not provided');
  }

  try {
    // Make a POST request to Slack's OAuth endpoint to exchange the code for an access token
    const response = await fetch('https://slack.com/api/oauth.v2.access', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
      }),
    });

    const data = await response.json();

    // Check if the response indicates a failure
    if (!data.ok) {
      throw new Error(data.error || 'Slack OAuth failed');
    }

    if (data.ok) {
      const appId = data.app_id;
      const userId = data.authed_user.id;
      const userToken = data.authed_user.access_token;
      const accessToken = data.access_token;
      const botUserId = data.bot_user_id;
      const teamId = data.team.id;
      const teamName = data.team.name;
      console.log(data)
      //send message to slack
      const channelId = await getChannelId(accessToken, 'dev');
      if (channelId) {
        await sendSlackMessage(accessToken, channelId, 'Hello from your app!', botUserId , userToken);
      }

      // Handle the successful OAuth flow and redirect the user
      res.redirect(
        `/?app_id=${appId}&authed_user_id=${userId}&authed_user_token=${userToken}&slack_access_token=${accessToken}&bot_user_id=${botUserId}&team_id=${teamId}&team_name=${teamName}`
      );
    }
  } catch (error) {
    console.error('OAuth Error:', error);
    res.status(500).send('Internal Server Error');
  }
});


//sign up route 
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && user.password === password) {
      res.json(user);
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
);



// Create HTTPS server
https.createServer(credentials, app).listen(3000, () => {
  connectDB();
  console.log("Server running on https://localhost:3000");
});
