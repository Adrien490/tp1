import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, category, dueDate, description } = body;
    console.log(body)

    const task = await db.task.create({
      data: {
        title,
        dueDate,
        description,
        category,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log("Task error :", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


