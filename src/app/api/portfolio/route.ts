import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Skill from "@/models/Skill";
import Project from "@/models/Project";
import Journey from "@/models/Journey";

export async function GET() {
  try {
    await connectToDatabase();
    const [skills, fetchedProjects, journeys] = await Promise.all([
      Skill.find({}),
      Project.find({}).sort({ order: 1, createdAt: -1 }),
      Journey.find({}).sort({ order: 1, createdAt: 1 })
    ]);

    const mappedProjects = fetchedProjects.map((p: any) => {
      const project = p.toObject ? p.toObject() : p;
      return {
        ...project,
        description: project.description || project.desc || "",
        githubLink: project.githubLink || project.github || "#",
        liveDemoLink: project.liveDemoLink || project.demo || "#",
      };
    });
    
    return NextResponse.json({ skills, projects: mappedProjects, journeys });
  } catch (error) {
    console.error("Database fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch portfolio data" }, { status: 500 });
  }
}
