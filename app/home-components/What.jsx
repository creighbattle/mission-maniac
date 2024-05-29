"use client";
import { useState } from "react";
import { ArrowLongDownIcon } from "@heroicons/react/24/outline";

export default function What() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col h-[100svh] bg-[#141414]">
      <div className="relative isolate pt-0">
        <svg
          className="absolute inset-0 -z-10 h-full w-full stroke-green-400 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-700">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
          />
        </svg>
        <div className="mx-auto max-w-7xl px-6 py-0 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            <h1 className="mt-10 max-w-lg text-4xl font-bold tracking-tight text-white sm:text-6xl">
              What is Mission Maniac?
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-100">
              Mission Maniac is a fun, interactive platform where you can
              challenge your favorite content creators with exciting missions.
              Become a Recruiter by assigning missions. Become a Supporter by
              backing missions. Or sign up to become a Mission Maniac to take on
              challenges from Recruiters! Want to enjoy the madness from the
              shadows? Become a spectator. Spectators are the silent watchers
              who don&apos;t engage much but are still locked in on the Mission.
              Whatever your vibe is, there is a place for you on Mission Maniac.
              Let the madness begin.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1  justify-end max-w-7xl mx-auto w-full">
        <div className="flex w-full px-4 justify-between items-center max-w-7xl mb-[1.25rem]">
          <p className="text-lg font-medium text-white">How does it work?</p>
          <ArrowLongDownIcon
            className="h-9 w-9 md:h-12 md:w-12 text-white"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
