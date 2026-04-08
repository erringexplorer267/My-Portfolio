import mongoose, { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String },
  category: { type: String },
  tags: [{ type: String }],
  techStack: [{ type: String }],
  githubLink: { type: String },
  liveDemoLink: { type: String },
  image: { type: String },
  order: { type: Number, default: 0 },
}, { timestamps: true });

const Project = models.Project || model("Project", ProjectSchema);

export default Project;
