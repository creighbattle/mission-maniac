import { useRouter } from "next/navigation";
import useInfoStore from "../stores/infoStore";

export default function Username({
  username,
  completedMissions,
  recruits,
  supports,
  textColor,
  outlineColor,
}) {
  const { setShowInfo, setTitle, setInfoMessage } = useInfoStore();
  const router = useRouter();

  let mBadgeColor;
  let rBadgeColor;
  let sBadgeColor;

  if (completedMissions > 0) mBadgeColor = "pink";
  if (completedMissions >= 20) mBadgeColor = "#0ea5e9";
  if (completedMissions >= 100) mBadgeColor = "#fdba74";
  if (completedMissions >= 300) mBadgeColor = "#4ade80";
  if (recruits > 0) rBadgeColor = "pink";
  if (recruits >= 20) rBadgeColor = "#0ea5e9";
  if (recruits >= 100) rBadgeColor = "#fdba74";
  if (recruits >= 200) rBadgeColor = "#4ade80";
  if (supports > 0) sBadgeColor = "pink";
  if (supports >= 20) sBadgeColor = "#0ea5e9";
  if (supports >= 100) sBadgeColor = "#fdba74";
  if (supports >= 150) sBadgeColor = "#4ade80";

  return (
    <div
      className="flex items-center hover:cursor-pointer"
      onClick={() => {
        router.push(`/${username}`);
      }}
    >
      <p style={{ color: textColor }}>@{username}</p>
      {completedMissions > 0 && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            setShowInfo(true);
            setTitle("Badges");
            setInfoMessage(
              `@${username} has earned ${completedMissions} Mission Maniac badges.`
            );
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            //fill="pink"
            fill={mBadgeColor}
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke={outlineColor}
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
            />
            <text
              x="8.2"
              y="15.5"
              //font-family="sans-serif"
              fontSize="10"
              fill="currentColor"
              stroke="black"
            >
              M
            </text>
          </svg>
        </span>
      )}
      {recruits > 0 && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            setShowInfo(true);
            setTitle("Badges");
            setInfoMessage(
              `@${username} has earned ${recruits} recruiter badges.`
            );
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={rBadgeColor}
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke={outlineColor}
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
            />
            <text
              x="8.5"
              y="15.5"
              //font-family="sans-serif"
              stroke="black"
              fontSize="10"
              fill="currentColor"
            >
              R
            </text>
          </svg>
        </span>
      )}
      {supports > 0 && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            setShowInfo(true);
            setTitle("Badges");
            setInfoMessage(
              `@${username} has earned ${supports} supporter badges.`
            );
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={sBadgeColor}
            //fill="#0ea5e9"
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke={outlineColor}
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
            />
            <text
              x="8.8"
              y="15.5"
              //font-family="sans-serif"
              stroke="black"
              fontSize="10"
              fill="currentColor"
            >
              S
            </text>
          </svg>
        </span>
      )}
    </div>
  );
}
