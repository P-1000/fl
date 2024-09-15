import mongoose from "mongoose";

const { Schema } = mongoose;

const flowSchema = new Schema({
  triggerId: {
    type: Number,
    required: true,
  },
  triggerData: {
    type: Object,
    required: true,
  },
  actions: [
    {
      actionId: {
        type: Number,
        required: true,
      },
      actionData: {
        type: Schema.Types.Mixed,
        default: {},
      },
    },
  ],
  status: {
    type: String,
    default: "inactive",
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  connectedApps: [
    {
      type: String,
    },
  ],
});

const Flow = mongoose.model("Flow", flowSchema);

export { Flow };
