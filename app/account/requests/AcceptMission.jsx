import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

export default function AcceptMission({
  setView,
  setOpen,
  fundingGoal,
  setFundingGoal,
  matureContent,
  setMatureContent,
}) {
  const [loading, setLoading] = useState();

  const handleAccept = async () => {
    setLoading(true);
  };

  return (
    <div>
      <div className="absolute text-white top-7" onClick={() => setView(0)}>
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
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
      </div>
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
      <div>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-3xl font-bold">
          M
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-white"
          >
            Accept Mission
          </Dialog.Title>
        </div>
      </div>

      <div className="">
        <label
          htmlFor="username"
          className="block text-sm font-medium leading-6 text-green-400"
        >
          Funding Goal
        </label>
        <div className="mt-2 w-full">
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md outline-none  text-white">
            <span className="flex select-none items-center pl-3 text-white-500 sm:text-sm">
              $
            </span>
            <input
              onChange={(e) => setFundingGoal(e.target.value)}
              type="tel"
              inputMode="decimal"
              name="username"
              id="username"
              autoComplete="off"
              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none"
            />
          </div>
        </div>
      </div>
      <div className="col-span-full mt-5 flex items-center justify-between">
        <label
          htmlFor="mission"
          className="block text-sm font-medium leading-6 text-green-400"
        >
          Mature Content
        </label>
        <input
          onChange={() => setMatureContent(!matureContent)}
          id="remember-me"
          name="remember-me"
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 focus:ring-green-600 accent-green-400"
        />
      </div>
      <div className="mt-5 sm:mt-6">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          onClick={() => setView(1)}
        >
          {!loading ? (
            "Accept"
          ) : (
            <ClipLoader
              color={"black"}
              loading={loading}
              // cssOverride={override}
              size={25}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          )}
          {/* Accept */}
        </button>
      </div>
    </div>
  );
}
