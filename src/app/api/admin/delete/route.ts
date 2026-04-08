import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Skill from "@/models/Skill";
import Project from "@/models/Project";
import Journey from "@/models/Journey";

export async function POST(req: Request) {
  // Using POST for delete if IDs are sent in body, or keeping it as DELETE
  // The user asked for "DELETE /api/admin/delete", so let's use DELETE.
  return NextResponse.json({ error: "Method not allowed. Use DELETE." }, { status: 405 });
}

export async function DELETE(req: Request) {
  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (token !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized access. Invalid Bearer Token." }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const { type, id } = await req.json();

    let result;
    if (type === "skill") {
      result = await Skill.findByIdAndDelete(id);
    } else if (type === "project") {
      result = await Project.findByIdAndDelete(id);
    } else if (type === "journey") {
      result = await Journey.findByIdAndDelete(id);
    } else {
      return NextResponse.json({ error: "Invalid type specified" }, { status: 400 });
    }

    if (!result) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Record pruned successfully" });
  } catch (error) {
    console.error("Admin delete error:", error);
    return NextResponse.json({ error: "Failed to prune record" }, { status: 500 });
  }
}
