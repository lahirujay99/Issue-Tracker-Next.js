import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany({ orderBy: { name: "asc" } });
  if (!users)
    return NextResponse.json({ error: "Invalid Req" }, { status: 404 });
  return NextResponse.json(users, { status: 200 });
}
