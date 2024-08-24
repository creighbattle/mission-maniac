"use client";
import InfoLabel from "@/app/global-components/InfoLabel";
import Username from "@/app/global-components/Username";
import useUserStore from "@/app/stores/userStore";
import { formatDistanceToNow, parseISO } from "date-fns";

export default function RequestInfo({ setView, setOpen }) {
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
        <InfoLabel
          label={"Recruiter"}
          title={"Recruiter"}
          message={"The Recruiter who requested the mission."}
        />

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
        <InfoLabel
          label={"Recruited"}
          title={"Recruited"}
          message={
            "How long ago you were recruited for this mission. You will have between 5-7 days to accept or decline a mission before it auto deletes itself."
          }
        />
        {formatDistanceToNow(parseISO(selectedData?.created_at), {
          addSuffix: true,
        })}
      </div>
      <div className="flex items-center justify-between mt-2">
        <InfoLabel
          label={"Mission Points"}
          title={"Mission Points"}
          message={
            "The amount the Recruiter initially funded the mission with. If you are to accept, you can set a funding goal which Supporters can then help reach."
          }
        />
        <p>{selectedData?.funds}</p>
      </div>
      <div className="flex items-center justify-between mt-2">
        <InfoLabel
          label={"Expires"}
          title={"Expires"}
          message={`This is the time you have to complete the mission or reach the funding goal after accepting it. 
            If the funding goal is reached, the expiration date will reset. 
            For example, if the recruiter sets an expiration time of 14 days and the funding goal is met on the 7th day, 
            the new expiration date will be 14 days from when the goal was reached.`}
        />

        <p>{selectedData?.expire}</p>
      </div>
      <div className="mt-2">
        <InfoLabel
          label={"Mission"}
          title={"Mission"}
          message={`This is the actual request the Recruiter wants you to complete.`}
        />
        <div className="ml-2">
          <p>{selectedData?.mission}</p>
        </div>
      </div>
      {selectedData?.mission_message && (
        <div className="mt-2">
          <InfoLabel
            label={"Message"}
            title={"Message"}
            message={`This is a message from the Recruiter unrelated to the Mission. This message is private.`}
          />
          <div className="ml-2">
            <p>{selectedData?.mission_message}</p>
          </div>
        </div>
      )}

      {/* <div className="mt-2">
        <InfoLabel
          label={"Mission Reminder"}
          title={"Mission Reminder"}
          message={`This is just a friendly reminder to not accept missions that may cause harm to yourself or others.`}
        />
        <p className="ml-2">
          Remember to use your own common sense when deciding on which missions
          to accept. There are many good recruiter&apos;s out there, but when
          there is good... there must be bad. Have fun be safe.
        </p>
      </div> */}

      <div className="flex mt-5">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          onClick={() => setView(1)}
        >
          Decline
        </button>

        <button
          type="button"
          className="inline-flex w-full justify-center ml-5 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          onClick={() => setView(2)}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
