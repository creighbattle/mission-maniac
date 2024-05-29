import toggleLike from "@/app/api-calls/toggle-like";
import Username from "@/app/global-components/Username";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useEffect, useState } from "react";

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

const throttledToggleLike = throttle(toggleLike, 2000);

export default function Comment({
  comment,
  username,
  setDeleteModalOpen,
  setCommentId,
}) {
  const [c, setC] = useState(comment);

  useEffect(() => {
    if (comment) {
      setC(comment);
    }
  }, [comment]);

  return (
    <li key={c.comment_id} className="flex-col py-5 border-b border-white">
      <div className="flex-auto">
        <div className="flex items-baseline justify-between gap-x-4">
          <Username
            username={c.username}
            textColor={"#bbf7d0"}
            outlineColor={"white"}
            completedMissions={c.completed_missions}
            recruits={c.recruits}
            supports={c.supported_missions}
          />
          <p className="flex-none text-xs text-gray-300">
            <time dateTime={c.created_at}>
              {" "}
              {formatDistanceToNow(parseISO(c.created_at), {
                addSuffix: true,
              })}
            </time>
          </p>
        </div>
        <p className="mt-1 text-sm leading-6 text-gray-300">
          {c.mission_comment}
        </p>
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center">
          <div
            className="flex items-center"
            onClick={async (e) => {
              e.stopPropagation();
              await throttledToggleLike({
                type: "comment",
                itemId: c.comment_id,
                item: c,
                setItem: setC,
              });
            }}
          >
            {c.user_has_liked && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-green-400"
              >
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            )}

            {!c.user_has_liked && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            )}
            <p className="text-white ml-2">{c.comment_likes}</p>
          </div>

          {username === c.username && (
            <div
              className="ml-4"
              onClick={() => {
                setCommentId(c.comment_id);
                setDeleteModalOpen(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#FB87A1"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </div>
          )}
        </div>
      </div>

      {comment.comment_replies > 0 && (
        <div className="text-green-400 mt-2 flex items-center text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
          <p>{comment.comment_replies} replies</p>
        </div>
      )}
    </li>
  );
}
