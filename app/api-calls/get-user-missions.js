import { fetchAuthSession, fetchUserAttributes } from "aws-amplify/auth";

export default async function getUserMissions({
  firstCall,
  missionStatusOption,
  cursorId,
  cursorSortId,
  setCursorId,
  setCursorSortId,
  username,
  setError,
  sortOption,
  missions,
  setMissions,
}) {
  let data = [];

  console.log("im runing here get user");

  if (!firstCall) {
    console.log("running");
    data = [...missions];
  }

  if (firstCall) {
    cursorId = null;
    cursorSortId = null;
  }

  let missionStatus = "pending";
  let sortBy = "created_at";
  let order = "DESC";
  let limit = 1;

  console.log(sortOption);

  switch (sortOption) {
    case "Oldest":
      order = "ASC";
      limit = 2;
      break;
    case "Funding":
      sortBy = "funds";
      break;
    default:
      break;
  }

  switch (missionStatusOption) {
    case "Active Missions":
      missionStatus = "active";
      break;
    case "Completed Missions":
      missionStatus = "completed";
      break;
    case "Expired Missions":
      missionStatus = "expired";
      break;
    case "Aborted Missions":
      missionStatus = "aborted";
    default:
      break;
  }

  let currentUsername;

  try {
    const userAttributes = await fetchUserAttributes();
    currentUsername = userAttributes.preferred_username;
  } catch (error) {
    console.log(error);
    return new Error("Error fetching auth session");
  }

  const url = new URL("http://10.0.0.222:3005/api/get-user-missions");
  url.searchParams.append("missionStatus", missionStatus);
  url.searchParams.append("limit", limit);
  url.searchParams.append("sortBy", sortBy);
  url.searchParams.append("cursorId", cursorId);
  url.searchParams.append("cursorSortId", cursorSortId);
  url.searchParams.append("order", order);
  url.searchParams.append("username", username);
  url.searchParams.append("currentUsername", currentUsername);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }

    const { data: newData, nextCursor } = await response.json();

    const decodedString = atob(nextCursor);
    const cursorObject = JSON.parse(decodedString);

    if (cursorObject) {
      setCursorId(cursorObject.missionId);
      setCursorSortId(cursorObject.cursorSortId);
    } else {
      setCursorId(null);
    }

    if (
      newData.length > 0 &&
      !firstCall &&
      sortBy === "created_at" &&
      order === "ASC"
    ) {
      newData.shift();
    }

    console.log("data here:");
    console.log(newData);

    console.log(data);

    setMissions([...data, ...newData]);
  } catch (error) {
    setError(error.message);
  }
}
