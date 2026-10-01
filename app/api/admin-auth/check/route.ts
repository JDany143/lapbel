import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const session =
      cookieStore.get(
        "admin-session"
      );

    return NextResponse.json({
      authenticated:
        session?.value ===
        "authenticated",
    });
  } catch (error) {
    console.error(
      "CHECK AUTH ERROR:",
      error
    );

    return NextResponse.json(
      {
        authenticated: false,
      },
      {
        status: 500,
      }
    );
  }
}