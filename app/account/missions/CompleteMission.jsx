import InfoLabel from "@/app/global-components/InfoLabel";
import useNotificationStore from "@/app/stores/notificationStore";
import useUserStore from "@/app/stores/userStore";
import { Dialog } from "@headlessui/react";
import { fetchAuthSession } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const MAX_MESSAGE_LENGTH = 500;
const MAX_MISSION_LINK_LENGTH = 255;

export default function CompleteMission({
  setView,
  setOpen,
  missions,
  setMissions,
}) {
  const [loading, setLoading] = useState();
  const [maniacMessage, setManiacMessage] = useState("");
  const [maniacMessageLength, setManiacMessageLength] = useState(0);
  const [missionLink1, setMissionLink1] = useState("");
  const [missionLink1Length, setMissionLink1Length] = useState(0);
  const [missionLink2, setMissionLink2] = useState("");
  const [missionLink3, setMissionLink3] = useState("");
  const [missionLink4, setMissionLink4] = useState("");
  const [missionLink5, setMissionLink5] = useState("");

  const { setShowNotification, setNTitle, setNMessage } =
    useNotificationStore();
  const { selectedData } = useUserStore();
  const [error, setError] = useState("");

  useEffect(() => {
    setManiacMessage(
      selectedData.maniac_message ? selectedData.maniac_message : ""
    );
    setManiacMessageLength(
      selectedData?.maniac_message ? selectedData.maniac_message.length : 0
    );
  }, [selectedData]);

  const handleComplete = async () => {
    setError("");
    setLoading(true);
    let jwt;
    try {
      const authSession = await fetchAuthSession();
      // jwt = authSession.tokens.accessToken.toString();
      jwt = authSession.tokens.idToken.toString();
    } catch (error) {
      return new Error("Error fetching auth session");
    }

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_WRITE_COMPLETE_MISSION,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({
            missionId: selectedData.mission_id,
            maniacMessage,
            link1: missionLink1,
            link2: missionLink2,
            link3: missionLink3,
            link4: missionLink4,
            link5: missionLink5,
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
      setNTitle("Mission Completed");
      setNMessage(
        "The mission has been completed. Well done! It can take up to 7 days for the funds to show in your account."
      );

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
      setManiacMessage(newMessage);
      setManiacMessageLength(newMessage.length);
    }
  };

  const handleMissionLinkChange = (text) => {
    const newMessage = text;
    if (newMessage.length <= MAX_MISSION_LINK_LENGTH) {
      setMissionLink1(newMessage);
      setMissionLink1Length(newMessage.length);
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
            Complete Mission
          </Dialog.Title>
        </div>
      </div>

      <div className="col-span-full">
        <label
          htmlFor="mission"
          className="block text-sm font-medium leading-6 text-green-400"
        >
          <InfoLabel
            label={"Message"}
            title={"Message"}
            message={
              "Here you can write up an after mission report. This will be viewable on the Mission Report."
            }
          />
        </label>
        <div className="mt-2">
          <textarea
            value={maniacMessage}
            onChange={(e) => handleMessageChange(e.target.value)}
            name="maniac-message"
            autoComplete="off"
            rows={3}
            className="block w-full rounded-md border-0 py-1.5 px-2 bg-[#141414] text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-400 sm:text-sm sm:leading-6 outline-none"
          />
          <p className="text-sm text-gray-400 mt-1">
            {maniacMessageLength} / {MAX_MESSAGE_LENGTH} characters
          </p>
        </div>
      </div>

      <div className="mt-2 w-full">
        <label
          htmlFor="username"
          className="block text-sm font-medium leading-6 text-green-400 mb-2"
        >
          <InfoLabel
            label={"Mission Link *"}
            title={"Mission Links"}
            message={"Paste the links to the completed mission here."}
          />
        </label>
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md outline-none  text-white">
          <input
            onChange={(e) => handleMissionLinkChange(e.target.value)}
            value={missionLink1}
            type="text"
            inputMode="text"
            name="mission-link-1"
            autoComplete="off"
            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none"
          />
        </div>
        <p className="text-sm text-gray-400 mt-1">
          {missionLink1Length} / {MAX_MISSION_LINK_LENGTH} characters
        </p>
      </div>

      <div className="mt-2 w-full">
        <label
          htmlFor="username"
          className="block text-sm font-medium leading-6 text-green-400 mb-2"
        >
          Mission Link:
        </label>
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md outline-none  text-white">
          <input
            onChange={(e) => setMissionLink2(e.target.value)}
            type="text"
            inputMode="text"
            name="mission-link-2"
            autoComplete="off"
            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none"
          />
        </div>
      </div>

      <div className="mt-2 w-full">
        <label
          htmlFor="username"
          className="block text-sm font-medium leading-6 text-green-400 mb-2"
        >
          Mission Link:
        </label>
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md outline-none  text-white">
          <input
            onChange={(e) => setMissionLink3(e.target.value)}
            type="text"
            inputMode="text"
            name="mission-link-3"
            autoComplete="off"
            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none"
          />
        </div>
      </div>

      <div className="mt-2 w-full">
        <label
          htmlFor="username"
          className="block text-sm font-medium leading-6 text-green-400 mb-2"
        >
          Mission Link:
        </label>
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md outline-none  text-white">
          <input
            onChange={(e) => setMissionLink4(e.target.value)}
            type="text"
            inputMode="text"
            name="mission-link-4"
            autoComplete="off"
            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none"
          />
        </div>
      </div>

      <div className="mt-2 w-full">
        <label
          htmlFor="username"
          className="block text-sm font-medium leading-6 text-green-400 mb-2"
        >
          Mission Link:
        </label>
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md outline-none  text-white">
          <input
            onChange={(e) => setMissionLink5(e.target.value)}
            type="text"
            inputMode="text"
            name="mission-link-5"
            autoComplete="off"
            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none"
          />
        </div>
      </div>

      <div className="mt-5 sm:mt-6">
        {error && (
          <div>
            <p className="text-[#FB87A1] mb-4 text-center">{error}</p>
          </div>
        )}
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          onClick={handleComplete}
        >
          {!loading ? (
            "Complete Mission"
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
