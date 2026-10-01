import { NextResponse } from "next/server";
import { queryD1 } from "@/lib/d1";

export async function GET() {
  try {
    const result = await queryD1(
      "SELECT * FROM absensi ORDER BY id DESC"
    );

    return NextResponse.json(
      result.result?.[0]?.results || []
    );
  } catch (error) {
    console.error("GET absensi:", error);

    return NextResponse.json(
      { error: "Gagal mengambil absensi" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { tanggal, status } =
      await req.json();

    if (!tanggal?.trim()) {
      return NextResponse.json(
        { error: "Tanggal wajib diisi" },
        { status: 400 }
      );
    }

    if (!status?.trim()) {
      return NextResponse.json(
        { error: "Status wajib diisi" },
        { status: 400 }
      );
    }

    await queryD1(`
      INSERT INTO absensi (
        tanggal,
        status
      )
      VALUES (
        '${tanggal}',
        '${status.replace(/'/g, "''")}'
      )
    `);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("POST absensi:", error);

    return NextResponse.json(
      { error: "Gagal menyimpan absensi" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "ID wajib diisi" },
        { status: 400 }
      );
    }

    await queryD1(`
      DELETE FROM absensi
      WHERE id = ${Number(id)}
    `);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("DELETE absensi:", error);

    return NextResponse.json(
      { error: "Gagal menghapus absensi" },
      { status: 500 }
    );
  }
}