import useUserStore from "../stores/userStore";

export default function AccountStats() {
  const { user } = useUserStore();

  const stats = [
    { name: "Completed Missions", stat: user.completed_missions },
    { name: "Mission Likes", stat: user.mission_likes },
    { name: "Recruits", stat: user.recruits },
    { name: "Recruit Likes", stat: user.recruit_likes },
    { name: "Supports", stat: user.supported_missions },
    { name: "Comment Likes", stat: user.comment_likes },
  ];

  return (
    <div>
      <dl className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-lg bg-[#141414] px-4 py-5 shadow sm:p-6 border border-green-400"
          >
            <dt className="truncate text-sm font-medium text-gray-200">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-white">
              {item.stat}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
