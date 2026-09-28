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
          className="border p-3 rounded"
        />

        <textarea
          placeholder="Catatan belajar hari ini"
          value={catatan}
          onChange={(e) => setCatatan(e.target.value)}
          className="border p-3 rounded h-40"
        />

        <button
          onClick={simpanLaporan}
          className="border p-3 rounded"
        >
          Simpan Laporan
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          Riwayat Laporan
        </h2>

        {laporanList.map((laporan) => (
          <div
            key={laporan.id}
            className="border rounded p-4 mb-4"
          >
            <h3 className="font-bold">
              {laporan.materi}
            </h3>

            <p>{laporan.catatan}</p>

            <small>
              {new Date(
                laporan.created_at
              ).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
    </main>
  );
}