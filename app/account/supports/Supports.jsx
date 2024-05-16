"use client";
import { useEffect, useState } from "react";
import Dropdown from "@/app/global-components/Dropdown";
import useUserStore from "@/app/stores/userStore";
import getMySupports from "@/app/api-calls/get-my-supports";
import SupportModal from "./SupportModal";
import { formatDistanceToNow, parseISO } from "date-fns";
import Username from "@/app/global-components/Username";

export default function Supports({ tab }) {
  const { setMission, user } = useUserStore();
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
  const [sortOption, setSortOption] = useState("Oldest");
  const [sortOptions, setSortOptions] = useState([
    "Oldest",
    "Newest",
    "Likes",
    "Funding",
  ]);

  const [supports, setSupports] = useState([]);
  const [cursorId, setCursorId] = useState(null);
  const [cursorSortId, setCursorSortId] = useState(null);

  const [error, setError] = useState("");

  useEffect(() => {
    // if (tab === 4) {
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
    });
    //}
  }, [sortOption, missionStatusOption]);

  useEffect(() => {
    //fetchMissionRequests();
  }, [sortOption, missionStatusOption]);

  const handleButtonClick = async () => {};

  const Support = ({ index, el }) => {
    return (
      <div
        className={`py-4 px-2 border-white border-t-2 border-b rounded-lg text-sm tracking-wide leading-5 ${
          index !== 0 ? "mt-10" : ""
        }`}
        onClick={() => {
          console.log(el);
          setOpen(true);
          console.log(el);
          setView(0);

          setMission(el);
        }}
      >
        <div className="flex items-center justify-between">
          <p>Mission Maniac: </p>
          <p>@{el.maniac}</p>
          {/* <Username
            username={user.username}
            textColor={"#bbf7d0"}
            outlineColor={"white"}
            completedMissions={user.completed_missions}
            recruits={user.recruits}
            supports={user.supported_missions}
          /> */}
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
          <p>Amount: </p>
          <p>${el.funded}</p>
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

      {!supports.length && (
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
      {cursorId && <button onClick={handleButtonClick}>Load More fam</button>}
    </>
  );
}
