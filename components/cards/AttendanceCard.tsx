type Props = {
  hadir: number;
  total: number;
  percent: number;
};

export default function AttendanceCard({
  hadir,
  total,
  percent,
}: Props) {
  return (
    <div className="bg-slate-900 rounded-3xl p-8">
      <h2 className="text-xl font-bold mb-4">
        Absensi
      </h2>

      <p className="text-5xl font-black text-green-400">
        {percent}%
      </p>

      <p className="mt-4 text-slate-400">
        {hadir} / {total} hadir
      </p>
    </div>
  );
}