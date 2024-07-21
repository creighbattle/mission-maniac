"use client";
import useUserStore from "@/app/stores/userStore";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import useNotificationStore from "@/app/stores/notificationStore";
import Notification from "@/app/global-components/Notification";
import saveManiacInfo from "@/app/api-calls/save-maniac-info";
import { fetchAuthSession } from "aws-amplify/auth";

export default function ManiacNewbie() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { user, setUser } = useUserStore();
  const [minFund, setMinFund] = useState("");
  const [error, setError] = useState("");

  const { setShowNotification, setNMessage, setNTitle, setNError } =
    useNotificationStore();

  useEffect(() => {
    setMinFund(minFund || user.min_fund);
  }, [user]);

  const handleClick = async ({ type }) => {
    setError("");
    setLoading(true);
    const data = {
      userId: user.user_id,
      stripeId: user.stripe_id,
      infoRequired: user.info_required,
      type,
    };

    try {
      const authSession = await fetchAuthSession();
      const jwt = authSession.tokens.idToken.toString();
      const response = await fetch(process.env.NEXT_PUBLIC_WRITE_STRIPE_LINK, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(
          "Failed to create your Stripe account. Please try again in a moment."
        );
      }

      const { link, account } = await response.json();

      if (!user.stripe_id && account) {
        const clone = { ...user };
        clone.stripe_id = account.id;
        setUser(clone);
      }

      if (link) {
        window.open(link, "_blank");
      }

      setLoading(false);
    } catch (error) {
      setError("Failed to create the link. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const el = document.getElementById("accepting-missions");
    const acceptingMissions = el.checked;

    await saveManiacInfo({
      minFund,
      acceptingMissions,
      setShowNotification,
      setNTitle,
      setNMessage,
      setNError,
      setSaving,
    });
  };

  if (loading) {
    return (
      <div>
        <div className="mt-5 flex flex-col items-center justify-center">
          Generating Stripe Link
          <div className="mt-2">
            <ClipLoader
              color={"#4ade80"}
              loading={loading}
              size={25}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </div>
      </div>
    );
  }

  if (user.stripe_id && !user.info_required) {
    return (
      <div className="flex flex-col">
        <Notification />
        <div className="mt-5 flex items-center justify-center">
          <button
            type="button"
            onClick={handleClick}
            className="flex justify-center text-black rounded-md bg-green-400 px-6 py-2 text-sm font-semibold leading-6  shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            View Dashboard
          </button>
        </div>

        <h2 className="text-base font-semibold leading-7 text-white mt-5">
          Settings
        </h2>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-100">
          Control mission request requirements here. If you make changes, do not
          forget to hit save to apply them.
        </p>

        <div className="flex items-center justify-between mt-4 border-white border-b">
          <h2 className="text-white ">Accepting Missions?</h2>
          <input
            defaultChecked={user.accepting_missions}
            id="accepting-missions"
            aria-describedby="accepting-missions"
            name="accepting-missions"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 focus:ring-green-600 accent-green-400"
          />
        </div>

        <div className="flex items-center justify-between mt-4 border-white border-b">
          <h2 className="text-white">Minimum Mission Points:</h2>
          <div className="flex  rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md outline-none  text-white">
            {/* <span className="flex select-none items-center pl-2 text-white-500 sm:text-sm"></span> */}
            <input
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setMinFund(value);
                }
              }}
              value={minFund}
              type="text"
              inputMode="decimal"
              name="username"
              id="username"
              autoComplete="off"
              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none text-right pr-2 w-32"
            />
          </div>
        </div>

        <div className="fixed bottom-5 right-3 flex items-center">
          <button
            type="button"
            onClick={handleSave}
            className="justify-center ml-2 text-black rounded-md bg-green-400 px-6 py-2 text-sm font-semibold leading-6  shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            {!saving ? (
              "Save"
            ) : (
              <div className="flex items-center justify-center">
                <ClipLoader
                  color={"black"}
                  loading={saving}
                  size={25}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            )}
          </button>
        </div>
      </div>
    );
  }

  if (user.stripe_id && user.info_required) {
    return (
      <div>
        <div className="mt-5 flex flex-col items-center justify-center">
          Additional info is needed for your Stripe account.
          <div className="mt-5">
            <button
              type="button"
              onClick={handleClick}
              className="flex justify-center text-black rounded-md bg-green-400 px-6 py-2 text-sm font-semibold leading-6  shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="mt-5">
        So you want to become a Maniac... Mission Maniac, that is! Intriguing
        choice! I cannot wait to see all the missions you complete. But first,
        let&apos;s get you set up with your very first mission.
      </p>
      <p className="mt-5 text-green-400">Mission:</p>
      <p className="mt-1 ml-3">
        Complete Stripe Onboarding. We&apos;ve partnered up with Stripe, a
        trusted global payment platform, to ensure you&apos;re rewarded for your
        daring missions. Once this is completed, you can begin receiving
        missions from recruiters all around the globe.
      </p>
      {error && <p className="text-[#FB87A1] text-center mt-2">{error}</p>}
      <div className="mt-5 w-full flex items-center justify-center">
        <button
          type="button"
          onClick={handleClick}
          className="flex justify-center text-black rounded-md bg-green-400 px-6 py-2 text-sm font-semibold leading-6  shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          Let&apos;s Go
        </button>
      </div>
    </div>
  );
}
