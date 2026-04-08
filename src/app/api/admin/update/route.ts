import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Skill from "@/models/Skill";
import Project from "@/models/Project";
import Journey from "@/models/Journey";

export async function POST(req: Request) {
  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (token !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized access. Invalid Bearer Token." }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const { type, data } = await req.json();

    let result;
    if (type === "skill") {
      result = await Skill.create(data);
    } else if (type === "project") {
      result = await Project.create(data);
    } else if (type === "journey") {
      result = await Journey.create(data);
    } else {
      return NextResponse.json({ error: "Invalid type specified" }, { status: 400 });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Admin update error:", error);
    return NextResponse.json({ error: "Failed to update record" }, { status: 500 });
  }
}
