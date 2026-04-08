import mongoose, { Schema, model, models } from "mongoose";

const JourneySchema = new Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

const Journey = models.Journey || model("Journey", JourneySchema);

export default Journey;
