export default function RequestInfo() {
  return (
    <div className="py-4 px-2  rounded-t-lg text-md text-white tracking-wide leading-7">
      <div className="flex justify-center text-lg font-medium">
        <h3 className="text-green-400">Mission Details</h3>
      </div>
      <div className="flex items-center justify-between mt-5">
        <p className="text-green-400">Recruiter: </p>
        <p>@creighbattle</p>
      </div>
      <div className="flex items-center justify-between mt-2">
        <p className="text-green-400">Recruited: </p>
        <p>2 days ago</p>
      </div>
      <div className="flex items-center justify-between mt-2">
        <p className="text-green-400">Fund: </p>
        <p>$10</p>
      </div>
      <div className="mt-2">
        <p className="text-green-400">Mission: </p>
        <p className="ml-2 line-clamp-3">
          Win a game while only building one item in high elo.
        </p>
      </div>
      <div className="mt-2">
        <p className="text-green-400">Message: </p>
        <p className="ml-2 line-clamp-3">
          Hey Pekin, been a spectator fan for too long. Love your content.
        </p>
      </div>

      <div className="flex mt-5">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          onClick={() => setView(1)}
        >
          Decline
        </button>

        <button
          type="button"
          className="inline-flex w-full justify-center ml-5 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          onClick={() => setView(1)}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
