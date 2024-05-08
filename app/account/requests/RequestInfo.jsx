"use client";
import useUserStore from "@/app/stores/userStore";

export default function RequestInfo({ setView, setOpen }) {
  const { selectedData } = useUserStore();
  console.log(selectedData);

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
        <p>{selectedData?.created_at}</p>
      </div>
      <div className="flex items-center justify-between mt-2">
        <p className="text-green-400">Fund: </p>
        <p>{selectedData?.funds}</p>
      </div>
      <div className="mt-2">
        <p className="text-green-400">Mission: </p>
        <p className="ml-2 line-clamp-3">
          <p>{selectedData?.mission}</p>
        </p>
      </div>
      <div className="mt-2">
        <p className="text-green-400">Message: </p>
        <p className="ml-2 line-clamp-3">
          <p>{selectedData?.mission_message}</p>
        </p>
      </div>
      <div className="mt-2">
        <p className="text-green-400">Mission Reminder: </p>
        <p className="ml-2">
          Remember to use your own common sense when deciding on which missions
          to accept. There are many good recruiter's out there, but when there
          is good... there must be bad. If a recruiter says anything negative
          towards you, just know they are a LOSER & HATER :0! ... u are the
          best! Have fun be safe &lt;3
        </p>
      </div>

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
