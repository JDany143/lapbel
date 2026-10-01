"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">

      <div className="w-full max-w-4xl">

        <div className="text-center mb-12">

          <h1 className="text-6xl font-black text-white mb-4">
            LAPBEL
          </h1>

          <p className="text-slate-400 text-lg">
            Pilih jenis akun untuk masuk
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-8">

          <button
            onClick={() =>
              router.push("/login/user")
            }
            className="
              bg-slate-900
              border
              border-slate-800
              rounded-3xl
              p-10
              hover:border-cyan-500
              transition
              text-left
            "
          >
            <div className="text-6xl mb-6">
              👨‍🎓
            </div>

            <h2 className="text-3xl font-black text-white mb-3">
              User
            </h2>

            <p className="text-slate-400">
              Lihat laporan belajar,
              absensi, dan hasil quiz.
            </p>
          </button>

          <button
            onClick={() =>
              router.push("/login/admin")
            }
            className="
              bg-slate-900
              border
              border-slate-800
              rounded-3xl
              p-10
              hover:border-red-500
              transition
              text-left
            "
          >
            <div className="text-6xl mb-6">
              🛠️
            </div>

            <h2 className="text-3xl font-black text-white mb-3">
              Admin
            </h2>

            <p className="text-slate-400">
              Kelola laporan,
              absensi, quiz,
              dan data pengguna.
            </p>
          </button>

        </div>

      </div>

    </main>
  );
}