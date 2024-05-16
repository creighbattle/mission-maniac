import useUserStore from "@/app/stores/userStore";
import { useEffect, useState } from "react";
import DeleteAccountModal from "./DeleteAccountModal";

export default function Settings() {
  const { user } = useUserStore();

  const [bio, setBio] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setBio(user?.bio ? user.bio : "");
    }
  }, [user]);

  return (
    <div className="px-4 text-white text-md mt-4">
      <DeleteAccountModal open={open} setOpen={setOpen} />
      <p className=" text-green-400">Username:</p>
      <div className="mt-2 ml-2">
        <input
          type="text"
          name="text"
          defaultValue={`@${user.username}`}
          disabled
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6 outline-none caret-green-400 pl-2"
          placeholder="you@example.com"
        />
      </div>
      <p className=" text-green-400 mt-2">Bio:</p>
      <div className="mt-2 ml-2 relative">
        <textarea
          rows={4}
          name="comment"
          id="comment"
          className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 outline-none caret-green-400"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <button className="absolute bottom-2 right-2 bg-green-400 px-3 py-1 rounded-lg font-medium text-black">
          Save
        </button>
      </div>

      <div className="mt-10 flex justify-between">
        <button className="bg-gray-400 px-3 py-1 rounded-lg font-medium text-black">
          Logout
        </button>
        <button
          onClick={() => setOpen(true)}
          className="bg-red-400 px-3 py-1 rounded-lg font-medium text-black"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
