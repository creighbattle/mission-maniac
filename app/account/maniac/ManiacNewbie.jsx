"use client";
import useUserStore from "@/app/stores/userStore";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import Typewriter from "typewriter-effect";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import useNotificationStore from "@/app/stores/notificationStore";
import Notification from "@/app/global-components/Notification";

export default function ManiacNewbie() {
  const [el, setEl] = useState(0);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { user, setUser } = useUserStore();
  const [minFund, setMinFund] = useState("");

  const { setShowNotification, setNMessage, setNTitle, setNError } =
    useNotificationStore();

  useEffect(() => {
    if (!minFund) {
      setMinFund(user.min_fund);
    }
  }, [user]);

  const handleClick = async () => {
    setLoading(true);
    const data = {
      userId: user.user_id,
      stripeId: user.stripe_id,
      infoRequired: user.info_required,
    };

    try {
      const response = await fetch(
        "http://10.0.0.222:3005/api/create-stripe-link",
        {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const { link, account, loginLink } = await response.json();

      if (!user.stripe_id && account) {
        const clone = { ...user };
        clone.stripe_id = account.id;
        setUser(clone);
      }

      console.log(loginLink.url);
      console.log(link);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    setNError(false);
    setSaving(true);
    const el = document.getElementById("accepting-missions");
    const acceptingMissions = el.checked;

    try {
      const response = await fetch(
        "http://10.0.0.222:3005/api/save-maniac-info",
        {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            acceptingMissions,
            minFund,
            userId: user.user_id,
          }),
        }
      );

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }

      setNTitle("Successfully saved!");
      setNMessage("Your mission request requirements have been updated.");
      setSaving(false);
      //console.log(message);
    } catch (error) {
      setSaving(false);
      console.log("here");
      setNError(true);
      setNTitle("Uh oh!");
      setNMessage(error.message);
    } finally {
      setShowNotification(true);
    }
  };

  if (loading) {
    return (
      <div>
        <div className="mt-5 flex flex-col items-center justify-center">
          Creating your Stripe account
          <div className="mt-2">
            <ClipLoader
              color={"#4ade80"}
              loading={loading}
              // cssOverride={override}
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
          <button
            type="button"
            onClick={handleClick}
            className="flex justify-center ml-2 text-black rounded-md bg-green-400 px-6 py-2 text-sm font-semibold leading-6  shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Update Account
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
          <h2 className="text-white">Minimum Fund:</h2>
          <div className="flex  rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md outline-none  text-white">
            <span className="flex select-none items-center pl-3 text-white-500 sm:text-sm">
              $
            </span>
            <input
              onChange={(e) => setMinFund(e.target.value)}
              value={minFund}
              type="text"
              inputMode="decimal"
              name="username"
              id="username"
              autoComplete="off"
              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none"
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
                  // cssOverride={override}
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
        let's get you set up with your very first mission.
      </p>
      <p className="mt-5 text-green-400">Mission:</p>
      <p className="mt-1 ml-3">
        Complete Stripe Onboarding. We&apos;ve partnered up with Stripe, a
        trusted global payment platform, to ensure you're rewarded for your
        daring missions. Once this is completed, you can begin receiving
        missions from recruiters all around the globe.
      </p>
      <div className="mt-5 w-full flex items-center justify-center">
        <button
          type="button"
          onClick={handleClick}
          className="flex justify-center text-black rounded-md bg-green-400 px-6 py-2 text-sm font-semibold leading-6  shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          Let's Go
        </button>
      </div>
    </div>
  );

  // if (showLast) {
  //   return (
  //     <div>
  //       <div className="mt-5 flex flex-col items-center justify-center">
  //         <Typewriter
  //           onInit={(typewriter) => {
  //             setWriter(typewriter);
  //             typewriter
  //               .changeDelay(30)
  //               .typeString("Your account was successfully created.")
  //               .callFunction(() => setLoading(true))
  //               .start();
  //           }}
  //         />
  //       </div>
  //     </div>
  //   );
  // }

  // if (showNext && !showLast) {
  //   return (
  //     <div>
  //       <div className="mt-5 flex flex-col items-center justify-center">
  //         <Typewriter
  //           onInit={(typewriter) => {
  //             setWriter(typewriter);
  //             typewriter
  //               .changeDelay(30)
  //               .typeString("Creating your Stripe account")
  //               .callFunction(() => setLoading(true))
  //               .start();
  //           }}
  //         />

  //         <div className="mt-2">
  //           <ClipLoader
  //             color={"#4ade80"}
  //             loading={loading}
  //             // cssOverride={override}
  //             size={25}
  //             aria-label="Loading Spinner"
  //             data-testid="loader"
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // if (!showNext || !showLast)
  //   return (
  //     <div>
  //       <div className="mt-5">
  //         <Typewriter
  //           onInit={(typewriter) => {
  //             typewriter

  //               .changeDelay(30)
  //               .typeString("So you want to become a Maniac...")
  //               .pauseFor(1000)
  //               .deleteChars(9)
  //               .typeString("Mission Maniac, that is!")
  //               .pauseFor(1500)
  //               .typeString(" Intriguing choice!")
  //               .pauseFor(700)
  //               .typeString(
  //                 " I cannot wait to see all the missions you complete."
  //               )
  //               .pauseFor(700)
  //               .typeString(
  //                 " But first, let's get you set up with your very first mission."
  //               )
  //               .callFunction(() => {
  //                 typewriter.stop();
  //                 document.querySelector(".Typewriter__cursor").style.display =
  //                   "none";

  //                 setEl(1);
  //               })
  //               .start();
  //           }}
  //         />
  //       </div>

  //       {el >= 1 && (
  //         <div className="mt-5 text-green-400">
  //           <Typewriter
  //             onInit={(typewriter) => {
  //               typewriter
  //                 .pauseFor(500)
  //                 .changeDelay(30)
  //                 .typeString("Mission: ")
  //                 .callFunction(() => {
  //                   typewriter.stop();
  //                   document.querySelectorAll(
  //                     ".Typewriter__cursor"
  //                   )[1].style.display = "none";
  //                   setEl(2);
  //                 })
  //                 .start();
  //             }}
  //           />
  //         </div>
  //       )}

  //       {el >= 2 && (
  //         <div className="mt-1 ml-3 text-white">
  //           <Typewriter
  //             onInit={(typewriter) => {
  //               typewriter
  //                 .pauseFor(500)
  //                 .changeDelay(30)
  //                 .typeString(
  //                   "Complete Stripe Onboarding. We’ve teamed up with Stripe, a trusted global payment platform, to ensure you're rewarded for your daring missions. Once this is completed, you can begin receiving missions from recruiters all around the globe."
  //                 )
  //                 .callFunction(() => {
  //                   setShowButton(true);
  //                   typewriter.stop();
  //                   document.querySelectorAll(
  //                     ".Typewriter__cursor"
  //                   )[2].style.display = "none";
  //                 })
  //                 .start();
  //             }}
  //           />
  //         </div>
  //       )}

  //       {showButton && (
  //         <div className="mt-5 w-full flex items-center justify-center">
  //           <button
  //             type="button"
  //             onClick={handleClick}
  //             className="flex justify-center text-black rounded-md bg-green-400 px-6 py-2 text-sm font-semibold leading-6  shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
  //           >
  //             Let's Go
  //           </button>
  //         </div>
  //       )}
  //     </div>
  //   );
}
