import useUserStore from "@/app/stores/userStore";
import { useEffect, useState } from "react";
import DeleteAccountModal from "./DeleteAccountModal";
import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import saveManiacInfo from "@/app/api-calls/save-maniac-info";
import useNotificationStore from "@/app/stores/notificationStore";
import { ClipLoader } from "react-spinners";
import Notification from "@/app/global-components/Notification";

const MAX_BIO_LENGTH = 500;

export default function Settings() {
  const { user } = useUserStore();
  const router = useRouter();

  const [bio, setBio] = useState("");
  const [bioLength, setBioLength] = useState(0);
  const [open, setOpen] = useState(false);
  const { setShowNotification, setNTitle, setNMessage, setNError } =
    useNotificationStore();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const initialBio = user?.bio ? user.bio : "";
      setBio(initialBio);
      setBioLength(initialBio.length);
    }
  }, [user]);

  const handleSaveBio = async () => {
    const response = await saveManiacInfo({
      bio,
      setSaving,
      setShowNotification,
      setNTitle,
      setNMessage,
      setNError,
    });
  };

  const handleBioChange = (e) => {
    const newBio = e.target.value;
    if (newBio.length <= MAX_BIO_LENGTH) {
      setBio(newBio);
      setBioLength(newBio.length);
    }
  };

  return (
    <div className="px-4 text-white text-md mt-4">
      <Notification />
      <DeleteAccountModal open={open} setOpen={setOpen} />
      <p className="text-green-400">Username:</p>
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
      <p className="text-green-400 mt-2">Bio:</p>
      <div className="mt-2 ml-2 relative">
        <textarea
          rows={4}
          name="comment"
          id="comment"
          className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 outline-none caret-green-400"
          value={bio}
          onChange={handleBioChange}
        />
        <p className="text-sm text-gray-400 mt-1">
          {bioLength} / {MAX_BIO_LENGTH} characters
        </p>
        <button
          onClick={handleSaveBio}
          className="absolute bottom-8 right-2 bg-green-400 px-3 py-1 rounded-lg font-medium text-black"
        >
          {!saving ? (
            "Save"
          ) : (
            <ClipLoader
              color={"black"}
              loading={saving}
              size={25}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          )}
        </button>
      </div>

      <div className="mt-10 flex justify-between">
        <button
          className="bg-gray-400 px-3 py-1 rounded-lg font-medium text-black"
          onClick={async () => {
            try {
              setLoading(true);
              await signOut();
              router.push("/signin");
            } catch (error) {
            } finally {
              setLoading(false);
            }
          }}
        >
          {!loading ? (
            "Logout"
          ) : (
            <ClipLoader
              color={"black"}
              loading={loading}
              size={25}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          )}
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
