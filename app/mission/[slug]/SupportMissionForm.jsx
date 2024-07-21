"use client";
import { Dialog } from "@headlessui/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import useInfoStore from "@/app/stores/infoStore";
import useUserStore from "@/app/stores/userStore";
import MoreInfo from "@/app/global-components/MoreInfo";
import useNotificationStore from "@/app/stores/notificationStore";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import { fetchAuthSession } from "aws-amplify/auth";

export default function SupportMissionForm({
  setFunds,
  setComment,
  comment,
  isCommentPublic,
  funds,
  setOpen,
  supporters,
  setSupporters,
}) {
  const {
    infoMessage,
    title,
    showInfo,
    setShowInfo,
    setTitle,
    setInfoMessage,
  } = useInfoStore();
  const { user, mission, setMission } = useUserStore();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { setShowNotification, setNTitle, setNMessage, setNError } =
    useNotificationStore();

  const handleInfo = (t) => {
    switch (t) {
      case "fund":
        setTitle("Support a Mission");
        setInfoMessage(
          "Contributing Mission Points helps support and fund the mission, bringing it closer to its goal. Your support makes a significant impact!"
        );
        break;
      case "mission":
        break;
      case "message":
        setTitle("Add a Comment");
        setInfoMessage(
          "Feel free to write a message to explain why you supported the mission. Your words can encourage others to join in and support the cause!"
        );
    }

    setShowInfo(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    setErrorMessage("");

    let jwt;

    try {
      const authSession = await fetchAuthSession();
      jwt = authSession.tokens.idToken.toString();
    } catch (error) {
      return new Error("Error fetching auth session");
    }

    // Fetch to create and confirm the PaymentIntent from your server
    const res = await fetch(process.env.NEXT_PUBLIC_WRITE_SUPPORT_MISSION, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        fundAmount: funds,
        comment,
        isCommentPublic,
        missionId: mission.mission_id,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      setErrorMessage(result.message);
    } else {
      // notification

      setOpen(false);
      setNError(false);
      setNTitle("Supported");
      setNMessage(`You successfully supported @${user.username}'s mission.`);
      setShowNotification(true);
      const {
        username,
        completed_missions,
        supported_missions,
        recruits,
        supportId,
        createdAt,
      } = result;

      const support = {
        username,
        completed_missions,
        supported_missions,
        recruits,
        support_id: supportId,
        created_at: createdAt,
        supporter_message: comment,
        funded: funds,
      };

      const tmp = [...supporters];
      tmp.unshift(support);
      setSupporters(tmp);

      const mis = { ...mission };
      mis.funds = parseInt(funds) + parseInt(mission.funds);
      setMission(mis);
    }

    setLoading(false);
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
          S
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-white"
          >
            Support Mission
          </Dialog.Title>
        </div>
      </div>

      <form>
        <div className="space-y-0">
          <div className="">
            <p className="mt-4 text-sm leading-6 text-gray-100 text-center"></p>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-green-400"
                >
                  Add Mission Points
                </label>
                <InformationCircleIcon
                  className="h-5 w-5 text-green-400"
                  aria-hidden="true"
                  onClick={() => handleInfo("fund")}
                />
              </div>

              <div className="mt-2 w-full">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md outline-none  text-white">
                  <span className="flex select-none items-center pl-3 text-white-500 sm:text-sm"></span>
                  <input
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        // This regex allows only digits
                        setFunds(value);
                      }
                    }}
                    value={funds}
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
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium leading-6 text-green-400"
                  >
                    Comment
                  </label>
                  <InformationCircleIcon
                    className="h-5 w-5 text-green-400"
                    aria-hidden="true"
                    onClick={() => handleInfo("message")}
                  />
                </div>
                <div className="mt-2">
                  <textarea
                    onChange={(e) => setComment(e.target.value)}
                    id="comment"
                    name="comment"
                    autoComplete="off"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 px-2 bg-[#141414] text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-400 sm:text-sm sm:leading-6 outline-none"
                    defaultValue={""}
                  />
                </div>
              </div>
              {/* <div className="col-span-full mt-5 flex items-center justify-between">
                <label
                  htmlFor="is-public-comment"
                  className="block text-sm font-medium leading-6 text-green-400"
                >
                  Public Comment
                </label>
                <input
                  onChange={(e) => setIsCommentPublic(!isCommentPublic)}
                  name="is-public-comment"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 focus:ring-green-600 accent-green-400"
                />
              </div> */}
            </div>
          </div>
        </div>
      </form>

      {errorMessage && <p className="text-[#FB87A1] mt-4">{errorMessage}</p>}

      <div className="mt-5 sm:mt-6">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          onClick={handleSubmit}
        >
          {!loading ? (
            "Support"
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
      </div>
    </>
  );
}
