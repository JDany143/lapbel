"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserLoginPage() {
  const router = useRouter();

  const [baseKey, setBaseKey] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleLogin() {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        "/api/user-auth",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            baseKey,
            password,
          }),
        }
      );

      const data =
        await res.json();

      if (!data.success) {
        setError(
          data.error ||
            "Login gagal"
        );
        return;
      }

      router.push("/user");
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
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-slate-900 rounded-3xl p-8">

        <h1 className="text-4xl font-black text-white text-center mb-8">
          Login User
        </h1>

        <div className="space-y-4">

          <input
            type="text"
            value={baseKey}
            onChange={(e) =>
              setBaseKey(
                e.target.value
              )
            }
            placeholder="Base Key"
            className="w-full bg-slate-800 p-4 rounded-xl text-white"
          />

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            placeholder="Password"
            className="w-full bg-slate-800 p-4 rounded-xl text-white"
          />

          {error && (
            <div className="text-red-400">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-cyan-500 text-slate-950 font-bold py-4 rounded-xl"
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