export default function UserStatCard({
  title,
  value,
  description,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <p className="text-sm font-semibold text-[#444651]">
        {title}
      </p>

      <p className="mt-4 text-3xl font-bold text-[#191c1e]">
        {value}
      </p>

      <p className="mt-2 text-sm text-[#444651]">
        {description}
      </p>
    </div>
  );
}