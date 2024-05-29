import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toggleLike from "../api-calls/toggle-like";
import Username from "../global-components/Username";
import { formatDistanceToNow, parseISO } from "date-fns";
import useUserStore from "../stores/userStore";
import useInfoStore from "../stores/infoStore";

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

const throttledToggleLike = throttle(toggleLike, 2000);

export default function Mission({ el, index, missionStatusOption }) {
  const router = useRouter();
  const { setSignInOpen } = useUserStore();
  const { setShowInfo, setTitle, setInfoMessage } = useInfoStore();

  const [mission, setMission] = useState(el);

  const [fundingGoalPercentage, setFundingGoalPercentage] = useState("");

  useEffect(() => {
    calculateFundingPercentage();
    setMission(el);
  }, [el]);

  const calculateFundingPercentage = () => {
    if (mission?.funding_goal !== null) {
      let fundsPercentage = Math.min(
        100,
        Math.round((mission.funds / mission.funding_goal) * 100)
      );
      setFundingGoalPercentage(fundsPercentage);
    }
  };

  const handleMissionClick = () => {
    // Store the mission data in session storage
    sessionStorage.setItem(
      `mission_${mission.mission_id}`,
      JSON.stringify(mission)
    );
    sessionStorage.setItem(
      `mission_time_${mission.mission_id}`,
      Date.now().toString()
    );

    // Navigate to the mission details page
    router.push(`/mission/${mission.mission_id}`);
  };

  return (
    <li
      className={`flex-col py-5 bg-[#141414] px-2  rounded-lg border-t-2 border-b border-white hover:cursor-pointer hover:bg-gray-900 ${
        index !== 0 ? "mt-4" : "mt-8"
      }`}
      onClick={() => {
        handleMissionClick();
      }}
      onDoubleClick={() => {}}
    >
      <div className="flex-auto">
        <div className="flex items-baseline justify-between gap-x-4">
          {mission?.recruiter ? (
            <Username
              username={mission.recruiter}
              textColor={"#bbf7d0"}
              outlineColor={"white"}
              completedMissions={mission.completed_missions}
              recruits={mission.completed_recruits}
              supports={mission.completed_supports}
            />
          ) : (
            <p className="text-[#bbf7d0]">Recruiter Account Deleted</p>
          )}
          <div>
            <p className="flex-none text-xs text-green-400">
              <time dateTime={mission?.created_at}>
                {formatDistanceToNow(parseISO(mission?.created_at), {
                  addSuffix: true,
                })}
              </time>
            </p>
          </div>
        </div>
        <div className="flex justify-between">
          <p className="mt-1 text-sm leading-6 text-white line-clamp-3 tracking-wide">
            {mission.mission}
          </p>

          {mission?.expires_at && (
            <div
              className="flex items-center justify-center gap-2 mt-1"
              onClick={(e) => {
                e.stopPropagation();
                setTitle("Expiration Time");
                setInfoMessage(
                  "This is the amount of time they have left to complete the mission before it expires."
                );
                setShowInfo(true);
              }}
            >
              <img src="/bomb.png" alt="bomb" className="h-4 w-4" />
              <p className="text-white text-sm">
                {formatDistanceToNow(parseISO(mission.expires_at), {
                  addSuffix: true,
                })}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-2 text-sm">
        <div
          className="flex items-center"
          onClick={async (e) => {
            e.stopPropagation();
            await throttledToggleLike({
              type: "mission",
              itemId: mission.mission_id,
              item: mission,
              setItem: setMission,
              setOpen: setSignInOpen,
            });
          }}
        >
          {mission.user_has_liked && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-green-400"
            >
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
          )}

          {!mission.user_has_liked && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          )}

          <p className="text-white ml-[0.35rem]">{mission.mission_likes}</p>
        </div>

        <div className="text-white  ml-2 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>
          <p className="text-white ml-[0.35rem]">{mission.mission_comments}</p>
        </div>
      </div>
      <div className="flex items-center mt-2 text-sm">
        <div className="text-white flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="white"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
            />
          </svg>

          <p className="text-white ml-[0.35rem]">${mission.funds}</p>
        </div>
        <div className="flex-1 h-5 bg-gray-800 ml-2 rounded-lg relative">
          <div
            className="h-5 bg-green-400 absolute rounded-lg"
            style={{ width: `${fundingGoalPercentage}%` }}
          ></div>
        </div>

        <div className="text-white  ml-2 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="white"
            className="w-4 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"
            />
          </svg>

          <p className="text-white ml-[0.35rem]">${mission.funding_goal}</p>
        </div>
      </div>
    </li>
  );
}
