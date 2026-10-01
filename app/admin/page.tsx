"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleLogin() {
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        "/api/admin-auth",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data =
        await res.json();

      console.log(
        "LOGIN RESULT:",
        data
      );

      if (!data.success) {
        setError(
          data.error ||
            "Username atau password salah"
        );

        return;
      }

      router.push(
        "/admin/dashboard"
      );

      router.refresh();
    } catch (error) {
      console.error(error);

      setError(
        "Terjadi kesalahan server"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">

        <div className="text-center mb-8">

          <div className="text-5xl mb-4">
            🔐
          </div>

          <h1 className="text-4xl font-black text-white">
            Admin Login
          </h1>

          <p className="text-slate-400 mt-3">
            Masuk ke panel administrator
          </p>

        </div>

        <div className="space-y-4">

          <div>
            <label className="block text-slate-300 mb-2">
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
              className="
                w-full
                bg-slate-800
                border
                border-slate-700
                rounded-2xl
                px-4
                py-3
                text-white
                outline-none
                focus:border-cyan-500
              "
              placeholder="Username"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="
                w-full
                bg-slate-800
                border
                border-slate-700
                rounded-2xl
                px-4
                py-3
                text-white
                outline-none
                focus:border-cyan-500
              "
              placeholder="Password"
            />
          </div>

          {error && (
            <div className="
              bg-red-500/10
              border
              border-red-500/30
              text-red-400
              rounded-2xl
              p-3
            ">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="
              w-full
              bg-cyan-500
              hover:bg-cyan-400
              disabled:opacity-50
              text-slate-950
              font-bold
              py-4
              rounded-2xl
              transition
            "
          >
            {loading
              ? "Memproses..."
              : "Masuk"}
          </button>

        </div>

      </div>

    </main>
  );
}