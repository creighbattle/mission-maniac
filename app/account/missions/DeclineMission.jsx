import InfoLabel from "@/app/global-components/InfoLabel";
import useNotificationStore from "@/app/stores/notificationStore";
import useUserStore from "@/app/stores/userStore";
import { Dialog } from "@headlessui/react";
import { fetchAuthSession } from "aws-amplify/auth";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

export default function DeclineMission({
  setView,
  setOpen,
  missions,
  setMissions,
}) {
  const [loading, setLoading] = useState();
  const [declineReason, setDeclineReason] = useState("");
  const [isInappropriate, setIsInappropriate] = useState(false);
  const { setShowNotification, setNTitle, setNMessage, setNError } =
    useNotificationStore();
  const { selectedData } = useUserStore();
  const [error, setError] = useState("");

  const handleDecline = async () => {
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
        process.env.NEXT_PUBLIC_WRITE_DECLINE_MISSION,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({
            missionId: selectedData.mission_id,
            declineReason,
            isInappropriate,
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
      setNError(false);
      setShowNotification(true);
      setNTitle("Mission Declined");
      setNMessage("The mission has been declined.");

      setMissions(
        missions.filter((val) => val.mission_id !== selectedData.mission_id)
      );
    } catch (error) {
      setError(error.message);
      setLoading(false);
    } finally {
    }
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
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-3xl font-bold">
          M
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-white"
          >
            Decline Mission
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
            message={
              "You can inform the Recruiter on why you are not accepting the mission here."
            }
          />
        </label>
        <div className="mt-2">
          <textarea
            value={declineReason}
            onChange={(e) => setDeclineReason(e.target.value)}
            id="mission"
            name="mission"
            autoComplete="off"
            rows={3}
            className="block w-full rounded-md border-0 py-1.5 px-2 bg-[#141414] text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-400 sm:text-sm sm:leading-6 outline-none"
          />
        </div>
      </div>

      {/* <div className="col-span-full mt-5 flex items-center justify-between">
        <label
          htmlFor="mission"
          className="block text-sm font-medium leading-6 text-green-400"
        >
          <InfoLabel
            label={"Mark inappropriate"}
            title={"Mark inappropriate"}
            message={`If this mission request is inappropriate in any way, you can mark it here. This will add a strike to the Recruiter's page. 
              After 3 strikes (baseball fan what can I say), the user will be banned from recruiting and commenting until a strike is removed after a year.`}
          />
        </label>
        <input
          onChange={(e) => setIsInappropriate(!isInappropriate)}
          id="remember-me"
          name="remember-me"
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 focus:ring-green-600 accent-green-400"
        />
      </div> */}
      <div className="mt-5 sm:mt-6">
        {error && (
          <div>
            <p className="text-[#FB87A1] mb-2 text-center">{error}</p>
          </div>
        )}
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          onClick={handleDecline}
        >
          {!loading ? (
            "Decline"
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
