import mongoose from "mongoose";

const slackSchema = new mongoose.Schema({
  appId: {
    type: String,
    required: true,
  },
  authedUserId: {
    type: String,
    required: true,
  },
  authedUserToken: {
    type: String,
    required: true,
    unique: true,
  },
  slackAccessToken: {
    type: String,
    required: true,
    unique: true,
  },
  botUserId: {
    type: String,
    required: true,
  },
  teamId: {
    type: String,
    required: true,
  },
  teamName: {
    type: String,
    required: true,
  },
});

const Slack = mongoose.model("Slack", slackSchema);
export { Slack };
