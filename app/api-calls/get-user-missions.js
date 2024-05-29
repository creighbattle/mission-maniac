import { fetchUserAttributes } from "aws-amplify/auth";

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
  setLoading,
}) {
  if (firstCall) {
    setCursorId(null);
    setCursorSortId(null);
    setLoading(true);
    cursorSortId = null;
    cursorId = null;
  }
  let data = [];

  if (!firstCall) {
    data = [...missions];
  }

  let missionStatus = "pending";
  let sortBy = "created_at";
  let order = "DESC";
  let limit = 1;

  switch (sortOption) {
    case "Oldest":
      order = "ASC";
      limit = 10;
      break;
    case "Funding":
      sortBy = "funds";
      break;
    case "Likes":
      sortBy = "mission_likes";
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
    // return new Error("Error fetching auth session");
  }

  const url = new URL(process.env.NEXT_PUBLIC_GET_USER_MISSIONS);
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

    let cursorObject = null;

    if (nextCursor) {
      const decodedString = atob(nextCursor);
      cursorObject = JSON.parse(decodedString);
    }

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

    setMissions([...data, ...newData]);
  } catch (error) {
    setError(error.message);
  } finally {
    if (firstCall) {
      setLoading(false);
    }
  }
}
