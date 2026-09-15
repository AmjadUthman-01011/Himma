import UserStatCard from "./UserStatsCard";

const stats = [
  {
    title: "Total Users",
    value: "2,738",
    description: "+12 this week",
  },
  {
    title: "Admins",
    value: "12",
    description: "System administrators",
  },
  {
    title: "Teachers",
    value: "480",
    description: "Active faculty members",
  },
  {
    title: "Students",
    value: "2,246",
    description: "Enrolled this semester",
  },
];

export default function UserStats() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <UserStatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}