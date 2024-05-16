import useNotificationStore from "@/app/stores/notificationStore";
import useUserStore from "@/app/stores/userStore";
import { Dialog } from "@headlessui/react";
import { fetchAuthSession } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export default function UpdateMission({ setView, setOpen }) {
  const [loading, setLoading] = useState(false);
  const [maniacMessage, setManiacMessage] = useState("");
  const [missionLink1, setMissionLink1] = useState("");
  const [missionLink2, setMissionLink2] = useState("");
  const [missionLink3, setMissionLink3] = useState("");
  const [missionLink4, setMissionLink4] = useState("");
  const [missionLink5, setMissionLink5] = useState("");
  const [isInappropriate, setIsInappropriate] = useState(null);

  const { setShowNotification, setNTitle, setNMessage } =
    useNotificationStore();
  const { selectedData } = useUserStore();
  const [error, setError] = useState("");

  useEffect(() => {
    // set info to selecteddata here
    console.log(selectedData.mission_link_1);
    setMissionLink1(selectedData.mission_link_1);
    setMissionLink2(selectedData.mission_link_2);
    setMissionLink3(selectedData.mission_link_3);
    setMissionLink4(selectedData.mission_link_4);
    setMissionLink5(selectedData.mission_link_5);
    setIsInappropriate(selectedData.is_inappropriate);

    setManiacMessage(
      selectedData.maniac_message ? selectedData.maniac_message : ""
    );
  }, []);

  const handleUpdate = async () => {
    setError("");
    setLoading(true);
    let jwt;
    try {
      const authSession = await fetchAuthSession();
      jwt = authSession.tokens.accessToken.toString();
    } catch (error) {
      console.log(error);
      return new Error("Error fetching auth session");
    }

    try {
      const response = await fetch(
        "http://10.0.0.222:3005/api/update-mission",
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
        console.log(response);
        const { message } = await response.json();
        throw new Error(message);
      }

      setOpen(false);

      setTimeout(() => {
        setLoading(false);
      }, 500);
      setShowNotification(true);
      setNTitle("Mission Files Updated");
      setNMessage("The mission has been updated.");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    } finally {
    }
  };
  return (
    <div>
      <div className="absolute text-white top-7" onClick={() => setView(6)}>
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
            Update Mission Files
          </Dialog.Title>
        </div>
      </div>

      <div className="col-span-full mt-4">
        <label
          htmlFor="mission"
          className="block text-sm font-medium leading-6 text-green-400"
        >
          {selectedData.mission_status === "aborted"
            ? "Abort Reason"
            : selectedData.mission_status === "completed"
            ? "Message"
            : "Decline Reason"}
        </label>
        <div className="mt-2">
          <textarea
            value={maniacMessage}
            onChange={(e) => setManiacMessage(e.target.value)}
            name=""
            autoComplete="off"
            rows={3}
            className="block w-full rounded-md border-0 py-1.5 px-2 bg-[#141414] text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-400 sm:text-sm sm:leading-6 outline-none"
          />
        </div>
      </div>

      {selectedData.mission_status === "declined" &&
        isInappropriate !== null && (
          <div className="col-span-full mt-5 flex items-center justify-between">
            <label
              htmlFor="mission"
              className="block text-sm font-medium leading-6 text-green-400"
            >
              Mark inappropriate
            </label>
            <input
              onChange={(e) => setIsInappropriate(!isInappropriate)}
              checked={isInappropriate}
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 focus:ring-green-600 accent-green-400"
            />
          </div>
        )}

      {selectedData.mission_status === "completed" && (
        <>
          <div className="mt-2 w-full">
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-green-400 mb-2"
            >
              Mission Link *
            </label>
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md outline-none  text-white">
              <input
                value={missionLink1}
                onChange={(e) => setMissionLink1(e.target.value)}
                type="text"
                inputMode="text"
                name="mission-link-1"
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
              Mission Link
            </label>
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md outline-none  text-white">
              <input
                value={missionLink2}
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
              Mission Link
            </label>
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md outline-none  text-white">
              <input
                value={missionLink3}
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
              Mission Link
            </label>
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md outline-none  text-white">
              <input
                value={missionLink4}
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
              Mission Link
            </label>
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md outline-none  text-white">
              <input
                value={missionLink5}
                onChange={(e) => setMissionLink5(e.target.value)}
                type="text"
                inputMode="text"
                name="mission-link-5"
                autoComplete="off"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none"
              />
            </div>
          </div>
        </>
      )}

      <div className="mt-5 sm:mt-6">
        {error && (
          <div>
            <p className="text-[#FB87A1] mb-2 text-center">{error}</p>
          </div>
        )}
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          onClick={handleUpdate}
        >
          {!loading ? (
            "Update Mission"
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
        </button>
      </div>
    </div>
  );
}
