import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-2">
        Laporan Belajar AI
      </h1>

      <p className="text-gray-500 mb-8">
        Dashboard Belajar Siswa
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="border rounded-xl p-4">
          <h2 className="font-semibold">
            Kehadiran
          </h2>
          <p className="text-2xl">90%</p>
        </div>

        <div className="border rounded-xl p-4">
          <h2 className="font-semibold">
            Hari Belajar
          </h2>
          <p className="text-2xl">15 Hari</p>
        </div>
      </div>

      <div className="flex gap-4">
        <Link
          href="/absensi"
          className="border rounded-lg px-4 py-2"
        >
          Absensi
        </Link>

        <Link
          href="/laporan"
          className="border rounded-lg px-4 py-2"
        >
          Laporan
        </Link>

        <Link
          href="/quiz"
          className="border rounded-lg px-4 py-2"
        >
          Quiz AI
        </Link>
      </div>
    </main>
  );
}