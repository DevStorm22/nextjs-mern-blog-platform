import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: any) {
  await connectDB();
  const body = await req.json();
  const blog = await Blog.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(blog);
}

export async function DELETE(_: Request, { params }: any) {
  await connectDB();
  await Blog.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Deleted" });
}

export async function GET(_: Request, { params }: any) {
  await connectDB();
  const blog = await Blog.findById(params.id);
  return NextResponse.json(blog);
}
