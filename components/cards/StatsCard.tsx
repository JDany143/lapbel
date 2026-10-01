type Props = {
  title: string;
  value: string | number;
  subtitle?: string;
  color?: string;
};

export default function StatCard({
  title,
  value,
  subtitle,
  color = "text-cyan-400",
}: Props) {
  return (
    <div className="bg-slate-900 rounded-3xl p-8 shadow-xl">
      <h2 className="text-xl font-bold mb-4">
        {title}
      </h2>

      <p className={`text-5xl font-black ${color}`}>
        {value}
      </p>

      {subtitle && (
        <p className="mt-4 text-slate-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}