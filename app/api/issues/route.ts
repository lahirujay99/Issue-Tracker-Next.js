import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { IssueSchema } from "../../ValidationSchema";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const data = await request.json();
  const validation = IssueSchema.safeParse(data);
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
