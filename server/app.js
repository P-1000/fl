import express from "express";
import https from "https";
import fs from "fs";
import axios from "axios";
import { User } from "./userSch.js";
import { Slack } from "./slackSch.js";
import { slackrouter } from "./routes/slack.routes.js";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import qrcode from "qrcode-terminal";
import { processIncomingMessage } from "./wtapp.js";
import { flowrouter } from "./routes/flow.routes.js";
// Import whatsapp-web.js using default import syntax
import whatsappWeb from 'whatsapp-web.js';
const { Client, LocalAuth } = whatsappWeb;

const app = express();

// Load SSL certificate and key
const privateKey = fs.readFileSync("server.key", "utf8");
const certificate = fs.readFileSync("server.cert", "utf8");
const credentials = { key: privateKey, cert: certificate };

const CLIENT_ID = process.env.SLACK_CLIENT_ID;
const CLIENT_SECRET = process.env.SLACK_CLIENT_SECRET;
const REDIRECT_URI = "https://localhost:3000/slack/callback";

const corsOptions = {
  origin: "http://localhost:5173", // Frontend origin
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allows cookies or authentication headers
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); 
app.use(express.json()); 

// WhatsApp Client Setup
const whatsappClient = new Client({
  authStrategy: new LocalAuth(),
});

whatsappClient.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
  console.log("QR code generated. Scan it with WhatsApp.");
});

whatsappClient.on("ready", () => {
  console.log("WhatsApp Web client is ready.");
});

whatsappClient.on("message", processIncomingMessage);


whatsappClient.initialize();

app.get("/groups", async (req, res) => {
  try {
    const chats = await whatsappClient.getChats();
    const groups = chats.filter(chat => chat.isGroup);
    res.status(200).json(groups.map(group => ({
      id: group.id._serialized,
      name: group.name
    })));
  } catch (error) {
    console.error("Error fetching groups:", error);
    res.status(500).json({ error: "Failed to fetch groups." });
  }
});


app.post("/send-group-message", async (req, res) => {
  const { groupId, message } = req.body;

  if (!groupId || !message) {
    return res.status(400).json({ error: "Missing group ID or message" });
  }

  try {
    const chat = await whatsappClient.getChatById(groupId);
    if (!chat || !chat.isGroup) {
      return res.status(404).json({ error: "Group not found" });
    }

    await whatsappClient.sendMessage(groupId, message);
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending message to group:", error);
    res.status(500).json({ error: "Failed to send message." });
  }
});





// Routes
app.use("/slack", slackrouter);
app.use("/flow", flowrouter);

// Start HTTPS server
https.createServer(credentials, app).listen(3000, () => {
  connectDB();
  console.log("Server running on https://localhost:3000");
});
