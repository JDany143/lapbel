"use client";

import { useEffect, useState } from "react";

type Laporan = {
  id: number;
  materi: string;
  catatan: string;
  created_at: string;
};

export default function LaporanPage() {
  const [materi, setMateri] = useState("");
  const [catatan, setCatatan] = useState("");
  const [laporanList, setLaporanList] = useState<Laporan[]>([]);

  async function loadLaporan() {
    try {
      const res = await fetch("/api/laporan");
      const data = await res.json();
      setLaporanList(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadLaporan();
  }, []);

  async function simpanLaporan() {
    if (!materi || !catatan) return;

    try {
      const res = await fetch("/api/laporan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          materi,
          catatan,
        }),
      });

      if (!res.ok) {
        throw new Error("Gagal menyimpan");
      }

      setMateri("");
      setCatatan("");

      loadLaporan();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-8">
      <div className="max-w-6xl mx-auto">

        <div className="mb-10">
          <p className="text-cyan-400 font-semibold mb-2">
            Catatan Belajar
          </p>

          <h1 className="text-5xl font-black">
            Laporan Belajar
          </h1>

          <p className="text-slate-400 mt-3">
            Simpan materi dan progres belajar harian
          </p>
        </div>

        <div className="bg-slate-900 rounded-3xl p-8 shadow-xl mb-8">
          <h2 className="text-2xl font-bold mb-6">
            Tambah Laporan
          </h2>

          <div className="flex flex-col gap-4">

            <input
              type="text"
              placeholder="Materi yang dipelajari"
              value={materi}
              onChange={(e) => setMateri(e.target.value)}
              className="
                bg-slate-800
                border border-slate-700
                rounded-2xl
                p-4
                outline-none
                focus:border-cyan-500
              "
            />

            <textarea
              placeholder="Catatan belajar hari ini"
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              className="
                bg-slate-800
                border border-slate-700
                rounded-2xl
                p-4
                h-40
                resize-none
                outline-none
                focus:border-cyan-500
              "
            />

            <button
              onClick={simpanLaporan}
              className="
                bg-gradient-to-r
                from-cyan-500
                to-blue-500
                hover:scale-[1.02]
                active:scale-95
                transition-all
                text-slate-950
                font-bold
                py-4
                rounded-2xl
              "
            >
              Simpan Laporan
            </button>

          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">

          <div className="bg-slate-900 rounded-2xl p-5">
            <p className="text-slate-400">
              Total Laporan
            </p>

            <p className="text-3xl font-black">
              {laporanList.length}
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-5">
            <p className="text-slate-400">
              Materi Terakhir
            </p>

            <p className="font-bold truncate">
              {laporanList[0]?.materi ?? "-"}
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-5">
            <p className="text-slate-400">
              Status
            </p>

            <p className="font-bold text-green-400">
              Aktif Belajar
            </p>
          </div>

        </div>

        <div className="bg-slate-900 rounded-3xl p-8 shadow-xl">

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              Riwayat Laporan
            </h2>

            <span className="text-slate-400">
              {laporanList.length} laporan
            </span>
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">

            {laporanList.length === 0 && (
              <div className="bg-slate-800 rounded-2xl p-8 text-center">

                <div className="text-6xl mb-4">
                  📝
                </div>

                <p className="text-slate-300">
                  Belum ada laporan tersimpan
                </p>

                <p className="text-sm text-slate-500 mt-2">
                  Buat laporan pertama untuk mulai melacak progres belajar.
                </p>

              </div>
            )}

            {laporanList.map((laporan) => (
              <div
                key={laporan.id}
                className="
                  bg-slate-800
                  rounded-2xl
                  p-6
                  border border-slate-700
                  hover:border-cyan-500
                  hover:-translate-y-1
                  hover:shadow-lg
                  hover:shadow-cyan-500/10
                  transition-all
                  duration-300
                "
              >
                <div className="flex justify-between items-start mb-3">

                  <h3 className="font-bold text-xl">
                    {laporan.materi}
                  </h3>

                  <span
                    className="
                      bg-slate-700
                      text-slate-300
                      px-3
                      py-1
                      rounded-full
                      text-xs
                    "
                  >
                    {new Date(
                      laporan.created_at
                    ).toLocaleDateString("id-ID")}
                  </span>

                </div>

                <p className="text-slate-300 whitespace-pre-wrap">
                  {laporan.catatan}
                </p>

              </div>
            ))}

          </div>

        </div>

      </div>
    </main>
  );
}