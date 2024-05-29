import getMySpectating from "@/app/api-calls/get-my-spectating";
import { useEffect, useState } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import Username from "@/app/global-components/Username";
import { useRouter } from "next/navigation";

export default function Spectate({}) {
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [cursorId, setCursorId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    getMySpectating({
      firstCall: true,
      cursorId,
      setCursorId,
      users,
      setUsers,
      setError,
    });
  }, []);

  return (
    <div>
      <ul role="list" className="divide-y divide-gray-100">
        {users.map((user, index) => {
          const parsedDate = parseISO(user.created_at);

          return (
            <li
              key={index}
              className="flex justify-between py-5"
              onClick={() => router.push(`/${user.username}`)}
            >
              <div className="flex items-center justify-center">
                <Username
                  username={user.username}
                  textColor={"#bbf7d0"}
                  outlineColor={"white"}
                  completedMissions={user.completed_missions}
                  recruits={user.recruits}
                  supports={user.supported_missions}
                />
              </div>

              <p className="mt-1 text-xs leading-5 text-white">
                <time dateTime={user.created_at}>
                  {formatDistanceToNow(parsedDate, { addSuffix: true })}
                </time>
              </p>
            </li>
          );
        })}
      </ul>

      {users.length === 0 && (
        <p className="text-white mt-10 text-center">
          You are not spectating anyone as of now.
        </p>
      )}
    </div>
  );
}
