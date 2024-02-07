import { patchIssueSchema } from "@/app/ValidationSchema";
import authOptions from "@/app/auth/authOptions";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();

  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { title, description, assignedToUserId } = body;

  if (assignedToUserId) {
    const findU = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });

    console.log(findU);
    if (!findU)
      return NextResponse.json({ error: "Invalid user" }, { status: 400 });
  }

  const isAvailable = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!isAvailable)
    return NextResponse.json({ error: "Issue Not Found" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: isAvailable.id },
    data: {
      title,
      description,
      assignedToUserId,
    },
  });
  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const isAvailable = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!isAvailable)
    return NextResponse.json({ error: "Invalid Request" }, { status: 404 });

  await prisma.issue.delete({
    where: { id: isAvailable.id },
  });

  return NextResponse.json({}, { status: 200 });
}
