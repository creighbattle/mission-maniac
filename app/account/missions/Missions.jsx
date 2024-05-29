"use client";
import { useEffect, useState } from "react";
import RequestModal from "./RequestModal";
import Dropdown from "@/app/global-components/Dropdown";
import useUserStore from "@/app/stores/userStore";
import Notification from "@/app/global-components/Notification";
import getMyMissions from "@/app/api-calls/get-my-missions";
import { formatDistanceToNow, parseISO } from "date-fns";
import Username from "@/app/global-components/Username";
import { ClipLoader } from "react-spinners";

export default function Missions() {
  const { setSelectedData } = useUserStore();

  const [open, setOpen] = useState(false);
  const [view, setView] = useState(0);
  const [missionStatusOption, setMissionStatusOption] =
    useState("Mission Requests");
  const missionStatusOptions = [
    "Mission Requests",
    "Active Missions",
    "Completed Missions",
    "Aborted Missions",
    "Expired Missions",
    "Declined Missions",
  ];
  const [sortOption, setSortOption] = useState("Oldest");
  const sortOptions = ["Oldest", "Newest", "Funding"];

  const [missions, setMissions] = useState([]);
  const [cursorId, setCursorId] = useState(null);
  const [cursorSortId, setCursorSortId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    setMissions([]);
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
      setLoading,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOption, missionStatusOption]);

  const handleButtonClick = async () => {
    setLoadMore(true);
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
    setLoadMore(false);
  };

  const MissionCompletedView = ({ index, el }) => {
    return (
      <div
        className={`py-4 px-2 border-white border-t-2 border-b rounded-lg text-sm tracking-wide leading-5 hover:cursor-pointer ${
          index !== 0 ? "mt-10" : ""
        }`}
        onClick={() => {
          setOpen(true);

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

          setSelectedData({});
          setSelectedData(el);
        }}
      >
        <div className="flex items-center justify-between">
          <p>Recruiter: </p>
          {el?.recruiter ? (
            <Username
              username={el.recruiter}
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
        {el?.transfer_amount && el.total_transfer && (
          <>
            <div className="flex items-center justify-between mt-2">
              <p>Total Paid: </p>

              <p>${(el?.total_transfer / 100).toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p>Pending Payment: </p>
              <p>${(el.transfer_amount / 100).toFixed(2)}</p>
            </div>
          </>
        )}

        <div className="mt-2 text-green-400">
          <p>Mission: </p>
          <p className="ml-2 line-clamp-3 text-white">{el.mission}</p>
        </div>
      </div>
    );
  };

  const MissionRequest = ({ index, el }) => {
    return (
      <div
        className={`py-4 px-2 border-white border-t-2 border-b rounded-lg text-sm tracking-wide leading-5 hover:cursor-pointer ${
          index !== 0 ? "mt-10" : ""
        }`}
        onClick={() => {
          setOpen(true);

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

          {el?.recruiter ? (
            <Username
              username={el.recruiter}
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

      {!missions.length && !loading && (
        <div className="flex items-center justify-center mt-20">
          <p className="text-green-400">
            You currently do not have any {missionStatusOption.toLowerCase()}.
          </p>
        </div>
      )}

      {missions.length > 0 && !loading && (
        <div className="flex items-center justify-center mt-6">
          <p className="text-green-400">
            {missions[0].total_missions} {missionStatusOption.toLowerCase()}.
          </p>
        </div>
      )}

      <div className="mt-8">
        {missions?.map((el, index) => {
          if (missionStatusOption !== "Completed Missions") {
            return <MissionRequest el={el} index={index} key={el.mission_id} />;
          } else if (missionStatusOption === "Completed Missions") {
            return (
              <MissionCompletedView el={el} index={index} key={el.mission_id} />
            );
          }
        })}
      </div>
      {cursorId && (
        <button
          className="relative inline-flex items-center rounded-md bg-white  text-black mt-4 px-3 py-3  font-semibold shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
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
