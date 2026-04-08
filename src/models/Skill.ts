import mongoose, { Schema, model, models } from "mongoose";

const SkillSchema = new Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ["Frontend", "Backend", "AI/ML", "Languages", "DevOps & Tools", "Database"] 
  },
  icon: { type: String, default: "Globe" }, // Storing icon name for Lucide
});

const Skill = models.Skill || model("Skill", SkillSchema);

export default Skill;
