"use client";
import refundMission from "@/app/api-calls/refund-mission";
import useUserStore from "@/app/stores/userStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

export default function SupportInfo({
  setOpen,
  missionStatusOption,
  supports,
  setSupports,
}) {
  const { mission } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  function capitalizeFirstLetter(string) {
    if (missionStatusOption === "Expired Supports") {
      string = "Expired";
    }

    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="py-4 px-2  rounded-t-lg text-md text-white tracking-wide leading-7">
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
        <p className="text-green-400">Mission Maniac: </p>
        <p>@{mission.maniac}</p>
      </div>

      <div className="flex items-center justify-between mt-2">
        <p className="text-green-400">Supported: </p>
        <p>${mission?.funded}</p>
      </div>
      <div className="mt-2">
        <p className="text-green-400">Mission: </p>
        <div className="ml-2">
          <p>{mission?.mission}</p>
        </div>
      </div>

      {error && (
        <div>
          <p className="text-[#FB87A1] mb-2 mt-2 text-center">{error}</p>
        </div>
      )}
      {mission.refunded && (
        <div>
          <p className="text-green-400 mb-2 mt-2 text-center">refunded</p>
        </div>
      )}

      <div className="flex flex-col mt-5">
        {(missionStatusOption === "Aborted Supports" ||
          missionStatusOption === "Expired Supports") &&
          !mission.refunded && (
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              onClick={async () =>
                refundMission({
                  supportId: mission.support_id,
                  setError,
                  setLoading,
                  setOpen,
                  mission,
                  supports,
                  setSupports,
                })
              }
            >
              {!loading ? (
                "Refund"
              ) : (
                <ClipLoader
                  color={"black"}
                  loading={loading}
                  size={25}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              )}
            </button>
          )}

        <button
          type="button"
          className="inline-flex w-full justify-center mt-2 rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          onClick={() => router.push(`/mission/${mission.mission_id}`)}
        >
          View Mission
        </button>
      </div>
    </div>
  );
}
