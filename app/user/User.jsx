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

export default function User() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="h-svh flex flex-col">
      <div
        className={`flex justify-center items-center pb-2 bg-white pt-24 ${
          expanded ? "rounded-b-xl" : "rounded-none"
        }`}
      >
        <img
          className="inline-block h-14 w-14 rounded-full"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <p className="ml-2">@pekinwoof</p>
      </div>
      <div
        className="bg-gray-800 flex flex-col flex-grow px-[5.5vw] transition-max-height duration-500 ease-in-out"
        style={{ maxHeight: expanded ? "1000px" : "0px" }} // Adjust max-height according to your content size
      >
        {expanded && (
          <>
            <p className="text-center mt-4 text-white">
              Hi guys, feel free to challenge me to some missions. I mostly do
              challenges regarding League of Legends challenges.
            </p>
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
