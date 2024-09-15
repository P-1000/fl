import express from "express";
import { Flow } from "../flowSch.js";

const flowrouter = express.Router();

flowrouter.post("/new", async (req, res) => {
  const { triggerId, triggerData, actions } = req.body;

  if (!triggerId || !triggerData || !Array.isArray(actions)) {
    return res.status(400).json({ error: "Invalid data" });
  }

  try {
    const newFlow = new Flow({ triggerId, triggerData, actions });
    await newFlow.save();
    res.status(201).json({ message: "Flow saved successfully", flow: newFlow });
  } catch (error) {
    console.error("Error saving flow: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { flowrouter };