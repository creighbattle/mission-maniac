"use client";
import { useEffect, useState } from "react";
import Dropdown from "@/app/global-components/Dropdown";
import useUserStore from "@/app/stores/userStore";
import getMySupports from "@/app/api-calls/get-my-supports";
import SupportModal from "./SupportModal";
import { formatDistanceToNow, parseISO } from "date-fns";
import Username from "@/app/global-components/Username";
import { ClipLoader } from "react-spinners";

export default function Supports({ tab }) {
  const { setMission } = useUserStore();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(0);
  const [missionStatusOption, setMissionStatusOption] =
    useState("Active Supports");

  const missionStatusOptions = [
    "Active Supports",
    "Completed Supports",
    "Aborted Supports",
    "Expired Supports",
  ];
  const sortOptions = ["Oldest", "Newest"];
  const [sortOption, setSortOption] = useState("Oldest");

  const [supports, setSupports] = useState([]);
  const [cursorId, setCursorId] = useState(null);
  const [cursorSortId, setCursorSortId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadmore] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    setSupports([]);
    getMySupports({
      firstCall: true,
      missionStatusOption,
      cursorId,
      cursorSortId,
      setCursorId,
      setCursorSortId,
      supports,
      setSupports,
      sortOption,
      setError,
      setLoading,
    });
  }, [sortOption, missionStatusOption]);

  const handleButtonClick = async () => {
    setLoadmore(true);
    await getMySupports({
      firstCall: false,
      missionStatusOption,
      cursorId,
      cursorSortId,
      setCursorId,
      setCursorSortId,
      supports,
      setSupports,
      sortOption,
      setError,
      setLoading,
    });
    setLoadmore(false);
  };

  const Support = ({ index, el }) => {
    return (
      <div
        className={`py-4 px-2 border-white border-t-2 border-b rounded-lg text-sm tracking-wide leading-5 ${
          index !== 0 ? "mt-10" : ""
        }`}
        onClick={() => {
          setOpen(true);

          setView(0);

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
              recruits={el.recruits}
              supports={el.supported_missions}
            />
          ) : (
            <p className="text-[#bbf7d0]">Account Deleted</p>
          )}
        </div>
        <div className="flex items-center justify-between mt-2">
          <p>Supported: </p>
          <p>
            {formatDistanceToNow(parseISO(el.created_at), {
              addSuffix: true,
            })}
          </p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p>Mission Points Contributed: </p>
          <p>{el.funded}</p>
        </div>
        <div className="mt-2">
          <p className="text-green-400">Mission: </p>
          <p className="ml-2 line-clamp-3">{el.mission}</p>
        </div>
        {!el.refunded &&
          (missionStatusOption === "Expired Supports" ||
            missionStatusOption === "Aborted Supports") && (
            <p className="mt-2 text-green-400">Refund Available</p>
          )}
      </div>
    );
  };

  return (
    <>
      <SupportModal
        missionStatusOption={missionStatusOption}
        view={view}
        setView={setView}
        open={open}
        setOpen={setOpen}
        supports={supports}
        setSupports={setSupports}
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

      {supports.length > 0 && !loading && (
        <div className="flex items-center justify-center mt-6">
          <p className="text-green-400">
            {supports[0].total_supports} {missionStatusOption.toLowerCase()}.
          </p>
        </div>
      )}

      {!supports.length && !loading && (
        <div className="flex items-center justify-center mt-20">
          <p className="text-green-400">
            You currently do not have any {missionStatusOption.toLowerCase()}.
          </p>
        </div>
      )}

      <div className="mt-8">
        {supports?.map((el, index) => (
          <Support el={el} index={index} key={index} />
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
