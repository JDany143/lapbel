import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, password } =
      await req.json();

    if (
      username !== process.env.ADMIN_USERNAME ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Username atau password salah",
        },
        {
          status: 401,
        }
      );
    }

    const response = NextResponse.json({
      success: true,
    });

    response.cookies.set(
      "admin-session",
      "authenticated",
      {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        path: "/",
        maxAge: 60 * 60 * 24,
      }
    );

    console.log("COOKIE DIBUAT");

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Server error",
      },
      {
        status: 500,
      }
    );
  }
}