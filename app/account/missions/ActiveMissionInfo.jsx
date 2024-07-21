"use client";
import Username from "@/app/global-components/Username";
import useUserStore from "@/app/stores/userStore";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useRouter } from "next/navigation";

export default function ActiveMissionInfo({ setView, setOpen }) {
  const { selectedData } = useUserStore();
  const router = useRouter();

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
        {selectedData?.recruiter ? (
          <Username
            username={selectedData.recruiter}
            textColor={"#bbf7d0"}
            outlineColor={"white"}
            completedMissions={selectedData.completed_missions}
            recruits={selectedData.completed_recruits}
            supports={selectedData.completed_supports}
          />
        ) : (
          <p className="text-[#bbf7d0]">Account Deleted</p>
        )}
      </div>
      <div className="flex items-center justify-between mt-2">
        <p className="text-green-400">Recruited: </p>
        {formatDistanceToNow(parseISO(selectedData?.created_at), {
          addSuffix: true,
        })}
      </div>
      <div className="flex items-center justify-between mt-2">
        <p className="text-green-400">Mission Points: </p>
        <p>{selectedData?.funds}</p>
      </div>
      <div className="mt-2">
        <p className="text-green-400">Mission: </p>
        <div className="ml-2">
          <p>{selectedData?.mission}</p>
        </div>
      </div>
      {selectedData?.mission_message && (
        <div className="mt-2">
          <p className="text-green-400">Recruiter Message: </p>
          <div className="ml-2">
            <p>{selectedData?.mission_message}</p>
          </div>
        </div>
      )}

      <div className="mt-5">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          onClick={() => setView(4)}
        >
          Abort
        </button>
        <button
          type="button"
          className="inline-flex w-full mt-2 justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          onClick={() => setView(7)}
        >
          Update Message
        </button>

        <button
          type="button"
          className="inline-flex w-full mt-2 justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          onClick={() => router.push(`/mission/${selectedData.mission_id}`)}
        >
          View Mission
        </button>

        <button
          type="button"
          className="inline-flex w-full justify-center mt-2 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          onClick={() => setView(5)}
        >
          Complete
        </button>
      </div>
    </div>
  );
}
