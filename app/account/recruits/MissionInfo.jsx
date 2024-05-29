"use client";

import deleteMissionRequest from "@/app/api-calls/delete-mission-request";
import useNotificationStore from "@/app/stores/notificationStore";
import useUserStore from "@/app/stores/userStore";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

export default function MissionInfo({ setOpen, missionStatusOption }) {
  const { mission } = useUserStore();
  const router = useRouter();
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setNError, setShowNotification, setNTitle, setNMessage } =
    useNotificationStore();

  function capitalizeFirstLetter(string) {
    if (missionStatusOption === "Expired Recruits") {
      string = "Expired";
    }

    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="py-4 px-2  rounded-t-lg text-md text-white tracking-wide leading-7">
      {confirmCancel && (
        <>
          <div
            className="absolute text-white top-7 right-4"
            onClick={() => setOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="flex justify-center text-lg font-medium">
            <h3 className="text-green-400">Confirm Cancel</h3>
          </div>
          <div className="mt-10">
            {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
            <button
              type="button"
              className=" w-full mt-4 justify-center rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              onClick={async () => {
                await deleteMissionRequest({
                  missionId: mission.mission_id,
                  setError,
                  setLoading,
                  setNError,
                  setNMessage,
                  setNTitle,
                  setShowNotification,
                  setOpen,
                });
              }}
            >
              {!loading ? (
                "Confirm"
              ) : (
                <ClipLoader
                  color={"white"}
                  loading={loading}
                  size={25}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              )}
            </button>
          </div>
        </>
      )}
      {!confirmCancel && (
        <>
          <div
            className="absolute text-white top-7 right-4"
            onClick={() => setOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="flex justify-center text-lg font-medium">
            <h3 className="text-green-400">
              Mission {capitalizeFirstLetter(mission.mission_status)}
            </h3>
          </div>
          <div className="flex items-center justify-between mt-5">
            <p className="text-green-400">Recruited: </p>
            {formatDistanceToNow(parseISO(mission?.created_at), {
              addSuffix: true,
            })}
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-green-400">You Funded: </p>
            <p>${mission?.funds}</p>
          </div>
          <div className="mt-2">
            <p className="text-green-400">Mission: </p>
            <div className="ml-2">
              <p>{mission?.mission}</p>
            </div>
          </div>

          {mission.mission_message && (
            <div className="mt-2">
              <p className="text-green-400">Your Message: </p>
              <div className="ml-2">
                <p>{mission?.mission_message}</p>
              </div>
            </div>
          )}

          {mission.mission_status === "declined" && (
            <div className="mt-2">
              <p className="text-green-400">Decline Reason: </p>
              <div className="ml-2">
                <p>{mission?.maniac_message}</p>
              </div>
            </div>
          )}

          <div className="flex flex-col mt-5">
            {mission.mission_status !== "declined" &&
              mission.mission_status !== "pending" && (
                <button
                  type="button"
                  className=" w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                  onClick={() => router.push(`/mission/${mission.mission_id}`)}
                >
                  View Mission
                </button>
              )}

            {mission.mission_status === "pending" && (
              <button
                type="button"
                className=" w-full mt-2 justify-center rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                onClick={() => setConfirmCancel(true)}
              >
                Cancel Mission Request
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
