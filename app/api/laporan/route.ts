import { NextResponse } from "next/server";
import { queryD1 } from "@/lib/d1";

export async function GET() {
  try {
    const result = await queryD1(
      "SELECT * FROM laporan ORDER BY id DESC"
    );

    return NextResponse.json(
      result.result?.[0]?.results || []
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Gagal mengambil laporan" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.materi?.trim()) {
      return NextResponse.json(
        { error: "Materi wajib diisi" },
        { status: 400 }
      );
    }

    if (!body.catatan?.trim()) {
      return NextResponse.json(
        { error: "Catatan wajib diisi" },
        { status: 400 }
      );
    }

    await queryD1(`
      INSERT INTO laporan (
        materi,
        catatan,
        created_at
      )
      VALUES (
        '${body.materi.replace(/'/g, "''")}',
        '${body.catatan.replace(/'/g, "''")}',
        '${new Date().toISOString()}'
      )
    `);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Gagal menyimpan laporan" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    if (!body.id) {
      return NextResponse.json(
        { error: "ID wajib diisi" },
        { status: 400 }
      );
    }

    await queryD1(`
      DELETE FROM laporan
      WHERE id = ${Number(body.id)}
    `);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Gagal menghapus laporan" },
      { status: 500 }
    );
  }
}