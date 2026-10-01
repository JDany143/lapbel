"use client";

import { useEffect, useState } from "react";

type Absensi = {
  id: number;
  tanggal: string;
  status: string;
};

export default function AbsensiPage() {
  const [absensiList, setAbsensiList] = useState<
    Absensi[]
  >([]);

  async function loadAbsensi() {
    const res = await fetch("/api/absensi");
    const data = await res.json();

    setAbsensiList(data);
  }

  async function tambahAbsensi(
    status: string
  ) {
    await fetch("/api/absensi", {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        tanggal: new Date()
          .toISOString()
          .split("T")[0],
        status,
      }),
    });

    loadAbsensi();
  }

  useEffect(() => {
    loadAbsensi();
  }, []);

  const hadir =
    absensiList.filter(
      (a) => a.status === "Hadir"
    ).length;

  const izin =
    absensiList.filter(
      (a) => a.status === "Izin"
    ).length;

  const sakit =
    absensiList.filter(
      (a) => a.status === "Sakit"
    ).length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-8">

      <div className="max-w-6xl mx-auto">

        <div className="mb-10">

          <p className="text-cyan-400 font-semibold mb-2">
            Monitoring Kehadiran
          </p>

          <h1 className="text-5xl md:text-6xl font-black">
            📅 Absensi
          </h1>

          <p className="text-slate-400 mt-3">
            Kelola dan pantau kehadiran siswa
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-8">

          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800">
            <p className="text-slate-400">
              Hadir
            </p>

            <p className="text-5xl font-black text-green-400 mt-2">
              {hadir}
            </p>
          </div>

          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800">
            <p className="text-slate-400">
              Izin
            </p>

            <p className="text-5xl font-black text-yellow-400 mt-2">
              {izin}
            </p>
          </div>

          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800">
            <p className="text-slate-400">
              Sakit
            </p>

            <p className="text-5xl font-black text-red-400 mt-2">
              {sakit}
            </p>
          </div>

        </div>

        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-xl">

          <h2 className="text-2xl font-bold mb-6">
            Tambah Absensi
          </h2>

          <div className="grid md:grid-cols-3 gap-4">

            <button
              onClick={() =>
                tambahAbsensi("Hadir")
              }
              className="
              bg-green-500/20
              hover:bg-green-500/30
              border
              border-green-500/30
              rounded-2xl
              p-5
              font-bold
              transition-all
              hover:scale-[1.02]
            "
            >
              ✅ Hadir
            </button>

            <button
              onClick={() =>
                tambahAbsensi("Izin")
              }
              className="
              bg-yellow-500/20
              hover:bg-yellow-500/30
              border
              border-yellow-500/30
              rounded-2xl
              p-5
              font-bold
              transition-all
              hover:scale-[1.02]
            "
            >
              📝 Izin
            </button>

            <button
              onClick={() =>
                tambahAbsensi("Sakit")
              }
              className="
              bg-red-500/20
              hover:bg-red-500/30
              border
              border-red-500/30
              rounded-2xl
              p-5
              font-bold
              transition-all
              hover:scale-[1.02]
            "
            >
              🤒 Sakit
            </button>

          </div>

        </div>

        <div className="mt-8 bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-xl">

          <h2 className="text-2xl font-bold mb-6">
            Riwayat Absensi
          </h2>

          {absensiList.length === 0 ? (
            <div className="text-center py-12">

              <p className="text-5xl mb-4">
                📭
              </p>

              <p className="text-slate-400">
                Belum ada data absensi
              </p>

            </div>
          ) : (
            <div className="space-y-4">

              {absensiList.map((item) => (
                <div
                  key={item.id}
                  className="
                  bg-slate-800
                  rounded-2xl
                  p-5
                  flex
                  flex-col
                  md:flex-row
                  md:items-center
                  md:justify-between
                "
                >
                  <div>
                    <p className="font-semibold">
                      {item.tanggal}
                    </p>

                    <p className="text-slate-400 text-sm">
                      Data Kehadiran
                    </p>
                  </div>

                  <div>
                    <span
                      className={`
                      px-4
                      py-2
                      rounded-full
                      text-sm
                      font-bold
                      ${
                        item.status ===
                        "Hadir"
                          ? "bg-green-500/20 text-green-400"
                          : item.status ===
                            "Izin"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }
                    `}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}

            </div>
          )}

        </div>

      </div>

    </main>
  );
}