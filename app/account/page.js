"use client";
import { useState } from "react";
import Header from "../global-components/Header";
import AccountTabs from "./AccountTabs";
import AccountStats from "./AccountStats";
import useUserStore from "../stores/userStore";
import ManiacNewbie from "./maniac/ManiacNewbie";
import { useGetUserAccount } from "../hooks/useGetUser";
import ClipLoader from "react-spinners/ClipLoader";
import Requests from "./missions/Missions";
import Recruits from "./recruits/Recruits";
import Supports from "./supports/Supports";
import Spectate from "./spectate/Spectate";
import Settings from "./settings/Settings";
import Username from "../global-components/Username";

export default function Account() {
  useGetUserAccount();
  const [tab, setTab] = useState(0);
  const { loading, user } = useUserStore();

  if (!user) {
    return (
      <div className="h-svh w-svw flex flex-col items-center justify-center">
        <ClipLoader
          color={"#4ade80"}
          loading={loading}
          // cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="flex justify-center pb-2 bg-white pt-24 px-4">
        <div className="flex justify-between items-center  w-full max-w-7xl">
          <div className="text-white">yo trev</div>
          <div className="flex flex-col justify-center items-center">
            {/* <img
              className="inline-block h-14 w-14 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            /> */}
            {/* <p className="ml-2">@{user.username}</p> */}
            <Username
              username={user.username}
              textColor={"black"}
              outlineColor={"black"}
              completedMissions={user.completed_missions}
              recruits={user.recruits}
              supports={user.supported_missions}
            />
            <div className="flex items-center justify-center">
              <img
                className="h-5 w-5 rounded-full"
                src="/binoculars.png"
                alt=""
              />
              <p className="ml-2">{user.spectators}</p>
            </div>
          </div>
          <div className="text-white">yo dan</div>
        </div>
      </div>
      <div className="flex flex-col max-w-7xl mx-auto">
        <div className="text-white px-4 mt-4 flex flex-col justify-center tracking-wider">
          <AccountTabs setTab={setTab} />
          <div className={tab === 0 ? "" : "hidden"}>
            <AccountStats tab={tab} />
          </div>
          <div className={tab === 1 ? "" : "hidden"}>
            <ManiacNewbie tab={tab} />
          </div>
          <div className={tab === 2 ? "" : "hidden"}>
            <Requests tab={tab} />
          </div>
          <div className={tab === 3 ? "" : "hidden"}>
            <Recruits tab={tab} />
          </div>
          <div className={tab === 4 ? "" : "hidden"}>
            <Supports tab={tab} />
          </div>
          <div className={tab === 5 ? "" : "hidden"}>
            <Spectate tab={tab} />
          </div>
          <div className={tab === 6 ? "" : "hidden"}>
            <Settings tab={tab} />
          </div>
          {/* {tab === 0 && <AccountStats />}
          {tab === 1 && <ManiacNewbie />}
          {tab === 2 && <Requests />} */}
        </div>
      </div>
    </>
  );
}
