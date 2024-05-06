const stats = [
  { name: "Completed Missions", stat: "17" },
  { name: "Mission Likes", stat: "0" },
  { name: "Recruits", stat: "0" },
  { name: "Recruit Likes", stat: "0" },
  { name: "Supports", stat: "0" },
];

export default function Stats() {
  return (
    <div className="">
      <dl className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 shadow-white"
          >
            <dt className="truncate text-sm font-medium text-gray-500">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {item.stat}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
