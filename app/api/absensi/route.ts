import { NextResponse } from "next/server";
import { queryD1 } from "@/lib/d1";

export async function GET() {
  const result = await queryD1(
    "SELECT * FROM absensi ORDER BY id DESC"
  );

  return NextResponse.json(
    result.result?.[0]?.results || []
  );
}

export async function POST(req: Request) {
  const body = await req.json();

  await queryD1(`
    INSERT INTO absensi (tanggal, status)
    VALUES (
      '${body.tanggal}',
      '${body.status}'
    )
  `);

  return NextResponse.json({
    success: true,
  });
}