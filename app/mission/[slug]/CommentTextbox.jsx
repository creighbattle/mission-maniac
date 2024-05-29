"use client";
import { useState } from "react";
import {
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { ClipLoader } from "react-spinners";
import useNotificationStore from "@/app/stores/notificationStore";
import { fetchAuthSession } from "aws-amplify/auth";
import useUserStore from "@/app/stores/userStore";

const moods = [
  {
    name: "Excited",
    value: "excited",
    icon: FireIcon,
    iconColor: "text-white",
    bgColor: "bg-red-500",
  },
  {
    name: "Loved",
    value: "loved",
    icon: HeartIcon,
    iconColor: "text-white",
    bgColor: "bg-pink-400",
  },
  {
    name: "Happy",
    value: "happy",
    icon: FaceSmileIcon,
    iconColor: "text-white",
    bgColor: "bg-green-400",
  },
  {
    name: "Sad",
    value: "sad",
    icon: FaceFrownIcon,
    iconColor: "text-white",
    bgColor: "bg-yellow-400",
  },
  {
    name: "Thumbsy",
    value: "thumbsy",
    icon: HandThumbUpIcon,
    iconColor: "text-white",
    bgColor: "bg-blue-500",
  },
  {
    name: "I feel nothing",
    value: null,
    icon: XMarkIcon,
    iconColor: "text-gray-400",
    bgColor: "bg-transparent",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CommentTextbox({
  comments,
  setComments,
  setMissionCommentCount,
  missionCommentCount,
}) {
  const [selected, setSelected] = useState(moods[5]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const { mission, setSignInOpen, user } = useUserStore();
  const { setShowNotification, setNTitle, setNMessage, setNError } =
    useNotificationStore();

  const handleSubmit = async (e) => {
    if (loading) return;

    e.preventDefault();
    setLoading(true);

    let jwt;

    try {
      const authSession = await fetchAuthSession();
      jwt = authSession.tokens.idToken.toString();
    } catch (error) {
      setSignInOpen(true);
      setLoading(false);
      return new Error("Error fetching auth session");
    }

    const res = await fetch(process.env.NEXT_PUBLIC_WRITE_MISSION_COMMENT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        missionId: mission.mission_id,
        missionComment: text,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      setShowNotification(true);
      setNError(true);
      setNTitle("Uh oh!");
      if (result.message === "You have already commented on this mission.") {
        setNMessage(result.message);
      } else {
        setNMessage(
          "We had trouble uploading your comment. Please try again in a bit."
        );
      }
    } else {
      setShowNotification(true);
      setNError(false);
      setNTitle("Comment Uploaded");
      setNMessage("Your comment has been successfully uploaded");
      setText("");
      const {
        username,
        completed_missions,
        supported_missions,
        recruits,
        missionId,
        comment_id,
        created_at,
      } = result;
      const comment = {
        username,
        completed_missions,
        supported_missions,
        recruits,
        mission_id: missionId,
        comment_id,
        user_has_liked: false,
        created_at,
        comment_likes: 0,
        mission_comment: text,
      };

      const tmp = [...comments];
      tmp.unshift(comment);
      setComments(tmp);
      setMissionCommentCount(missionCommentCount + 1);
    }

    setLoading(false);
  };

  return (
    <div className="flex items-start space-x-4 mt-4 outline-none">
      <div className="min-w-0 flex-1">
        <form action="#" className="relative" onSubmit={handleSubmit}>
          <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-green-400">
            <label htmlFor="comment" className="sr-only">
              Add your comment
            </label>
            <textarea
              rows={text ? 5 : 1}
              name="comment"
              id="comment"
              className="block w-full resize-none border-0 bg-transparent py-1.5 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 px-3 caret-green-400 outline-none"
              placeholder="Add your comment..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            {/* Spacer element to match the height of the toolbar */}
            <div className="py-2" aria-hidden="true">
              {/* Matches height of button in toolbar (1px border + 36px content height) */}
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>
          {text && (
            <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
              {/* <div className="flex items-center space-x-5">
                <div className="flex items-center">
                  <button
                    type="button"
                    className="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
                  >
                    <PaperClipIcon className="h-5 w-5" aria-hidden="true" />
                    <span className="sr-only">Attach a file</span>
                  </button>
                </div>
                <div className="flex items-center">
                  <Listbox value={selected} onChange={setSelected}>
                    {({ open }) => (
                      <>
                        <Listbox.Label className="sr-only">
                          Your mood
                        </Listbox.Label>
                        <div className="relative">
                          <Listbox.Button className="relative -m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                            <span className="flex items-center justify-center">
                              {selected.value === null ? (
                                <span>
                                  <FaceSmileIcon
                                    className="h-5 w-5 flex-shrink-0"
                                    aria-hidden="true"
                                  />
                                  <span className="sr-only">Add your mood</span>
                                </span>
                              ) : (
                                <span>
                                  <span
                                    className={classNames(
                                      selected.bgColor,
                                      "flex h-8 w-8 items-center justify-center rounded-full"
                                    )}
                                  >
                                    <selected.icon
                                      className="h-5 w-5 flex-shrink-0 text-white"
                                      aria-hidden="true"
                                    />
                                  </span>
                                  <span className="sr-only">
                                    {selected.name}
                                  </span>
                                </span>
                              )}
                            </span>
                          </Listbox.Button>

                          <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute z-10 -ml-6 mt-1 w-60 rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm">
                              {moods.map((mood) => (
                                <Listbox.Option
                                  key={mood.value}
                                  className={({ active }) =>
                                    classNames(
                                      active ? "bg-gray-100" : "bg-white",
                                      "relative cursor-default select-none px-3 py-2"
                                    )
                                  }
                                  value={mood}
                                >
                                  <div className="flex items-center">
                                    <div
                                      className={classNames(
                                        mood.bgColor,
                                        "flex h-8 w-8 items-center justify-center rounded-full"
                                      )}
                                    >
                                      <mood.icon
                                        className={classNames(
                                          mood.iconColor,
                                          "h-5 w-5 flex-shrink-0"
                                        )}
                                        aria-hidden="true"
                                      />
                                    </div>
                                    <span className="ml-3 block truncate font-medium">
                                      {mood.name}
                                    </span>
                                  </div>
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </>
                    )}
                  </Listbox>
                </div>
              </div> */}
              <div></div>
              <div className="flex-shrink-0">
                <button
                  type="submit"
                  className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
                >
                  {!loading ? (
                    "Post"
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
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
