import { NextResponse } from "next/server";

const data = [
  {
    id: 1,
    materi: "Matematika",
    catatan: "Belajar SPLTV",
    created_at: new Date().toISOString(),
  },
];

export async function GET() {
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  return NextResponse.json({
    success: true,
    data: body,
  });
}