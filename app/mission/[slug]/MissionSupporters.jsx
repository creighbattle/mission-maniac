"use client";

import { useEffect, useState } from "react";
import useUserStore from "@/app/stores/userStore";
import { ClipLoader } from "react-spinners";
import getMissionSupporters from "@/app/api-calls/get-mission-supporters";
import { formatDistanceToNow, parseISO } from "date-fns";
import Username from "@/app/global-components/Username";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MissionSupporters() {
  const { mission } = useUserStore();

  const [sortOption, setSortOption] = useState("Likes");
  const [sortOptions, setSortOptions] = useState([
    "Likes",
    "Funding",
    "Oldest",
    "Newest",
  ]);
  const [error, setError] = useState("");

  const [supporters, setSupporters] = useState([]);
  const [cursorId, setCursorId] = useState(null);
  const [cursorSortId, setCursorSortId] = useState(null);

  useEffect(() => {
    if (mission) {
      getMissionSupporters({
        firstCall: true,
        missionId: mission.mission_id,
        cursorId,
        cursorSortId,
        setCursorId,
        setCursorSortId,
        setSupporters,
        supporters,
        sortOption,
        setError,
      });
    }
  }, [mission]);

  if (!mission) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <ClipLoader
          color={"#4ade80"}
          loading={true}
          // cssOverride={override}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between">
        <p className="text-white text-lg font-semibold">Supporters</p>
        {/* <label htmlFor="" className="text-white text-lg font-semibold">
          Sort By:
          <select
            name=""
            id=""
            className="bg-white text-black ml-2 text-sm font-normal outline-none"
          >
            <option value="">Default</option>
            <option value="">Newest</option>
            <option value="">Likes</option>
          </select>
        </label> */}
      </div>
      <ul role="list" className="space-y-6 mt-4">
        {supporters.map((supporter, idx) => (
          <li key={supporter.support_id} className="relative flex gap-x-4">
            <div
              className={classNames(
                idx === supporters.length - 1 ? "h-6" : "-bottom-6",
                "absolute left-0 top-0 flex w-6 justify-center"
              )}
            >
              <div className="w-px bg-green-400" />
            </div>
            {supporter.supporter_message ? (
              <>
                <div className="relative mt-3 h-6 w-6 flex-none rounded-full bg-gray-50" />
                <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                  <div className="flex justify-between gap-x-4">
                    <div className="py-0.5 text-xs leading-5 text-gray-200">
                      <span className="font-medium text-green-400">
                        <Username
                          username={supporter.username}
                          textColor={"#bbf7d0"}
                          outlineColor={"white"}
                          completedMissions={supporter.completed_missions}
                          recruits={supporter.recruits}
                          supports={supporter.supported_missions}
                        />
                      </span>{" "}
                    </div>
                    <time
                      dateTime={supporter.created_at}
                      className="flex-none py-0.5 text-xs leading-5 text-green-400"
                    >
                      {formatDistanceToNow(parseISO(supporter.created_at), {
                        addSuffix: true,
                      })}
                    </time>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm leading-6 text-gray-200 flex-1">
                      {supporter.supporter_message}
                    </p>
                    <p className="py-0.5 text-xs leading-5 text-green-400 ml-2">
                      ${supporter.funded}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="relative flex h-6 w-6 flex-none items-center justify-center ">
                  <div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
                </div>
                <p className="flex-auto py-0.5 text-sm leading-5 text-white">
                  <span className="font-medium text-green-400">
                    {/* {supporter.username} */}
                    <Username
                      username={supporter.username}
                      textColor={"#bbf7d0"}
                      outlineColor={"white"}
                      completedMissions={supporter.completed_missions}
                      recruits={supporter.recruits}
                      supports={supporter.supported_missions}
                    />
                  </span>{" "}
                  supported the mission with ${supporter.funded}
                </p>
                <time
                  dateTime={supporter.created_at}
                  className="flex-none py-0.5 text-xs leading-5 text-white"
                >
                  {formatDistanceToNow(parseISO(supporter.created_at), {
                    addSuffix: true,
                  })}
                </time>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
