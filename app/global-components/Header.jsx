"use client";

import { useState } from "react";
import Logo from "../../public/MissionManiacLogo.png";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [showClose, setShowClose] = useState(false);

  const handleClick = () => {
    setOpen(!open);
    setTimeout(() => {
      setShowMenu(!showMenu);
      setShowClose(!showClose);
    }, 500);
  };

  return (
    <header className="fixed w-full z-40 px-4 py-4 max-w-7xl left-[50%] translate-x-[-50%] bg-white">
      <div className="w-full items-center flex justify-between">
        <div
          className={`flex items-center z-40 transition-colors duration-500 ease-in-out${
            !open ? "text-black" : "text-white"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          {/* <div className="text-[14vw] font-semibold">M</div>
          <div className="mt-[6px] leading-[5vw]">
            <h3 className="text-[5vw] font-medium tracking-[.27vw]">ission</h3>
            <h3 className="text-[5vw] font-medium tracking-[.27vw]">aniac</h3>
          </div> */}
          <a href="">
            <img src="/Logo.jpeg" alt="" className="h-14" />
          </a>
        </div>

        {showMenu && (
          <button onClick={handleClick} className="z-50 flex items-center">
            <span
              className={`transition-opacity duration-500 ease-in-out ${
                !open ? "opacity-100" : "opacity-0 pointer-events-none"
              } text-xl font-medium tracking-[.27vw]`}
              style={{ transitionDelay: open ? "100ms" : "500ms" }} // Delay the transition for the open state
            >
              Menu
            </span>
          </button>
        )}
        {showClose && (
          <button onClick={handleClick} className="z-50 flex items-center">
            <span
              className={`transition-opacity duration-500 ease-in-out ${
                open ? "opacity-100" : "opacity-0 pointer-events-none"
              } text-xl font-medium tracking-[.27vw] text-white`}
              style={{ transitionDelay: !open ? "100ms" : "500ms" }} // Delay the transition for the open state
            >
              Close
            </span>
          </button>
        )}
      </div>

      <div
        className={`transition-transform transform duration-500 absolute top-0 left-0 ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
        style={{
          backgroundColor: "#141414",
          height: "100svh",
          width: "100%",
        }}
      >
        <div className="h-svh flex flex-col px-8 tracking-wide">
          <ul className="text-white pt-32">
            <li className="text-5xl">
              <a href="">Discover</a>
            </li>
            <li className="text-5xl mt-8">
              <a href="">Learn</a>
            </li>
            <li className="text-5xl mt-8">
              <a href="">Login</a>
            </li>
            {/* <li className="text-5xl mt-8">
              <a href="">Contact</a>
            </li> */}
          </ul>
          <div className="mt-20 text-xl tracking-[.27vw] text-white">
            An interesting way to collaborate
          </div>
          <div className="mt-2 text-xl tracking-[.27vw] text-white">
            Made for the community
          </div>
          <div className="flex-grow items-end flex pb-4 text-white tracking-wide text-sm sm:text-lg">
            <div className="mr-5 text-lg">
              <a href="">Facebook</a>
            </div>
            <div className="mr-5 text-lg">
              <a href="">Instagram</a>
            </div>
            <div className="mr-5 text-lg">
              <a href="">X</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
