"use client";
import { useState, useEffect } from "react";
import CreateMissionModal from "./CreateMissionModal";
import useUserStore from "../stores/userStore";
import Dropdown from "../global-components/Dropdown";

const Mission = ({ el, index }) => {
  return (
    <li
      key={index}
      className={`flex-col py-5 bg-gray-0900 px-2  rounded-lg border-t border-green-400 ${
        index !== 0 ? "mt-8" : "mt-8"
      }`}
      onClick={() => {
        console.log("single");
      }}
      onDoubleClick={() => {
        console.log("double");
        alert("hi");
      }}
    >
      {/* <img
      className="h-12 w-12 flex-none rounded-full bg-gray-50"
      src={comment.imageUrl}
      alt=""
    /> */}
      <div className="flex-auto">
        <div className="flex items-baseline justify-between gap-x-4">
          <p className="text-sm font-semibold leading-6 text-white">
            @{el.recruiter}
          </p>
          <p className="flex-none text-xs text-green-400">
            <time dateTime={el?.createdAt}>{el?.createdAt}</time>
          </p>
        </div>
        <p className="mt-1 text-sm leading-6 text-white line-clamp-3 tracking-wide">
          {el.mission}
        </p>
      </div>

      <div className="flex items-center justify-between mt-2 text-sm">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
          <p className="text-white ml-[0.35rem]">{el.mission_likes}</p>
        </div>

        <div className="text-white  ml-2 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>
          <p className="text-white ml-[0.35rem]">{el.mission_comments}</p>
        </div>
      </div>
      <div className="flex items-center mt-2 text-sm">
        <div className="text-white flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="white"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
            />
          </svg>

          <p className="text-white ml-[0.35rem]">${el.funds}</p>
        </div>
        <div className="flex-1 h-5 bg-gray-800 ml-2 rounded-lg">
          <div className="w-10 h-5 bg-green-400 absolute rounded-lg"></div>
        </div>

        <div className="text-white  ml-2 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="white"
            className="w-4 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"
            />
          </svg>

          <p className="text-white ml-[0.35rem]">${el.funding_goal}</p>
        </div>
      </div>
    </li>
  );
};

export default function MissionFeed() {
  const [isVisible, setIsVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const { missions, setData, data, cursor, setCursor } = useUserStore();
  const [missionStatusOption, setMissionStatusOption] =
    useState("Active Missions");
  const [missionStatusOptions, setMissionStatusOptions] = useState([
    "Active Missions",
    "Completed Missions",
    "Declined Missions",
  ]);
  const [sortOption, setSortOption] = useState("Likes");
  const [sortOptions, setSortOptions] = useState([
    "Likes",
    "Funding",
    "Newest",
  ]);

  useEffect(() => {
    fetchUserMissions();
  }, [sortOption, missionStatusOption]);

  const fetchUserMissions = async () => {
    let sortBy = "created_at";
    sortBy = "mission_likes";
    let order = "DESC";
    let missionStatus = "active";

    switch (sortOption) {
      case "Newest":
        order = "ASC";
        break;
      case "Funding":
        sortBy = "funds";
        break;
      case "Likes":
        sortBy = "mission_likes";
        break;
      default:
        break;
    }

    switch (missionStatusOption) {
      case "Active Missions":
        missionStatus = "active";
        break;
      case "Completed Missions":
        missionStatus = "completed";
        break;
      case "Expired Missions":
        missionStatus = "expired";
      case "Declined Missions":
        missionStatus = "declined";
      default:
        break;
    }

    const url = new URL("http://10.0.0.222:3005/api/get-user-missions");
    url.searchParams.append("username", "creighbattle");
    url.searchParams.append("sortBy", sortBy);
    url.searchParams.append("missionStatus", missionStatus);
    url.searchParams.append("order", order);

    const response = await fetch(url);

    const { data, nextCursor } = await response.json();

    console.log(data);
    setData(data);
    setCursor(nextCursor);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500); // Delay in milliseconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  if (!isVisible) {
    return null; // Or return a loading indicator if you prefer
  }

  return (
    <div className="px-4 py-5 sm:px-6 animate-fade-in max-w-7xl mx-auto w-full">
      {/* <div className="flex items-center justify-between">
        <p className="text-white text-md font-semibold">Active Missions</p>
        <label htmlFor="" className="text-white text-md font-semibold">
          Sort By:
          <select
            name=""
            id=""
            className="bg-white text-black ml-2 text-sm font-normal outline-none rounded-lg"
          >
            <option value="">Default</option>
            <option value="">Newest</option>
            <option value="">Likes</option>
          </select>
        </label>
      </div> */}
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
        {data?.map((el, index) => (
          <Mission el={el} index={index} />
        ))}
      </ul>

      <div className="fixed bottom-4 mx-auto tracking-wider w-fit">
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
