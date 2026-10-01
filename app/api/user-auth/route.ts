import { NextResponse } from "next/server";
import { queryD1 } from "@/lib/d1";

export async function POST(req: Request) {
  try {
    const {
      baseKey,
      password,
    } = await req.json();

    if (!baseKey || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "Base Key dan Password wajib diisi",
        },
        {
          status: 400,
        }
      );
    }

    const result = await queryD1(`
      SELECT *
      FROM users
      WHERE base_key='${baseKey.replace(/'/g, "''")}'
      AND password='${password.replace(/'/g, "''")}'
      LIMIT 1
    `);

    const user =
      result.result?.[0]?.results?.[0];

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Base Key atau Password salah",
        },
        {
          status: 401,
        }
      );
    }

    const response =
      NextResponse.json({
        success: true,
        user: {
          id: user.id,
          nama: user.nama,
        },
      });

    response.cookies.set(
      "user-session",
      String(user.id),
      {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      }
    );

    return response;
  } catch (error) {
    console.error(
      "USER LOGIN ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Terjadi kesalahan server",
      },
      {
        status: 500,
      }
    );
  }
}