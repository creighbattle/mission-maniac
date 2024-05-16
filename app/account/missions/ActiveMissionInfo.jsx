"use client";
import useUserStore from "@/app/stores/userStore";
import { formatDistanceToNow, parseISO } from "date-fns";

export default function ActiveMissionInfo({ setView, setOpen }) {
  const { selectedData } = useUserStore();

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
        <h3 className="text-green-400">Mission Details</h3>
      </div>
      <div className="flex items-center justify-between mt-5">
        <p className="text-green-400">Recruiter: </p>
        <p>@{selectedData.recruiter}</p>
      </div>
      <div className="flex items-center justify-between mt-2">
        <p className="text-green-400">Recruited: </p>
        {formatDistanceToNow(parseISO(selectedData?.created_at), {
          addSuffix: true,
        })}
      </div>
      <div className="flex items-center justify-between mt-2">
        <p className="text-green-400">Funding: </p>
        <p>${selectedData?.funds}</p>
      </div>
      <div className="mt-2">
        <p className="text-green-400">Mission: </p>
        <div className="ml-2 line-clamp-3">
          <p>{selectedData?.mission}</p>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-green-400">Message: </p>
        <div className="ml-2 line-clamp-3">
          <p>{selectedData?.mission_message}</p>
        </div>
      </div>

      <div className="flex mt-5">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          onClick={() => setView(4)}
        >
          Abort
        </button>

        <button
          type="button"
          className="inline-flex w-full justify-center ml-5 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          onClick={() => setView(5)}
        >
          Complete
        </button>
      </div>
    </div>
  );
}
