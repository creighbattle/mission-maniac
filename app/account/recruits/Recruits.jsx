"use client";
import { useEffect, useState } from "react";
import { fetchAuthSession } from "aws-amplify/auth";
import Dropdown from "@/app/global-components/Dropdown";
import useUserStore from "@/app/stores/userStore";
import getMyRecruits from "@/app/api-calls/get-my-recruits";
import useCursorStore from "@/app/stores/cursorStore";
import MissionModal from "./MissionModal";
import { formatDistanceToNow, parseISO } from "date-fns";

export default function Recruits({ tab }) {
  const { setMission } = useUserStore();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(0);
  const [missionStatusOption, setMissionStatusOption] =
    useState("Active Recruits");
  const [missionStatusOptions, setMissionStatusOptions] = useState([
    "Active Recruits",
    "Pending Recruits",
    "Completed Recruits",
    "Declined Recruits",
    "Aborted Recruits",
  ]);
  const [sortOption, setSortOption] = useState("Oldest");
  const [sortOptions, setSortOptions] = useState([
    "Oldest",
    "Newest",
    "Funding",
  ]);

  const [error, setError] = useState("");

  const [recruits, setRecruits] = useState([]);
  const [cursorId, setCursorId] = useState(null);
  const [cursorSortId, setCursorSortId] = useState(null);

  useEffect(() => {
    getMyRecruits({
      firstCall: true,
      missionStatusOption,
      cursorId,
      cursorSortId,
      setCursorId,
      setCursorSortId,
      sortOption,
      recruits,
      setRecruits,
      setError,
    });
  }, [sortOption, missionStatusOption]);

  const handleButtonClick = async () => {
    await getMyRecruits({
      firstCall: false,
      missionStatusOption,
      cursorId,
      cursorSortId,
      setCursorId,
      setCursorSortId,
      sortOption,
      recruits,
      setRecruits,
      setError,
    });
  };

  const Recruit = ({ index, el }) => {
    return (
      <div
        className={`py-4 px-2 border-white border-t-2 border-b rounded-lg text-sm tracking-wide leading-5 ${
          index !== 0 ? "mt-10" : ""
        }`}
        onClick={() => {
          setOpen(true);
          console.log(el);
          if (el.mission_status === "active") {
            setView(0);
          } else if (
            el.mission_status === "completed" ||
            el.mission_status === "aborted" ||
            el.mission_status === "declined"
          ) {
            setView(0);
          } else {
            setView(0);
          }

          setMission(el);
        }}
      >
        <div className="flex items-center justify-between">
          <p>Mission Maniac: </p>
          <p>@{el.maniac}</p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p>Recruited: </p>
          <p>
            {formatDistanceToNow(parseISO(el.created_at), {
              addSuffix: true,
            })}
          </p>
        </div>
        <div className="mt-2">
          <p className="text-green-400">Mission: </p>
          <p className="ml-2 line-clamp-3">{el.mission}</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <MissionModal
        open={open}
        setOpen={setOpen}
        view={view}
        setView={setView}
        missionStatusOption={missionStatusOption}
      />
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

      {!recruits.length && (
        <div className="flex items-center justify-center mt-20">
          <p className="text-green-400">
            You currently do not have any {missionStatusOption.toLowerCase()}.
          </p>
        </div>
      )}

      <div className="mt-8">
        {recruits?.map((el, index) => (
          <Recruit el={el} index={index} key={index} />
        ))}
      </div>
      {cursorId && <button onClick={handleButtonClick}>Load More fam</button>}
    </>
  );
}
