"use client";
import { useState } from "react";
import RequestModal from "./RequestModal";

const MissionRequest = ({ handleClick }) => {
  return (
    <div
      className="py-4 px-2 border-green-400 border-t rounded-t-lg text-sm tracking-wide leading-5"
      onClick={handleClick}
    >
      <div className="flex items-center justify-between">
        <p>Recruiter: </p>
        <p>@creighbattle</p>
      </div>
      <div className="flex items-center justify-between mt-2">
        <p>Recruited: </p>
        <p>2 days ago</p>
      </div>
      <div className="flex items-center justify-between mt-2">
        <p>Fund: </p>
        <p>$10</p>
      </div>
      <div className="mt-2">
        <p>Mission: </p>
        <p className="ml-2 line-clamp-3">
          Win a game while only building one item in high elo.
        </p>
      </div>
      {/* <div className="">
        <p>Message: </p>
        <p className="ml-2 line-clamp-3">
          Hey Pekin, been a spectator fan for too long. Love your content.
        </p>
      </div> */}
    </div>
  );
};

export default function Requests() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between mt-4">
        <p className="text-white text-lg font-semibold">Missions Requests</p>
        <label htmlFor="" className="text-white text-lg font-semibold">
          Sort By:
          <select
            name=""
            id=""
            className="bg-white text-black ml-2 text-sm font-normal outline-none"
          >
            <option value="">Default</option>
            <option value="">Newest</option>
            <option value="">Funds</option>
          </select>
        </label>
      </div>

      <div className="mt-4">
        <MissionRequest handleClick={() => setOpen(true)} />
        <MissionRequest handleClick={() => setOpen(true)} />
        <MissionRequest handleClick={() => setOpen(true)} />
        <MissionRequest handleClick={() => setOpen(true)} />
      </div>
      <RequestModal open={open} setOpen={setOpen} />
    </>
  );
}
