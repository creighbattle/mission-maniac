"use client";
import { useState } from "react";
import Header from "../global-components/Header";
import {
  ArrowLongDownIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  const [user, setUser] = useState("");

  return (
    <div className="bg-white">
      <Header />
      <div className="text-black h-svh bg-white flex flex-col items-center justify-center">
        <div className="flex flex-col">
          <h3 className="text-4xl lg:text-8xl tracking-widest font-light md:text-6xl">
            Complete missions
          </h3>
          <div className="ml-[0.5rem] w-full">
            <h3 className="text-4xl lg:text-8xl tracking-widest font-light  mt-4 text-end lg:mt-14 md:text-6xl">
              Recruit creators
            </h3>
          </div>
          <div className="w-full ml-[-0.5rem]">
            <h3 className="text-4xl lg:text-8xl tracking-widest font-light  mt-4 text-start lg:mt-14 md:text-6xl">
              Support the fun
            </h3>
          </div>
          <div className="relative mt-4 flex flex-col items-end lg:mt-14">
            <div className="w-3/4 md:w-1/2">
              <div className="mt-2">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    router.push(`/${user}`);
                  }}
                  className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-400 focus-within:ring-2 focus-within:ring-inset"
                >
                  <span className="flex select-none items-center pl-3 text-gray-500 md:text-xl md:mb-1">
                    @
                  </span>
                  <input
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    type="text"
                    name="company-website"
                    id="company-website"
                    autoCapitalize="none"
                    className="block flex-1 border-0 bg-transparent py-1.5 md:py-3 pl-1 md:pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 md:text-lg md:leading-6 outline-none caret-green-400"
                    placeholder="Search for a creator"
                  />
                  <button
                    // onClick={() => router.push(`/${user}`)}
                    className="flex select-none items-center mr-4 text-gray-500 md:text-sm outline-green-400"
                  >
                    <ArrowRightCircleIcon
                      className="h-5 w-5 text-black md:h-7 md:w-7"
                      aria-hidden="true"
                    />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-5 flex w-full px-4 justify-between items-center max-w-7xl">
          <p className="text-lg font-medium">
            Will you be the next Mission Maniac?
            {/* What is Mission Maniac? */}
          </p>
          {/* <ArrowLongDownIcon
            className="h-9 w-9 md:h-12 md:w-12 text-black"
            aria-hidden="true"
          /> */}
        </div>
      </div>
    </div>
  );
}
