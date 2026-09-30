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

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Absensi
      </h1>

      <div className="flex gap-3 mb-6">
        <button
          onClick={() =>
            tambahAbsensi("Hadir")
          }
          className="border p-3 rounded"
        >
          Hadir
        </button>

        <button
          onClick={() =>
            tambahAbsensi("Izin")
          }
          className="border p-3 rounded"
        >
          Izin
        </button>

        <button
          onClick={() =>
            tambahAbsensi("Sakit")
          }
          className="border p-3 rounded"
        >
          Sakit
        </button>
      </div>

      {absensiList.map((item) => (
        <div
          key={item.id}
          className="border p-4 rounded mb-3"
        >
          <p>
            <b>Tanggal:</b>{" "}
            {item.tanggal}
          </p>

          <p>
            <b>Status:</b>{" "}
            {item.status}
          </p>
        </div>
      ))}
    </main>
  );
}