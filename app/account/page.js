"use client";
import { useState } from "react";
import Header from "../global-components/Header";
import AccountTabs from "./AccountTabs";
import AccountStats from "./AccountStats";
import useUserStore from "../stores/userStore";
import ManiacNewbie from "./maniac/ManiacNewbie";
import { useGetUserAccount } from "../hooks/useGetUser";
import ClipLoader from "react-spinners/ClipLoader";
import Requests from "./requests/Requests";
import Recruits from "./recruits/Recruits";

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
          <div className="flex items-center">
            <img
              className="inline-block h-14 w-14 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <p className="ml-2">@{user.username}</p>
          </div>
          <div className="text-white">yo dan</div>
        </div>
      </div>
      <div className="flex flex-col max-w-7xl mx-auto">
        <div className="text-white px-4 mt-4 flex flex-col justify-center tracking-wider">
          <AccountTabs setTab={setTab} />
          <div className={tab === 0 ? "" : "hidden"}>
            <AccountStats />
          </div>
          <div className={tab === 1 ? "" : "hidden"}>
            <ManiacNewbie />
          </div>
          <div className={tab === 2 ? "" : "hidden"}>
            <Requests />
          </div>
          <div className={tab === 3 ? "" : "hidden"}>
            <Recruits />
          </div>
          {/* {tab === 0 && <AccountStats />}
          {tab === 1 && <ManiacNewbie />}
          {tab === 2 && <Requests />} */}
        </div>
      </div>
    </>
  );
}
