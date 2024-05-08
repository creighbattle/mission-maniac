"use client";
import { useEffect, useState } from "react";
import Header from "../global-components/Header";
import Tabs from "../global-components/Tabs";
import MissionReport from "./MissionReport";
import MissionComments from "./MissionComments";
import MissionSupporters from "./MissionSupporters";
import { Amplify } from "aws-amplify";
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import useUserStore from "../stores/userStore";
import { useGetUser } from "../hooks/useGetUser";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: process.env.NEXT_PUBLIC_POOL_CLIENT_ID,
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
    },
  },
});

export default function Mission() {
  const [tab, setTab] = useState(0);
  // const { setUsername, setEmail, username } = useUserStore();
  //useGetUser();

  // useEffect(() => {
  //   getUser();
  // }, []);

  // const getUser = async () => {
  //   getCurrentUser()
  //     .then((data) => console.log(data))
  //     .catch((err) => {
  //       console.log("no user");

  //       console.log(err);
  //     });

  //   fetchUserAttributes()
  //     .then((userAttributes) => {
  //       if (!username) {
  //         setEmail(userAttributes.email);
  //         setUsername(userAttributes.preferred_username);
  //       }
  //       console.log("user attributes");
  //       console.log(userAttributes);
  //     })
  //     .catch((err) => {
  //       console.log("user attributes erros");
  //       console.log(err);
  //     });
  // };

  return (
    <>
      <Header />

      <div className="flex justify-center pb-2 bg-white pt-24 px-4">
        <div className="flex justify-between items-center  w-full max-w-7xl">
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </div>
          <div className="flex items-center">
            <img
              className="inline-block h-14 w-14 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <p className="ml-2">@pekinwoof</p>
          </div>
          <div className="text-white">fun</div>
        </div>
      </div>

      <div className="flex flex-col max-w-7xl mx-auto">
        <div className="text-white px-4 mt-4 flex flex-col justify-center tracking-wider">
          <Tabs setTab={setTab} />
        </div>
        {tab === 0 && <MissionReport />}
        {tab === 1 && <MissionComments />}
        {tab === 2 && <MissionSupporters />}

        <div className="fixed bottom-4 tracking-wider right-4">
          <button
            type="button"
            className="relative inline-flex items-center rounded-md bg-white px-3 py-3  font-semibold shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Support Mission
          </button>
        </div>
      </div>
    </>
  );
}
