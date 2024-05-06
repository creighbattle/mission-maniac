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
};

export default function MissionReport() {
  return (
    <>
      <div className="px-4 text-white text-md mt-4">
        <p className=" text-green-400">Recruiter:</p>
        <p className="pl-3">{mission.createdBy}</p>
        <p className=" mt-2 text-green-400">Mission:</p>
        <p className="pl-3 leading-6">{mission.mission}</p>
        <p className=" mt-2 text-green-400">Status:</p>
        <p className="pl-3">{mission.status}</p>
        <p className=" mt-2 text-green-400">Mission Files:</p>
        {mission.missionFiles.map((el, idx) => {
          return (
            <a className="pl-3" key={idx} href={el}>
              {el}
            </a>
          );
        })}
        <p className=" mt-2 text-green-400">{mission.assignedTo} report:</p>
        <p className="pl-3">{mission.afterReport}</p>
        <p className=" mt-2 text-green-400">Funding:</p>
        <p className="pl-3">${mission.funding}</p>
        <p className=" mt-2 text-green-400">Funding Requirement:</p>
        <p className="pl-3">${mission.fundingRequirement}</p>
      </div>
    </>
  );
}
