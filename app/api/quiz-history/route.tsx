import { NextResponse } from "next/server";
import { queryD1 } from "@/lib/d1";

export async function GET() {
  try {
    const result = await queryD1(
      "SELECT * FROM quiz_history ORDER BY id DESC"
    );

    return NextResponse.json(
      result.result?.[0]?.results || []
    );
  } catch (error) {
    console.error("GET QUIZ:", error);

    return NextResponse.json(
      {
        error: "Gagal mengambil riwayat quiz",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const score = Number(body.score);
    const total = Number(body.total);

    if (isNaN(score) || isNaN(total)) {
      return NextResponse.json(
        {
          error: "Score dan total harus berupa angka",
        },
        {
          status: 400,
        }
      );
    }

    await queryD1(`
      INSERT INTO quiz_history (
        score,
        total
      )
      VALUES (
        ${score},
        ${total}
      )
    `);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("POST QUIZ:", error);

    return NextResponse.json(
      {
        error: "Gagal menyimpan quiz",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    const id = Number(body.id);

    if (!id || isNaN(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "ID tidak valid",
        },
        {
          status: 400,
        }
      );
    }

    await queryD1(`
      DELETE FROM quiz_history
      WHERE id = ${id}
    `);

    return NextResponse.json({
      success: true,
      message: "Quiz berhasil dihapus",
    });
  } catch (error) {
    console.error(
      "DELETE QUIZ ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Gagal menghapus quiz",
      },
      {
        status: 500,
      }
    );
  }
}