"use client";
import { useEffect, useState } from "react";
import { fetchAuthSession } from "aws-amplify/auth";
import Dropdown from "@/app/global-components/Dropdown";

const MissionRecruit = ({ handleClick, index }) => {
  return (
    <div
      className={`py-4 px-2 border-green-400 border-t rounded-t-lg text-sm tracking-wide leading-5 ${
        index !== 0 ? "mt-10" : ""
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between">
        <p>Recruiter: </p>
        <p>@creighbattle</p>
      </div>
      <div className="flex items-center justify-between mt-2">
        <p>Recruited: </p>
        <p>2 days ago</p>
      </div>
      <div className="flex items-center justify-between mt-2">
        <p>Fund: </p>
        <p>$10</p>
      </div>
      <div className="mt-2">
        <p>Mission: </p>
        <p className="ml-2 line-clamp-3">
          Win a game while only building one item in high elo.
        </p>
      </div>
    </div>
  );
};

export default function Recruits() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(0);
  const [missionStatusOption, setMissionStatusOption] =
    useState("Active Recruits");
  const [missionStatusOptions, setMissionStatusOptions] = useState([
    "Active Recruits",
    "Completed Recruits",
    "Declined Recruits",
  ]);
  const [sortOption, setSortOption] = useState("Oldest");
  const [sortOptions, setSortOptions] = useState([
    "Oldest",
    "Newest",
    "Likes",
    "Funding",
  ]);

  useEffect(() => {
    //fetchMissionRequests();
  }, []);

  useEffect(() => {
    fetchMissionRequests();
  }, [sortOption, missionStatusOption]);

  const fetchMissionRequests = async () => {
    let sortBy = "created_at";
    let order = "DESC";
    let missionStatus = "pending";

    console.log(sortOption);

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

    console.log(sortBy, order, missionStatus);

    let jwt;

    try {
      const authSession = await fetchAuthSession();
      jwt = authSession.tokens.accessToken.toString();
    } catch (error) {
      console.log(error);
      return new Error("Error fetching auth session");
    }

    const url = new URL("http://10.0.0.222:3005/api/get-my-data");
    url.searchParams.append("type", "recruiter");
    url.searchParams.append("sort_by", sortBy);
    url.searchParams.append("mission_status", missionStatus);
    url.searchParams.append("order", order);

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      const obj = await response.json();

      console.log("mission requests");
      console.log(obj);
    } catch (error) {
      console.error("error here");
      console.error(error);
    }
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

      <div className="mt-8">
        <MissionRecruit
          index={0}
          handleClick={() => {
            setView(0);
            setOpen(true);
          }}
        />
        <MissionRecruit handleClick={() => setOpen(true)} />
        <MissionRecruit handleClick={() => setOpen(true)} />
        <MissionRecruit handleClick={() => setOpen(true)} />
      </div>
    </>
  );
}
