"use client";
import { useState, useEffect } from "react";
import CreateMissionModal from "./CreateMissionModal";
import useUserStore from "../stores/userStore";
import Dropdown from "../global-components/Dropdown";
import Mission from "./Mission";
import getUserMissions from "../api-calls/get-user-missions";
import useCursorStore from "../stores/cursorStore";
import { useParams } from "next/navigation";

export default function MissionFeed() {
  const [isVisible, setIsVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const { setData, data } = useUserStore();
  const params = useParams();
  const [missionStatusOption, setMissionStatusOption] =
    useState("Active Missions");
  const [missionStatusOptions, setMissionStatusOptions] = useState([
    "Active Missions",
    "Completed Missions",
    "Expired Missions",
    "Aborted Missions",
  ]);
  const [sortOption, setSortOption] = useState("Likes");
  const [sortOptions, setSortOptions] = useState([
    "Likes",
    "Funding",
    "Oldest",
    "Newest",
  ]);

  const [missions, setMissions] = useState([]);
  const [cursorId, setCursorId] = useState(null);
  const [cursorSortId, setCursorSortId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // fetchUserMissions();
    getUserMissions({
      firstCall: true,
      missionStatusOption,
      cursorId,
      cursorSortId,
      setCursorId,
      setCursorSortId,
      currentData: data,
      setData,
      sortOption,
      username: params.user,
      missions,
      setMissions,
      setError,
    });
  }, [sortOption, missionStatusOption]);

  useEffect(() => {
    console.log("im changing");
  }, [missions]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500); // Delay in milliseconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  if (!isVisible) {
    return null; // Or return a loading indicator if you prefer
  }

  const handleButtonClick = async () => {
    await getUserMissions({
      firstCall: false,
      missionStatusOption,
      cursorId,
      cursorSortId,
      setCursorId,
      setCursorSortId,
      currentData: data,
      setData,
      sortOption,
      username: params.user,
      missions,
      setMissions,
      setError,
    });
  };

  return (
    <div className="px-4 py-5 sm:px-6 animate-fade-in max-w-7xl mx-auto w-full">
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

      <ul role="list" className="">
        {missions?.map((el, index) => (
          <Mission
            el={el}
            index={index}
            key={index}
            missionStatusOption={missionStatusOption}
          />
        ))}
      </ul>
      {cursorId && (
        <button className="text-white" onClick={handleButtonClick}>
          Load More fam
        </button>
      )}

      <div className="fixed bottom-4 right-4 mx-auto tracking-wider w-fit">
        <button
          onClick={() => setOpen(true)}
          type="button"
          className="relative inline-flex items-center rounded-md bg-white w-full px-3 py-3  font-semibold shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          Create Mission
        </button>
      </div>

      <CreateMissionModal open={open} setOpen={setOpen} />
    </div>
  );
}
