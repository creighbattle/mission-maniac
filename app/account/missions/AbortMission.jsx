import InfoLabel from "@/app/global-components/InfoLabel";
import useNotificationStore from "@/app/stores/notificationStore";
import useUserStore from "@/app/stores/userStore";
import { Dialog } from "@headlessui/react";
import { fetchAuthSession } from "aws-amplify/auth";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

const MAX_MESSAGE_LENGTH = 500;

export default function AbortMission({
  setView,
  setOpen,
  missions,
  setMissions,
}) {
  const [loading, setLoading] = useState();
  const [abortMessage, setAbortMessage] = useState("");
  const [abortMessageLength, setAbortMessageLength] = useState(0);

  const { setShowNotification, setNTitle, setNMessage } =
    useNotificationStore();
  const { selectedData } = useUserStore();
  const [error, setError] = useState("");

  const handleAbort = async () => {
    setError("");
    setLoading(true);
    let jwt;
    try {
      const authSession = await fetchAuthSession();
      jwt = authSession.tokens.idToken.toString();
    } catch (error) {
      return new Error("Error fetching auth session");
    }

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_WRITE_ABORT_MISSION,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({
            missionId: selectedData.mission_id,
            abortMessage,
          }),
        }
      );

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }

      setOpen(false);

      setTimeout(() => {
        setLoading(false);
      }, 500);
      setShowNotification(true);
      setNTitle("Mission Aborted");
      setNMessage("The mission has been aborted.");

      setMissions(
        missions.filter((val) => val.mission_id !== selectedData.mission_id)
      );
    } catch (error) {
      setError(error.message);
      setLoading(false);
    } finally {
    }
  };

  const handleMessageChange = (text) => {
    const newMessage = text;
    if (newMessage.length <= MAX_MESSAGE_LENGTH) {
      setAbortMessage(newMessage);
      setAbortMessageLength(newMessage.length);
    }
  };

  return (
    <div>
      <div className="absolute text-white top-7" onClick={() => setView(3)}>
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
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-3xl font-bold">
          M
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-white"
          >
            Abort Mission
          </Dialog.Title>
        </div>
      </div>

      <div className="col-span-full">
        <label
          htmlFor="mission"
          className="block text-sm font-medium leading-6 text-green-400"
        >
          <InfoLabel
            label={"Reason"}
            title={"Reason"}
            message={`Inform your Recruiter and Supporters on the reason why you are aborting this mission. 
          This message will be viewable in the mission report. The mission Recruiter and mission Supporters will be able to collect a refund up to 95% - 30 cents.`}
          />
        </label>
        <div className="mt-2">
          <textarea
            value={abortMessage}
            onChange={(e) => handleMessageChange(e.target.value)}
            id="mission"
            name="mission"
            autoComplete="off"
            rows={3}
            className="block w-full rounded-md border-0 py-1.5 px-2 bg-[#141414] text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-400 sm:text-sm sm:leading-6 outline-none"
          />
          <p className="text-sm text-gray-400 mt-1">
            {abortMessageLength} / {MAX_MESSAGE_LENGTH} characters
          </p>
        </div>
      </div>

      <div className="mt-5 sm:mt-6">
        {error && (
          <div>
            <p className="text-[#FB87A1] mb-2 text-center">{error}</p>
          </div>
        )}
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          onClick={handleAbort}
        >
          {!loading ? (
            "Abort"
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
    </div>
  );
}
