// import getMySpectating from "@/app/api-calls/get-my-spectating";
// import { useEffect, useState } from "react";

// export default function Spectate({}) {
//   const [error, setError] = useState("");
//   const [users, setUsers] = useState([]);
//   const [cursorId, setCursorId] = useState(null);

//   useEffect(() => {
//     getMySpectating({
//       firstCall: true,
//       cursorId,
//       setCursorId,
//       users,
//       setUsers,
//       setError,
//     });
//   }, []);

//   return (
//     <div>
//       <p className="text-white">spectate</p>
//       <ul role="list" className="divide-y divide-gray-100">
//         {users.map((user) => (
//           <li key={user.user_id} className="flex justify-between py-5">
//             <div className="flex items-center justify-center">
//               <p className="text-sm font-semibold leading-6 text-white">
//                 @{user.username}
//               </p>
//             </div>

//             <p className="mt-1 text-xs leading-5 text-white">
//               Spectating for{" "}
//               <time dateTime={user.created_at}>{user.created_at}</time>
//             </p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import getMySpectating from "@/app/api-calls/get-my-spectating";
import { useEffect, useState } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";

export default function Spectate({}) {
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [cursorId, setCursorId] = useState(null);

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
        {users.map((user) => {
          const parsedDate = parseISO(user.created_at);
          console.log(
            `Username: ${user.username}, Created At: ${user.created_at}, Parsed Date: ${parsedDate}`
          );

          return (
            <li key={user.username} className="flex justify-between py-5">
              <div className="flex items-center justify-center">
                <p className="text-sm font-semibold leading-6 text-white">
                  @{user.username}
                </p>
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
