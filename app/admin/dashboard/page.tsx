"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Laporan = {
  id: number;
  materi: string;
  catatan: string;
};

type Absensi = {
  id: number;
  tanggal: string;
  status: string;
};

type Quiz = {
  id: number;
  score: number;
  total: number;
};

export default function AdminDashboard() {
  const router = useRouter();

  const [laporan, setLaporan] =
    useState<Laporan[]>([]);

  const [absensi, setAbsensi] =
    useState<Absensi[]>([]);

  const [quiz, setQuiz] =
    useState<Quiz[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
  async function init() {
      try {
        const authRes = await fetch(
          "/api/admin-auth/check",
          {
            cache: "no-store",
          }
        );

        const authData =
          await authRes.json();

        console.log(
          "AUTH CHECK:",
          authData
        );

        if (
          !authData.authenticated
        ) {
          router.replace("/admin");
          return;
        }

        const [
          laporanRes,
          absensiRes,
          quizRes,
        ] = await Promise.all([
          fetch("/api/laporan"),
          fetch("/api/absensi"),
          fetch("/api/quiz-history"),
        ]);

        const laporanData =
          await laporanRes.json();

        const absensiData =
          await absensiRes.json();

        const quizData =
          await quizRes.json();

        setLaporan(
          Array.isArray(
            laporanData
          )
            ? laporanData
            : []
        );

        setAbsensi(
          Array.isArray(
            absensiData
          )
            ? absensiData
            : []
        );

        setQuiz(
          Array.isArray(
            quizData
          )
            ? quizData
            : []
        );
      } catch (error) {
        console.error(
          "DASHBOARD ERROR:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    init();
  }, [router]);

  async function logout() {
    try {
      await fetch(
        "/api/admin-auth/logout",
        {
          method: "POST",
        }
      );

      router.replace("/admin");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  async function hapusLaporan(
    id: number
  ) {
    if (
      !confirm(
        "Hapus laporan ini?"
      )
    )
      return;

    await fetch(
      "/api/laporan",
      {
        method: "DELETE",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      }
    );

    setLaporan((prev) =>
      prev.filter(
        (item) =>
          item.id !== id
      )
    );
  }

  async function hapusAbsensi(
    id: number
  ) {
    if (
      !confirm(
        "Hapus absensi ini?"
      )
    )
      return;

    await fetch(
      "/api/absensi",
      {
        method: "DELETE",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      }
    );

    setAbsensi((prev) =>
      prev.filter(
        (item) =>
          item.id !== id
      )
    );
  }

  async function hapusQuiz(
    id: number
  ) {
    if (
      !confirm(
        "Hapus hasil quiz ini?"
      )
    )
      return;

    await fetch(
      "/api/quiz-history",
      {
        method: "DELETE",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      }
    );

    setQuiz((prev) =>
      prev.filter(
        (item) =>
          item.id !== id
      )
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Memverifikasi Admin...
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-10">
          <div>
            <p className="text-cyan-400 font-semibold">
              Panel Admin
            </p>

            <h1 className="text-5xl font-black mt-2">
              Dashboard Admin
            </h1>

            <p className="text-slate-400 mt-3">
              Kelola seluruh data aplikasi
            </p>
          </div>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-400 px-5 py-3 rounded-xl font-bold"
          >
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-slate-900 rounded-3xl p-6">
            <p>Total Laporan</p>

            <h2 className="text-5xl font-black text-cyan-400 mt-2">
              {laporan.length}
            </h2>
          </div>

          <div className="bg-slate-900 rounded-3xl p-6">
            <p>Total Absensi</p>

            <h2 className="text-5xl font-black text-green-400 mt-2">
              {absensi.length}
            </h2>
          </div>

          <div className="bg-slate-900 rounded-3xl p-6">
            <p>Total Quiz</p>

            <h2 className="text-5xl font-black text-purple-400 mt-2">
              {quiz.length}
            </h2>
          </div>

        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          <div className="bg-slate-900 rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-5">
              📄 Laporan
            </h2>

            <div className="space-y-3 max-h-[600px] overflow-y-auto">

              {laporan.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-800 rounded-2xl p-4"
                >
                  <h3 className="font-bold">
                    {item.materi}
                  </h3>

                  <p className="text-slate-400 text-sm mt-2">
                    {item.catatan}
                  </p>

                  <button
                    onClick={() =>
                      hapusLaporan(
                        item.id
                      )
                    }
                    className="mt-4 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl"
                  >
                    Hapus
                  </button>
                </div>
              ))}

            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-5">
              📅 Absensi
            </h2>

            <div className="space-y-3 max-h-[600px] overflow-y-auto">

              {absensi.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-800 rounded-2xl p-4"
                >
                  <p>{item.tanggal}</p>

                  <p className="text-green-400 mt-1">
                    {item.status}
                  </p>

                  <button
                    onClick={() =>
                      hapusAbsensi(
                        item.id
                      )
                    }
                    className="mt-4 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl"
                  >
                    Hapus
                  </button>
                </div>
              ))}

            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-5">
              🧠 Quiz History
            </h2>

            <div className="space-y-3 max-h-[600px] overflow-y-auto">

              {quiz.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-800 rounded-2xl p-4"
                >
                  <p className="font-bold">
                    {item.score} / {item.total}
                  </p>

                  <button
                    onClick={() =>
                      hapusQuiz(
                        item.id
                      )
                    }
                    className="mt-4 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl"
                  >
                    Hapus
                  </button>
                </div>
              ))}

            </div>
          </div>

        </div>

      </div>
    </main>
  );
}