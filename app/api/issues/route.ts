import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { createIssueSchema } from "../../ValidationSchema";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const validation = createIssueSchema.safeParse(data);
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
