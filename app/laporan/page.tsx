"use client";

import { useState } from "react";

export default function Laporan() {
  const [materi, setMateri] = useState("");
  const [catatan, setCatatan] = useState("");

  const [laporanList, setLaporanList] = useState<
    {
      materi: string;
      catatan: string;
    }[]
  >([]);

  const simpanLaporan = () => {
    if (!materi || !catatan) return;

    const laporanBaru = {
      materi,
      catatan,
    };

    setLaporanList([...laporanList, laporanBaru]);

    setMateri("");
    setCatatan("");
  };

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">
        Laporan Belajar
      </h1>

      <div className="flex flex-col gap-4 max-w-xl">
        <input
          type="text"
          placeholder="Materi yang dipelajari"
          value={materi}
          onChange={(e) => setMateri(e.target.value)}
          className="border rounded p-3"
        />

        <textarea
          placeholder="Catatan belajar hari ini..."
          value={catatan}
          onChange={(e) => setCatatan(e.target.value)}
          className="border rounded p-3 h-40"
        />

        <button
          onClick={simpanLaporan}
          className="border rounded p-3"
        >
          Simpan Laporan
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">
          Riwayat Laporan
        </h2>

        {laporanList.map((laporan, index) => (
          <div
            key={index}
            className="border rounded p-4 mb-4"
          >
            <h3 className="font-bold">
              {laporan.materi}
            </h3>

            <p>{laporan.catatan}</p>
          </div>
        ))}
      </div>
    </main>
  );
}