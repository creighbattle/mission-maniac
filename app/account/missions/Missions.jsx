"use client";
import { useEffect, useState } from "react";
import RequestModal from "./RequestModal";
import Dropdown from "@/app/global-components/Dropdown";
import useUserStore from "@/app/stores/userStore";
import Notification from "@/app/global-components/Notification";
import getMyMissions from "@/app/api-calls/get-my-missions";
import { formatDistanceToNow, parseISO } from "date-fns";
import Username from "@/app/global-components/Username";

export default function Missions() {
  const { setSelectedData } = useUserStore();

  const [open, setOpen] = useState(false);
  const [view, setView] = useState(0);
  const [missionStatusOption, setMissionStatusOption] =
    useState("Mission Requests");
  const [missionStatusOptions, setMissionStatusOptions] = useState([
    "Mission Requests",
    "Active Missions",
    "Completed Missions",
    "Aborted Missions",
    "Expired Missions",
    "Declined Missions",
  ]);
  const [sortOption, setSortOption] = useState("Oldest");
  const sortOptions = ["Oldest", "Newest", "Funding"];

  const [missions, setMissions] = useState([]);
  const [cursorId, setCursorId] = useState(null);
  const [cursorSortId, setCursorSortId] = useState(null);

  const [error, setError] = useState("");

  useEffect(() => {
    getMyMissions({
      firstCall: true,
      missionStatusOption,
      cursorId,
      cursorSortId,
      setCursorId,
      setCursorSortId,
      sortOption,
      missions,
      setMissions,
      setError,
    });
  }, [sortOption, missionStatusOption]);

  const handleButtonClick = async () => {
    await getMyMissions({
      firstCall: false,
      missionStatusOption,
      cursorId,
      cursorSortId,
      setCursorId,
      setCursorSortId,
      sortOption,
      missions,
      setMissions,
      setError,
    });
  };

  const MissionRequest = ({ index, el }) => {
    return (
      <div
        className={`py-4 px-2 border-white border-t-2 border-b rounded-lg text-sm tracking-wide leading-5 ${
          index !== 0 ? "mt-10" : ""
        }`}
        onClick={() => {
          setOpen(true);
          console.log(el);
          if (missionStatusOption === "Expired Missions") {
            setView(8);
          } else if (el.mission_status === "active") {
            setView(3);
          } else if (
            el.mission_status === "completed" ||
            el.mission_status === "aborted" ||
            el.mission_status === "declined"
          ) {
            setView(6);
          } else {
            setView(0);
          }

          setSelectedData(el);
        }}
      >
        <div className="flex items-center justify-between">
          <p>Recruiter: </p>
          <Username
            username={el.recruiter}
            textColor={"#bbf7d0"}
            outlineColor={"white"}
            completedMissions={el.completed_missions}
            recruits={el.completed_recruits}
            supports={el.completed_supports}
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <p>Recruited: </p>
          <p>
            {formatDistanceToNow(parseISO(el.created_at), {
              addSuffix: true,
            })}
          </p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p>Funding: </p>
          <p>${el.funds}</p>
        </div>
        <div className="mt-2 text-green-400">
          <p>Mission: </p>
          <p className="ml-2 line-clamp-3 text-white">{el.mission}</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex items-center justify-between mt-4">
        <Dropdown
          option={missionStatusOption}
          setOption={setMissionStatusOption}
          options={missionStatusOptions}
        />
        <label htmlFor="" className="text-white text-md font-semibold">
          Sort By:
          <Dropdown
            option={sortOption}
            setOption={setSortOption}
            options={sortOptions}
            right={true}
          />
        </label>
      </div>

      {!missions.length && (
        <div className="flex items-center justify-center mt-20">
          <p className="text-green-400">
            You currently do not have any {missionStatusOption.toLowerCase()}.
          </p>
        </div>
      )}

      <div className="mt-8">
        {missions?.map((el, index) => (
          <MissionRequest el={el} index={index} key={index} />
        ))}
      </div>
      {cursorId && <button onClick={handleButtonClick}>Load More fam</button>}
      <Notification />
      <RequestModal
        open={open}
        setOpen={setOpen}
        view={view}
        setView={setView}
        missions={missions}
        setMissions={setMissions}
      />
    </>
  );
}
