// "use client";
// import { useState } from "react";
// import Stats from "./Stats";

// export default function User() {
//   const [expanded, setExpanded] = useState(false);

//   return (
//     <div className="h-svh flex flex-col">
//       <div className="flex justify-center items-center pb-2 bg-white pt-24">
//         <img
//           className="inline-block h-14 w-14 rounded-full"
//           src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//           alt=""
//         />
//         <p className="ml-2">@pekinwoof</p>
//       </div>
//       <div className="bg-white flex flex-col flex-grow px-[5.5vw]">
//         <p className="text-center mt-4">
//           Hi guys, feel free to challenge me to some missions. I mostly do
//           challenges regarding League of Legends challenges.
//         </p>
//         <div>
//           <Stats />
//         </div>
//       </div>
//       <div
//         className="flex items-center justify-center bg-white"
//         style={{ rotate: "180deg" }}
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke-width="1.5"
//           stroke="currentColor"
//           class="w-10 h-10"
//         >
//           <path
//             stroke-linecap="round"
//             stroke-linejoin="round"
//             d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
//           />
//         </svg>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import Stats from "./Stats";
import MissionFeed from "./MissionFeed";
import useUserStore from "../stores/userStore";
import useNotificationStore from "../stores/notificationStore";
import toggleUserSpectate from "../api-calls/toggle-user-spectate";
import { ClipLoader } from "react-spinners";
import Username from "../global-components/Username";

export default function User() {
  const [expanded, setExpanded] = useState(false);
  const { user, setUser } = useUserStore();
  const [loading, setLoading] = useState(false);
  const { setShowNotification, setNTitle, setNMessage, setNError } =
    useNotificationStore();

  return (
    <div className="h-svh flex flex-col">
      <div
        className={`flex flex-col justify-center items-center pb-2 bg-white pt-24 ${
          expanded ? "rounded-b-xl" : "rounded-none"
        }`}
      >
        {user?.photoUrl && (
          <img
            className="inline-block h-14 w-14 rounded-full"
            src={user.photoUrl}
            alt=""
          />
        )}

        <Username
          username={user.username}
          textColor={"black"}
          outlineColor={"black"}
          completedMissions={user.completed_missions}
          recruits={user.recruits}
          supports={user.supported_missions}
        />
        <div className="flex items-center justify-center">
          <img className="h-5 w-5 rounded-full" src="/binoculars.png" alt="" />
          <p className="ml-2">{user.spectators}</p>
        </div>
      </div>

      <div
        className="bg-gray-800 flex flex-col flex-grow px-[5.5vw] transition-max-height duration-500 ease-in-out"
        style={{ maxHeight: expanded ? "1000px" : "0px" }} // Adjust max-height according to your content size
      >
        {expanded && (
          <>
            <div className="flex items-center w-full justify-center mt-5">
              <button
                onClick={async () => {
                  if (!loading) {
                    await toggleUserSpectate({
                      profileUsername: user.username,
                      setLoading,
                      setNError,
                      setShowNotification,
                      setNTitle,
                      setNMessage,
                      spectating: !user.is_spectating,
                      setUser,
                      user,
                    });
                  }
                }}
                className="w-fit rounded-md bg-white text-black px-3 py-1  font-semibold shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                {!loading ? (
                  user.is_spectating ? (
                    "Unspectate"
                  ) : (
                    "Spectate"
                  )
                ) : (
                  <ClipLoader
                    color={"white"}
                    loading={loading}
                    // cssOverride={override}
                    size={25}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                )}
              </button>
            </div>
            <p className="text-center mt-4 text-white">{user?.bio}</p>
            <div className="max-w-7xl  mx-auto w-full px-4">
              <Stats />
            </div>
          </>
        )}
      </div>
      <div
        className="flex items-center justify-center bg-white cursor-pointer rounded-t-3xl"
        onClick={() => setExpanded(!expanded)}
        style={{ rotate: "180deg" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={`w-10 h-10 ${expanded ? "rotate-180" : ""}`} // This will rotate the icon based on the state
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>
      {!expanded && <MissionFeed />}
    </div>
  );
}
