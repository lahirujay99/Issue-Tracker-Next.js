import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/prisma/client";

const schema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
});

export async function POST(request: NextRequest) {
  const data = await request.json();
  const validation = schema.safeParse(data);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });
  const issue = await prisma.issue.create({
    data: {
      title: data.title,
      description: data.description,
    },
  });
  return NextResponse.json(issue, { status: 201 });
}
