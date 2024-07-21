import useUserStore from "@/app/stores/userStore";
import { ClipLoader } from "react-spinners";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
} from "@heroicons/react/24/outline";
import {
  HandThumbUpIcon as HandThumbUpIconSolid,
  HandThumbDownIcon as HandThumbDownIconSolid,
} from "@heroicons/react/24/solid";
import toggleVote from "@/app/api-calls/toggle-vote";
import { useEffect, useState } from "react";
import Username from "@/app/global-components/Username";
import useNotificationStore from "@/app/stores/notificationStore";
import Notification from "@/app/global-components/Notification";
import { formatDistanceToNow, parseISO } from "date-fns";

export default function MissionReport({ recruiter, isUser, setSignInOpen }) {
  const { mission, setMission } = useUserStore();

  const [isExpired, setIsExpired] = useState(false);
  const { setNError, setNTitle, setNMessage, setShowNotification } =
    useNotificationStore();

  useEffect(() => {
    const now = new Date();

    if (mission?.expires_at && new Date(mission.expires_at) < now) {
      setIsExpired(true);
    }
  }, []);

  if (!mission) {
    return (
      <div className="flex flex-col w-full h-full items-center justify-center mt-10">
        <ClipLoader
          color={"#4ade80"}
          loading={true}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  const handleVote = async (vote) => {
    if (isUser) {
      await toggleVote({
        mission_id: mission.mission_id,
        vote,
        mission,
        setMission,
        setNError,
        setNTitle,
        setNMessage,
        setShowNotification,
      });
    } else {
      setSignInOpen(true);
    }
  };

  if (mission.mission_status === "completed") {
    return (
      <div className="px-4 text-white text-md mt-4">
        <Notification />
        <p className=" text-green-400">Recruiter:</p>
        {/* <p className="pl-3">@{mission.recruiter}</p> */}
        <div className="pl-3">
          {mission?.recruiter ? (
            <Username
              username={mission.recruiter}
              textColor={"#bbf7d0"}
              outlineColor={"white"}
              completedMissions={recruiter?.completed_missions}
              recruits={recruiter?.recruits}
              supports={recruiter?.supported_missions}
            />
          ) : (
            <p className="text-[#bbf7d0]">Account Deleted</p>
          )}
        </div>
        <p className=" mt-2 text-green-400">Mission:</p>
        <p className="pl-3 leading-6">{mission.mission}</p>
        <p className=" mt-2 text-green-400">Status:</p>
        <p className="pl-3">{mission.mission_status}</p>
        <p className="mt-2 text-green-400">Was thie mission completed?</p>
        <div className="flex pl-3 mt-1 items-center">
          {mission.user_vote === "honor" && (
            <HandThumbUpIconSolid
              className="h-5 w-5"
              onClick={() => handleVote("honor")}
            />
          )}

          {mission.user_vote !== "honor" && (
            <HandThumbUpIcon
              className="h-5 w-5"
              onClick={() => handleVote("honor")}
            />
          )}

          <p className="ml-1">{mission.honors}</p>

          {mission.user_vote === "dishonor" && (
            <HandThumbDownIconSolid
              className="h-5 w-5 ml-2"
              onClick={() => handleVote("dishonor")}
            />
          )}

          {mission.user_vote !== "dishonor" && (
            <HandThumbDownIcon
              className="h-5 w-5 ml-2"
              onClick={() => handleVote("dishonor")}
            />
          )}

          <p className="ml-1">{mission.dishonors}</p>
        </div>

        <p className=" mt-2 text-green-400">Mission Files:</p>

        <a
          className="pl-3 hover:cursor-pointer"
          onClick={() => {
            window.open(mission.mission_link_1, "_blank");
          }}
          href={"#"}
        >
          {mission.mission_link_1}
        </a>
        {mission.mission_link_2 && (
          <a
            className="pl-3 hover:cursor-pointer"
            onClick={() => {
              window.open(mission.mission_link_2, "_blank");
            }}
            href={"#"}
          >
            {mission.mission_link_2}
          </a>
        )}
        {mission.mission_link_3 && (
          <a
            className="pl-3 hover:cursor-pointer"
            onClick={() => {
              window.open(mission.mission_link_3, "_blank");
            }}
            href={"#"}
          >
            {mission.mission_link_3}
          </a>
        )}
        {mission.mission_link_4 && (
          <a
            className="pl-3 hover:cursor-pointer"
            onClick={() => {
              window.open(mission.mission_link_4, "_blank");
            }}
            href={"#"}
          >
            {mission.mission_link_4}
          </a>
        )}
        {mission.mission_link_5 && (
          <a
            className="pl-3 hover:cursor-pointer"
            onClick={() => {
              window.open(mission.mission_link_5, "_blank");
            }}
            href={"#"}
          >
            {mission.mission_link_5}
          </a>
        )}
        <p className=" mt-2 text-green-400">{mission.maniac} report:</p>
        <p className="pl-3">{mission.maniac_message}</p>
        <p className=" mt-2 text-green-400">Mission Points:</p>
        <p className="pl-3">{mission.funds}</p>
        <p className=" mt-2 text-green-400">Funding Requirement:</p>
        <p className="pl-3">{mission.funding_goal}</p>
      </div>
    );
  }

  return (
    <>
      <div className="px-4 text-white text-md mt-4">
        <p className=" text-green-400">Recruiter:</p>
        <div className="pl-3">
          {mission?.recruiter ? (
            <Username
              username={mission?.recruiter}
              textColor={"#bbf7d0"}
              outlineColor={"white"}
              completedMissions={recruiter?.completed_missions}
              recruits={recruiter?.recruits}
              supports={recruiter?.supported_missions}
            />
          ) : (
            <p className="text-[#bbf7d0]">Account Deleted</p>
          )}
        </div>

        <p className=" mt-2 text-green-400">Mission:</p>
        <p className="pl-3 leading-6">{mission.mission}</p>
        <p className=" mt-2 text-green-400">Status:</p>
        {/* <p className="pl-3">{mission.mission_status}</p> */}
        <p className="pl-3">
          {mission.mission_status === "active" && isExpired
            ? "expired"
            : mission.mission_status}
        </p>

        {mission?.expires_at && (
          <>
            <p className="mt-2 text-green-400">Expires:</p>
            <div
              className="flex items-center gap-2 pl-3"
              onClick={(e) => {
                e.stopPropagation();
                // setTitle("Expiration Time");
                // setInfoMessage(
                //   "This is the amount of time they have left to complete the mission before it expires."
                // );
                // setShowInfo(true);
              }}
            >
              <img src="/bomb.png" alt="bomb" className="h-4 w-4" />
              <p className="text-white text-sm">
                {formatDistanceToNow(parseISO(mission.expires_at), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </>
        )}

        {mission?.maniac_message && (
          <div className="mt-2">
            <p className="text-green-400">
              {mission.mission_status === "aborted"
                ? "Abort Reason:"
                : mission.mission_status === "declined"
                ? "Decline Reason:"
                : "Report:"}
            </p>
            <div className="ml-2">
              <p>{mission?.maniac_message}</p>
            </div>
          </div>
        )}

        <p className=" mt-2 text-green-400">Mission Points:</p>
        <p className="pl-3">{mission.funds}</p>
        <p className=" mt-2 text-green-400">Funding Goal:</p>
        <p className="pl-3">{mission.funding_goal}</p>
      </div>
    </>
  );
}
