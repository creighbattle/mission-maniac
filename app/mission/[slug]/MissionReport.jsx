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

// const mission = {
//   createdBy: "@creighbattle",
//   imageUrl:
//     "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//   mission:
//     "Play kayn jg in high elo. Play kayn jg in high elo. Play kayn jg in high elo. Play kayn jg in high elo. Play kayn jg in high elo. Play kayn jg in high elo. Play kayn jg in high elo.",
//   message: "Hey Pekin, love your content!",
//   total: 8,
//   totalNeeded: 20,
//   missionLikes: 104,
//   expireAt: "10:00 am |June 6th | 2024",
//   status: "active",
//   funding: 38,
//   fundingRequirement: 50,
//   missionFiles: ["https://www.youtube.com/"],
//   assignedTo: "pekinwoof",
//   afterReport: "Thanks guys that was fun!",
// };

export default function MissionReport({ recruiter }) {
  const { mission, setMission } = useUserStore();

  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const now = new Date();

    if (mission?.expires_at && new Date(mission.expires_at) < now) {
      setIsExpired(true);
    }
  }, []);

  if (!mission) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <ClipLoader
          color={"#4ade80"}
          loading={true}
          // cssOverride={override}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  const handleVote = async (vote) => {
    await toggleVote({
      mission_id: mission.mission_id,
      vote,
      mission,
      setMission,
    });
  };

  if (mission.mission_status === "completed") {
    return (
      <div className="px-4 text-white text-md mt-4">
        <p className=" text-green-400">Recruiter:</p>
        {/* <p className="pl-3">@{mission.recruiter}</p> */}
        <div className="pl-3">
          <Username
            username={mission.recruiter}
            textColor={"#bbf7d0"}
            outlineColor={"white"}
            completedMissions={recruiter?.completed_missions}
            recruits={recruiter?.recruits}
            supports={recruiter?.supported_missions}
          />
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
        {/* {mission.missionFiles.map((el, idx) => {
        return (
          <a className="pl-3" key={idx} href={el}>
            {el}
          </a>
        );
      })} */}
        <a className="pl-3" href={"#"}>
          {mission.mission_link_1}
        </a>
        <p className=" mt-2 text-green-400">{mission.maniac} report:</p>
        <p className="pl-3">{mission.maniac_message}</p>
        <p className=" mt-2 text-green-400">Funding:</p>
        <p className="pl-3">${mission.funds}</p>
        <p className=" mt-2 text-green-400">Funding Requirement:</p>
        <p className="pl-3">${mission.funding_goal}</p>
      </div>
    );
  }

  return (
    <>
      <div className="px-4 text-white text-md mt-4">
        <p className=" text-green-400">Recruiter:</p>
        <div className="pl-3">
          <Username
            username={mission.recruiter}
            textColor={"#bbf7d0"}
            outlineColor={"white"}
            completedMissions={recruiter?.completed_missions}
            recruits={recruiter?.recruits}
            supports={recruiter?.supported_missions}
          />
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

        <p className=" mt-2 text-green-400">Funding:</p>
        <p className="pl-3">${mission.funds}</p>
        <p className=" mt-2 text-green-400">Funding Requirement:</p>
        <p className="pl-3">${mission.funding_goal}</p>
      </div>
    </>
  );
}
