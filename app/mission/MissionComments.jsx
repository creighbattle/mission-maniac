import CommentTextbox from "./CommentTextbox";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const mission = {
  createdBy: "@creighbattle",
  imageUrl:
    "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  mission:
    "Play kayn jg in high elo. Play kayn jg in high elo. Play kayn jg in high elo. Play kayn jg in high elo. Play kayn jg in high elo. Play kayn jg in high elo. Play kayn jg in high elo.",
  message: "Hey Pekin, love your content!",
  total: 8,
  totalNeeded: 20,
  missionLikes: 104,
  expireAt: "10:00 am |June 6th | 2024",
  status: "active",
  funding: 38,
  fundingRequirement: 50,
  missionFiles: ["https://www.youtube.com/"],
  assignedTo: "pekinwoof",
  afterReport: "Thanks guys that was fun!",
  commentCount: 32,
};

// const comments = [
//     {
//         name: '@creighbattle',
//         time: '41 minutes ago',
//         likes: 34,
//         replies: [],

//     }
// ]

const comments = [
  {
    id: 1,
    name: "@lesliealexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    content:
      "Explicabo nihil laborum. Saepe facilis consequuntur in eaque. Consequatur perspiciatis quam. Sed est illo quia. Culpa vitae placeat vitae. Repudiandae sunt exercitationem nihil nisi facilis placeat minima eveniet.",
    date: "1d ago",
    dateTime: "2023-03-04T15:54Z",
  },
  {
    id: 2,
    name: "@michaelfoster",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    content:
      "Laudantium quidem non et saepe vel sequi accusamus consequatur et. Saepe inventore veniam incidunt cumque et laborum nemo blanditiis rerum. A unde et molestiae autem ad. Architecto dolor ex accusantium maxime cumque laudantium itaque aut perferendis.",
    date: "2d ago",
    dateTime: "2023-03-03T14:02Z",
  },
  {
    id: 3,
    name: "@driesvincent",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    content:
      "Quia animi harum in quis quidem sint. Ipsum dolorem molestias veritatis quis eveniet commodi assumenda temporibus. Dicta ut modi alias nisi. Veniam quia velit et ut. Id quas ducimus reprehenderit veniam fugit amet fugiat ipsum eius. Voluptas nobis earum in in vel corporis nisi.",
    date: "2d ago",
    dateTime: "2023-03-03T13:23Z",
  },
  {
    id: 4,
    name: "@lindsaywalton",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    content:
      "Unde dolore exercitationem nobis reprehenderit rerum corporis accusamus. Nemo suscipit temporibus quidem dolorum. Nobis optio quae atque blanditiis aspernatur doloribus sit accusamus. Sunt reiciendis ut corrupti ab debitis dolorem dolorem nam sit. Ducimus nisi qui earum aliquam. Est nam doloribus culpa illum.",
    date: "3d ago",
    dateTime: "2023-03-02T21:13Z",
  },
];

export default function MissionComments() {
  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between">
        <p className="text-white text-lg font-semibold">
          {mission.commentCount} Comments
        </p>
        <label htmlFor="" className="text-white text-lg font-semibold">
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
        </label>
      </div>
      <CommentTextbox />
      <ul role="list" className="divide-y divide-gray-100">
        {comments.map((comment) => (
          <li key={comment.id} className="flex-col py-5">
            {/* <img
              className="h-12 w-12 flex-none rounded-full bg-gray-50"
              src={comment.imageUrl}
              alt=""
            /> */}
            <div className="flex-auto">
              <div className="flex items-baseline justify-between gap-x-4">
                <p className="text-sm font-semibold leading-6 text-white">
                  {comment.name}
                </p>
                <p className="flex-none text-xs text-gray-600">
                  <time dateTime={comment.dateTime}>{comment.date}</time>
                </p>
              </div>
              <p className="mt-1 text-sm leading-6 text-gray-300">
                {comment.content}
              </p>
            </div>

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center">
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
                <p className="text-white ml-2">7</p>
              </div>

              <p className="text-white">Reply</p>
            </div>
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
              <p>3 replies</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
