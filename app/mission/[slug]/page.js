"use client";
import { useEffect, useState } from "react";
import Header from "../../global-components/Header";
import Tabs from "../../global-components/Tabs";
import MissionReport from "./MissionReport";
import MissionComments from "./MissionComments";
import MissionSupporters from "./MissionSupporters";
import { Amplify } from "aws-amplify";
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import useUserStore from "../../stores/userStore";
import { useGetUser } from "../../hooks/useGetUser";
import { useParams, useRouter } from "next/navigation";
import SupportMissionModal from "./SupportMissionModal";
import Notification from "@/app/global-components/Notification";
import toggleUserSpectate from "@/app/api-calls/toggle-user-spectate";
import { ClipLoader } from "react-spinners";
import useNotificationStore from "@/app/stores/notificationStore";
import getMission from "@/app/api-calls/get-mission";
import Username from "@/app/global-components/Username";

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
  const params = useParams();
  const { mission, setMission, user, setUser } = useUserStore();
  const [missionId, setMissionId] = useState(null);
  const [open, setOpen] = useState(false);

  const [recruiter, setRecruiter] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMission();

    // setMissionId(params.slug);

    // if (missionId) {
    //   const fetchMission = async () => {
    //     const response = await fetch(`/api/missions/${missionId}`);
    //     const data = await response.json();
    //     setMission(data);
    //   };

    //   const missionData = sessionStorage.getItem(`mission_${missionId}`);
    //   const timestamp = sessionStorage.getItem(`mission_time_${missionId}`);
    //   const currentTime = Date.now();

    //   console.log(missionData);
    //   console.log(timestamp);

    //   if (
    //     missionData &&
    //     timestamp &&
    //     currentTime - parseInt(timestamp) < 60000
    //   ) {
    //     // Use the cached mission data if it's less than 1 minute old
    //     setMission(JSON.parse(missionData));
    //   } else {
    //     // Fetch mission from the server if not in sessionStorage or data is stale
    //     //fetchMission();
    //     console.log("no mission in storage, need to fetch");
    //     //setMission({ mission: "hi" });
    //     setMission(null);
    //   }
    // }
  }, [missionId]);

  const fetchMission = async () => {
    await getMission({
      missionId: params.slug,
      setMission,
      setUser,
      setError,
      setRecruiter,
    });
  };

  if (!user)
    return (
      <div>
        <p>waiting</p>
      </div>
    );

  return (
    <div className="h-svh flex flex-col">
      <Header />
      <SupportMissionModal open={open} setOpen={setOpen} />
      <Notification />

      <div className="flex flex-col items-center justify-center pb-4 bg-white pt-24 px-4 ">
        <div className="flex justify-between items-center  w-full max-w-7xl">
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

          <div>
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

          <div></div>
        </div>

        {/* <button
          onClick={async () => {
            if (!loading) {
              await toggleUserSpectate({
                profileUsername: user.username,
                setLoading,
                setNError,
                setShowNotification,
                setNTitle,
                setNMessage,
                spectating: !user.is_spectating,
                setUser,
                user,
              });
            }
          }}
          className="relative inline-flex items-center rounded-md bg-black text-white px-3 py-1  font-semibold shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {!loading ? (
            user.is_spectating ? (
              "Unspectate"
            ) : (
              "Spectate"
            )
          ) : (
            <ClipLoader
              color={"white"}
              loading={loading}
              // cssOverride={override}
              size={25}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          )}
        </button> */}
      </div>

      <div className="flex flex-col flex-1 max-w-7xl mx-auto  w-full">
        <div className="text-white px-4 mt-4 flex flex-col justify-center tracking-wider">
          <Tabs setTab={setTab} />
        </div>
        <div className={tab === 0 ? "" : "hidden"}>
          <MissionReport recruiter={recruiter} />
        </div>

        <div className={tab === 1 ? "" : "hidden"}>
          <MissionComments />
        </div>
        <div className={tab === 2 ? "" : "hidden"}>
          <MissionSupporters />
        </div>

        {mission && (
          <div className="fixed bottom-4 tracking-wider right-4">
            <button
              onClick={() => setOpen(true)}
              type="button"
              className="relative inline-flex items-center rounded-md bg-white px-3 py-3  font-semibold shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Support Mission
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
