"use client";
import Username from "@/app/global-components/Username";
import useUserStore from "@/app/stores/userStore";
import { formatDistanceToNow, parseISO } from "date-fns";

export default function MissionSummary({ setView, setOpen }) {
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
        <h3 className="text-green-400">
          Mission {selectedData.mission_status}
        </h3>
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
        {formatDistanceToNow(parseISO(selectedData.created_at), {
          addSuffix: true,
        })}
      </div>
      <div className="flex items-center justify-between mt-2">
        <p className="text-green-400">Mission Points: </p>
        <p>{selectedData?.funds}</p>
      </div>
      {selectedData?.funding_goal && (
        <div className="flex items-center justify-between mt-2">
          <p className="text-green-400">Funding Goal: </p>
          <p>{selectedData?.funding_goal}</p>
        </div>
      )}
      <div className="mt-2">
        <p className="text-green-400">Mission: </p>
        <div className="ml-2">
          <p>{selectedData?.mission}</p>
        </div>
      </div>
      {selectedData.mission_message && (
        <div className="mt-2">
          <p className="text-green-400">Recruiter Message: </p>
          <div className="ml-2">
            <p>{selectedData?.mission_message}</p>
          </div>
        </div>
      )}

      {selectedData?.maniac_message && (
        <div className="mt-2">
          <p className="text-green-400">
            {selectedData.mission_status === "aborted"
              ? "Abort Reason:"
              : selectedData.mission_status === "declined"
              ? "Decline Reason:"
              : "Your Message:"}
          </p>
          <div className="ml-2">
            <p>{selectedData?.maniac_message}</p>
          </div>
        </div>
      )}

      {selectedData.mission_status === "completed" && (
        <>
          <div className="mt-2">
            <p className="text-green-400">Mission Completed: </p>
            <div className="ml-2">
              {formatDistanceToNow(
                parseISO(selectedData?.mission_completed_at),
                {
                  addSuffix: true,
                }
              )}
            </div>
          </div>

          {selectedData?.transfer_amount && (
            <>
              <div className="mt-2">
                <p className="text-green-400">Total Mission Points Paid: </p>
                <div className="ml-2">
                  <p>{selectedData?.total_transfer}</p>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-green-400">Points Pending Payout: </p>
                <div className="ml-2">
                  <p>{selectedData?.transfer_amount}</p>
                </div>
              </div>
            </>
          )}
        </>
      )}

      <div className="flex mt-5">
        {(selectedData.mission_status === "aborted" ||
          selectedData.mission_status === "completed" ||
          selectedData.mission_status === "expired") && (
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            View Mission
          </button>
        )}

        <button
          type="button"
          className="inline-flex w-full justify-center ml-5 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          onClick={() => setView(7)}
        >
          Update Files
        </button>
      </div>
    </div>
  );
}
