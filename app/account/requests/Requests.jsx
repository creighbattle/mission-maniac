"use client";
import { useEffect, useState } from "react";
import RequestModal from "./RequestModal";
import { fetchAuthSession } from "aws-amplify/auth";
import Dropdown from "@/app/global-components/Dropdown";
import useUserStore from "@/app/stores/userStore";

export default function Requests() {
  const { setData, data, cursor, setCursor, setSelectedData } = useUserStore();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(0);
  const [missionStatusOption, setMissionStatusOption] =
    useState("Mission Requests");
  const [missionStatusOptions, setMissionStatusOptions] = useState([
    "Mission Requests",
    "Active Missions",
    "Completed Missions",
    "Declined Missions",
  ]);
  const [sortOption, setSortOption] = useState("Oldest");
  const [sortOptions, setSortOptions] = useState([
    "Oldest",
    "Newest",
    "Funding",
  ]);

  useEffect(() => {
    fetchMissionRequests();
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

    const url = new URL("http://10.0.0.222:3005/api/get-my-missions");
    // url.searchParams.append("type", "maniac");
    url.searchParams.append("sortBy", sortBy);
    url.searchParams.append("missionStatus", missionStatus);
    url.searchParams.append("order", order);

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    const { data, cursor } = await response.json();

    console.log(data);
    setData(data);
    setCursor(cursor);
  };

  const MissionRequest = ({ index, el }) => {
    return (
      <div
        key={index}
        className={`py-4 px-2 border-green-400 border-t rounded-t-lg text-sm tracking-wide leading-5 ${
          index !== 0 ? "mt-10" : ""
        }`}
        onClick={() => {
          setOpen(true);
          setView(0);
          setSelectedData(el);
        }}
      >
        <div className="flex items-center justify-between">
          <p>Recruiter: </p>
          <p>@{el.recruiter}</p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p>Recruited: </p>
          <p>2 days ago</p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p>Fund: </p>
          <p>${el.funds}</p>
        </div>
        <div className="mt-2">
          <p>Mission: </p>
          <p className="ml-2 line-clamp-3">{el.mission}</p>
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

      <div className="mt-8">
        {data?.map((el, index) => (
          <MissionRequest
            el={el}
            index={index}
            handleClick={async () => {
              // let jwt;
              // try {
              //   const authSession = await fetchAuthSession();
              //   jwt = authSession.tokens.accessToken.toString();
              // } catch (error) {
              //   console.log(error);
              //   return new Error("Error fetching auth session");
              // }
              // await fetch("http://10.0.0.222:3005/api/accept-mission", {
              //   method: "POST",
              //   mode: "cors",
              //   cache: "no-cache",
              //   headers: {
              //     "Content-Type": "application/json",
              //     Authorization: `Bearer ${jwt}`,
              //   },
              //   body: JSON.stringify({ missionId: el.mission_id }),
              // });
            }}
          />
        ))}
      </div>
      <RequestModal
        open={open}
        setOpen={setOpen}
        view={view}
        setView={setView}
      />
    </>
  );
}
