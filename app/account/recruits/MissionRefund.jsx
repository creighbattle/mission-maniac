"use client";

import useUserStore from "@/app/stores/userStore";

export default function MissionInfo({ setOpen }) {
  const { mission } = useUserStore();

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
        <h3 className="text-green-400">Mission Expired</h3>
      </div>
      <div className="flex items-center justify-between mt-5">
        <p className="text-green-400">Recruiter: </p>
        <p>@{mission.recruiter}</p>
      </div>
      <div className="flex items-center justify-between mt-2">
        <p className="text-green-400">Recruited: </p>
        <p>{mission?.created_at}</p>
      </div>
      <div className="flex items-center justify-between mt-2">
        <p className="text-green-400">Fund: </p>
        <p>{mission?.funds}</p>
      </div>
      <div className="mt-2">
        <p className="text-green-400">Mission: </p>
        <div className="ml-2">
          <p>{mission?.mission}</p>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-green-400">Message: </p>
        <div className="ml-2">
          <p>{mission?.mission_message}</p>
        </div>
      </div>
    </div>
  );
}
