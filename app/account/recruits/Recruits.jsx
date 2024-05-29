"use client";
import { useEffect, useState } from "react";
import Dropdown from "@/app/global-components/Dropdown";
import useUserStore from "@/app/stores/userStore";
import getMyRecruits from "@/app/api-calls/get-my-recruits";
import MissionModal from "./MissionModal";
import { formatDistanceToNow, parseISO } from "date-fns";
import Username from "@/app/global-components/Username";
import { ClipLoader } from "react-spinners";
import Notification from "@/app/global-components/Notification";

export default function Recruits({ tab }) {
  const { setMission, user } = useUserStore();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(0);
  const [missionStatusOption, setMissionStatusOption] =
    useState("Active Recruits");

  const missionStatusOptions = [
    "Active Recruits",
    "Pending Recruits",
    "Completed Recruits",
    "Declined Recruits",
    "Aborted Recruits",
    "Expired Recruits",
  ];
  const sortOptions = ["Oldest", "Newest"];
  const [sortOption, setSortOption] = useState("Oldest");

  const [error, setError] = useState("");

  const [recruits, setRecruits] = useState([]);
  const [cursorId, setCursorId] = useState(null);
  const [cursorSortId, setCursorSortId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    setRecruits([]);
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
      setLoading,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOption, missionStatusOption]);

  const handleButtonClick = async () => {
    //setLoadMore(true);
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

    //setLoadMore(false);
  };

  const Recruit = ({ index, el }) => {
    return (
      <div
        className={`py-4 px-2 border-white border-t-2 border-b rounded-lg text-sm tracking-wide leading-5 ${
          index !== 0 ? "mt-10" : ""
        }`}
        onClick={() => {
          setOpen(true);

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
          {el?.maniac ? (
            <Username
              username={el.maniac}
              textColor={"#bbf7d0"}
              outlineColor={"white"}
              completedMissions={el.completed_missions}
              recruits={el.completed_recruits}
              supports={el.completed_supports}
            />
          ) : (
            <p className="text-[#bbf7d0]">Account Deleted</p>
          )}
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
      <Notification />
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

      {loading && (
        <div className="w-full flex items-center justify-center mt-10">
          <ClipLoader
            color="#4ade80"
            loading={loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}

      {recruits.length > 0 && !loading && (
        <div className="flex items-center justify-center mt-6">
          <p className="text-green-400">
            {recruits[0].total_recruits} {missionStatusOption.toLowerCase()}.
          </p>
        </div>
      )}

      {!recruits.length && !loading && (
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
      {cursorId && (
        <button
          className="relative inline-flex items-center text-black mt-4 rounded-md bg-white  px-3 py-3  font-semibold shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          onClick={handleButtonClick}
        >
          {!loadMore ? (
            "Load More"
          ) : (
            <ClipLoader
              color={"black"}
              loading={loadMore}
              size={25}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          )}
        </button>
      )}
    </>
  );
}
