import { NextResponse } from "next/server";

let data = [
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

  const laporanBaru = {
    id: data.length + 1,
    materi: body.materi,
    catatan: body.catatan,
    created_at: new Date().toISOString(),
  };

  data.push(laporanBaru);

  return NextResponse.json(laporanBaru);
}