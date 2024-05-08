"use client";
import { Dialog } from "@headlessui/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import useInfoStore from "../stores/infoStore";
import MoreInfo from "../global-components/MoreInfo";
// import Dropdown from "../global-components/Dropdown";
import useUserStore from "../stores/userStore";

export default function CreateMissionForm({
  setView,
  funds,
  setFunds,
  expire,
  setExpire,
  mission,
  setMission,
  message,
  setMessage,
}) {
  const {
    infoMessage,
    title,
    showInfo,
    setShowInfo,
    setTitle,
    setInfoMessage,
  } = useInfoStore();
  const { user } = useUserStore();

  const handleInfo = (t) => {
    switch (t) {
      case "fund":
        setTitle("Fund");
        setMessage(
          "Funding is a way for you to help @pekinwoof complete the mission."
        );
        break;
      case "mission":
        break;
      case "message":
        break;
    }

    setShowInfo(true);
  };

  return (
    <>
      <MoreInfo
        message={infoMessage}
        title={title}
        showInfo={showInfo}
        setShowInfo={setShowInfo}
      />
      <div>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-3xl font-bold">
          M
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-white"
          >
            Create Mission
          </Dialog.Title>
        </div>
      </div>

      <form>
        <div className="space-y-0">
          <div className="">
            <p className="mt-4 text-sm leading-6 text-gray-100 text-center">
              Recruit @{user.username} for a mission.
            </p>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-green-400"
                >
                  Fund
                </label>
                <InformationCircleIcon
                  className="h-5 w-5 text-green-400"
                  aria-hidden="true"
                  onClick={() => handleInfo("fund")}
                />
              </div>

              <div className="mt-2 w-full">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md outline-none  text-white">
                  <span className="flex select-none items-center pl-3 text-white-500 sm:text-sm">
                    $
                  </span>
                  <input
                    onChange={(e) => setFunds(e.target.value)}
                    type="tel"
                    inputMode="decimal"
                    name="fund"
                    id="fund"
                    autoComplete="off"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none"
                  />
                </div>
              </div>

              {/* <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium leading-6 text-green-400"
                  >
                    Expire
                  </label>
                  <InformationCircleIcon
                    className="h-5 w-5 text-green-400"
                    aria-hidden="true"
                    onClick={() => handleInfo("message")}
                  />
                </div>
                <Dropdown expire={expire} setExpire={setExpire} />
              </div> */}

              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="mission"
                    className="block text-sm font-medium leading-6 text-green-400"
                  >
                    Mission
                  </label>
                  <InformationCircleIcon
                    className="h-5 w-5 text-green-400"
                    aria-hidden="true"
                    onClick={() => handleInfo("mission")}
                  />
                </div>
                <div className="mt-2">
                  <textarea
                    onChange={(e) => setMission(e.target.value)}
                    id="mission"
                    name="mission"
                    autoComplete="off"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 px-2 bg-[#141414] text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-400 sm:text-sm sm:leading-6 outline-none"
                    defaultValue={""}
                  />
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium leading-6 text-green-400"
                  >
                    Message
                  </label>
                  <InformationCircleIcon
                    className="h-5 w-5 text-green-400"
                    aria-hidden="true"
                    onClick={() => handleInfo("message")}
                  />
                </div>
                <div className="mt-2">
                  <textarea
                    onChange={(e) => setMessage(e.target.value)}
                    id="message"
                    name="message"
                    autoComplete="off"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 px-2 bg-[#141414] text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-400 sm:text-sm sm:leading-6 outline-none"
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className="mt-5 sm:mt-6">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          onClick={() => setView(1)}
        >
          Continue
        </button>
      </div>
    </>
  );
}
