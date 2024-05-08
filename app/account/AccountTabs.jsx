"use client";

import { useState } from "react";
import { signOut } from "aws-amplify/auth";

const tabs = [
  { name: "Stats", href: "#", current: false },
  { name: "Requests", href: "#", current: false },
  { name: "Badges", href: "#", current: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AccountTabs({ setTab }) {
  const [tabs, setTabs] = useState([
    { name: "Stats", current: true, onClick: () => console.log("hi") },
    { name: "Maniac", current: false, onClick: () => console.log("hi") },
    { name: "Missions", current: false, onClick: () => console.log("hi") },
    { name: "Recruits", current: false, onClick: () => console.log("hi") },
    { name: "Supports", current: false, onClick: () => console.log("hi") },
    { name: "Badges", current: false, onClick: () => console.log("hi") },
    { name: "Bookmarks", current: false, onClick: () => console.log("hi") },

    {
      name: "Sign Out",
      current: false,
      onClick: async () => {
        await signOut()
          .then(() => console.log("user signed out"))
          .catch((err) => console.log(err));
      },
    },
  ]);

  const handleTabClick = (idx) => {
    const tabsCopy = [];
    for (let i = 0; i < tabs.length; i++) {
      const el = tabs[i];
      if (i === idx) {
        el.current = true;
      } else {
        el.current = false;
      }

      tabsCopy.push(el);
    }
    setTab(idx);
    setTabs(tabsCopy);

    tabsCopy[idx].onClick();
  };

  return (
    <div>
      <div className="">
        <div className="border-b border-gray-200">
          <nav
            className="-mb-px flex overflow-x-scroll max-w-full no-scrollbar"
            aria-label="Tabs"
          >
            {tabs.map((tab, idx) => (
              <button
                onClick={() => handleTabClick(idx)}
                key={tab.name}
                className={classNames(
                  tab.current
                    ? "border-green-400 text-green-400"
                    : "border-transparent text-gray-200 hover:border-gray-300 hover:text-gray-700",
                  "border-b-2 py-4 px-3 text-center text-sm font-medium"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
