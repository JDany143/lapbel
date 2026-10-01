import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();

  const admin =
    cookieStore.get("admin-session");

  const user =
    cookieStore.get("user-session");

  if (admin) {
    redirect("/admin/dashboard");
  }

  if (user) {
    redirect("/user");
  }

  redirect("/login");
}