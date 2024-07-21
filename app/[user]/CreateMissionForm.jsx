"use client";
import { Dialog } from "@headlessui/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import useInfoStore from "../stores/infoStore";
import MoreInfo from "../global-components/MoreInfo";
import Dropdown from "../global-components/Dropdown";
import useUserStore from "../stores/userStore";
import { useState } from "react";
import { fetchAuthSession } from "aws-amplify/auth";
import { ClipLoader } from "react-spinners";
import useNotificationStore from "../stores/notificationStore";

const MAX_MESSAGE_LENGTH = 500;
const MAX_MISSION_LENGTH = 500;

export default function CreateMissionForm({
  setExpire,
  mission,
  message,
  expire,
  setMission,
  setMessage,
  setOpen,
}) {
  const {
    infoMessage,
    title,
    showInfo,
    setShowInfo,
    setTitle,
    setInfoMessage,
  } = useInfoStore();
  const { user, setAmount, amount } = useUserStore();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [missionLength, setMissionLength] = useState(0);
  const [messageLength, setMessageLength] = useState(0);
  const { setShowNotification, setNTitle, setNMessage, setNError } =
    useNotificationStore();

  const options = [
    "Never",
    "14 Days",
    "30 Days",
    "60 Days",
    "100 Days",
    "200 Days",
    "365 Days",
  ];

  const handleInfo = (t) => {
    switch (t) {
      case "fund":
        setTitle("Fund");
        setInfoMessage(
          "Funding is a way to help reward the Mission Maniac for completing your mission. If the mission is declined you will receive a full refund."
        );
        break;
      case "expire":
        setTitle("Expire");
        setInfoMessage(`When a mission is accepted, the Mission Maniac will have a set amount of time to complete it. If they don't finish the mission within this timeframe, you'll get a 95% refund minus 30 cents.
        If the Mission Maniac sets a funding goal, the time you set here will be reapplied once the goal is reached. For example, if you fund $5 and set a 14-day limit, but the Maniac sets a $10 funding goal, the mission
        has 14 days to get fully funded. If it reaches the goal on the 7th day, the countdown will restart, giving them another 14 days to complete the mission.`);
        break;
      case "mission":
        setTitle("Mission");
        setInfoMessage(
          `This is what you want the Mission Maniac to actually do. Be as specific as possible so there is no confusion.`
        );
        break;
      case "message":
        setTitle("Message");
        setInfoMessage(`This is a private message to the Mission Maniac.`);
        break;
    }

    setShowInfo(true);
  };

  const handleSubmit = async (event) => {
    setLoading(true);

    event.preventDefault();
    setErrorMessage("");

    let jwt;

    try {
      const authSession = await fetchAuthSession();
      jwt = authSession.tokens.idToken.toString();
    } catch (error) {
      return new Error("Error fetching auth session");
    }

    // Fetch to create and confirm the PaymentIntent from your server
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_WRITE_CREATE_MISSION_REQUEST,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({
            amount,
            mission,
            expire,
            message,
            maniac: user.username,
          }),
        }
      );

      // const result = await res.json();

      if (!res.ok) {
        const result = await res.json();

        //setErrorMessage(result.message);
        throw new Error(result.message);
      } else {
        // notification

        setOpen(false);
        setNError(false);
        setNTitle("Mission Request Created");
        setNMessage(
          `Your mission was successfully created. You can keep an eye on the status of the request in your account page under Recruits.`
        );
        setShowNotification(true);
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMissionChange = (text) => {
    const newMessage = text;
    if (newMessage.length <= MAX_MISSION_LENGTH) {
      setMission(newMessage);
      setMissionLength(newMessage.length);
    }
  };

  const handleMessageChange = (text) => {
    const newMessage = text;
    if (newMessage.length <= MAX_MESSAGE_LENGTH) {
      setMessage(newMessage);
      setMessageLength(newMessage.length);
    }
  };

  return (
    <>
      <MoreInfo
        message={infoMessage}
        title={title}
        showInfo={showInfo}
        setShowInfo={setShowInfo}
      />
      <div
        className="absolute text-white top-7 right-4 hover:cursor-pointer"
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
            Create Mission
          </Dialog.Title>
        </div>
      </div>

      <form>
        <div className="space-y-0">
          <div className="">
            <p className="mt-4 text-sm leading-6 text-gray-100 text-center">
              {/* Recruit <span className="text-green-400">@{user.username}</span>{" "}
              for a mission. Minimum funding needed to create a mission is $
              {user.min_fund}. */}
              Minimum mission points required: {user.min_fund}.
            </p>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-green-400"
                >
                  Add Mission Points
                </label>
                <InformationCircleIcon
                  className="h-5 w-5 text-green-400 hover:cursor-pointer"
                  aria-hidden="true"
                  onClick={() => handleInfo("fund")}
                />
              </div>

              <div className="mt-2 w-full">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md outline-none  text-white">
                  <span className="flex select-none items-center pl-2 text-white-500 sm:text-sm"></span>
                  <input
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        setAmount(value);
                      }
                    }}
                    value={amount}
                    type="tel"
                    inputMode="decimal"
                    name="fund"
                    id="fund"
                    autoComplete="off"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none"
                  />
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="expire"
                    className="block text-sm font-medium leading-6 text-green-400"
                  >
                    Expire
                  </label>
                  <InformationCircleIcon
                    className="h-5 w-5 text-green-400 hover:cursor-pointer"
                    aria-hidden="true"
                    onClick={() => handleInfo("expire")}
                  />
                </div>
                <Dropdown
                  option={expire}
                  setOption={setExpire}
                  options={options}
                  createMission={true}
                  right={true}
                />
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="mission"
                    className="block text-sm font-medium leading-6 text-green-400"
                  >
                    Mission
                  </label>
                  <InformationCircleIcon
                    className="h-5 w-5 text-green-400 hover:cursor-pointer"
                    aria-hidden="true"
                    onClick={() => handleInfo("mission")}
                  />
                </div>
                <div className="mt-2">
                  <textarea
                    onChange={(e) => handleMissionChange(e.target.value)}
                    value={mission}
                    id="mission"
                    name="mission"
                    autoComplete="off"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 px-2 bg-[#141414] text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-400 sm:text-sm sm:leading-6 outline-none"
                  />
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  {missionLength} / {MAX_MISSION_LENGTH} characters
                </p>
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
                    className="h-5 w-5 text-green-400 hover:cursor-pointer"
                    aria-hidden="true"
                    onClick={() => handleInfo("message")}
                  />
                </div>
                <div className="mt-2">
                  <textarea
                    onChange={(e) => handleMessageChange(e.target.value)}
                    value={message}
                    id="message"
                    name="message"
                    autoComplete="off"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 px-2 bg-[#141414] text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-400 sm:text-sm sm:leading-6 outline-none"
                  />
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  {messageLength} / {MAX_MESSAGE_LENGTH} characters
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>

      {errorMessage && (
        <p className="text-[#FB87A1] mt-4 text-center">{errorMessage}</p>
      )}
      <div className="mt-5 sm:mt-6">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          onClick={handleSubmit}
        >
          {loading ? (
            <ClipLoader
              color={"black"}
              loading={loading}
              size={25}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            "Create Mission"
          )}
        </button>
      </div>
    </>
  );
}
