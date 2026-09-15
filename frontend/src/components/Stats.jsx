export default function Stats() {
  const stats = [
    {
      value: "500+",
      label: "Institutions Trust Us",
    },
    {
      value: "1M+",
      label: "Active Students",
    },
    {
      value: "99.9%",
      label: "Platform Uptime",
    },
  ];

  return (
    <section id="stats" className="bg-[#082b82]">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 px-5 sm:grid-cols-3 sm:px-8">

        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`py-7 text-center ${
              index !== 0
                ? "border-t border-blue-300/20 sm:border-l sm:border-t-0"
                : ""
            }`}
          >
            <div className="text-[25px] font-bold tracking-tight text-white">
              {stat.value}
            </div>

            <div className="mt-1 text-[11px] font-medium text-white/90">
              {stat.label}
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}