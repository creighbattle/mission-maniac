import useUserStore from "../stores/userStore";

export default function Stats() {
  const { user } = useUserStore();

  const stats = [
    { name: "Completed Missions", stat: user.completed_missions },
    { name: "Mission Likes", stat: user.mission_likes },
    { name: "Recruits", stat: user.recruits },
    { name: "Supports", stat: user.supported_missions },
  ];
  return (
    <div className="">
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-20 mb-5">
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
