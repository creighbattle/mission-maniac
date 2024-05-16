import { fetchAuthSession } from "aws-amplify/auth";

export default async function getMyRecruits({
  firstCall,
  missionStatusOption,
  cursorId,
  cursorSortId,
  setCursorId,
  setCursorSortId,
  setError,
  sortOption,
  recruits,
  setRecruits,
}) {
  let data = [];

  if (!firstCall) {
    data = [...recruits];
  }

  if (firstCall) {
    cursorId = null;
    cursorSortId = null;
  }

  let missionStatus = "pending";
  let sortBy = "created_at";
  let order = "DESC";
  let limit = 10;

  switch (sortOption) {
    case "Oldest":
      order = "ASC";
      limit = 10;
      break;
    case "Funding":
      sortBy = "funds";
      break;
    default:
      break;
  }

  switch (missionStatusOption) {
    case "Active Recruits":
      missionStatus = "active";
      break;
    case "Completed Recruits":
      missionStatus = "completed";
      break;
    case "Pending Recruits":
      missionStatus = "pending";
      break;
    case "Declined Recruits":
      missionStatus = "declined";
      break;
    case "Aborted Recruits":
      missionStatus = "aborted";
    default:
      break;
  }

  let jwt;

  try {
    const authSession = await fetchAuthSession();
    jwt = authSession.tokens.accessToken.toString();
  } catch (error) {
    console.log(error);
    return new Error("Error fetching auth session");
  }

  const url = new URL("http://10.0.0.222:3005/api/get-my-recruits");
  url.searchParams.append("missionStatus", missionStatus);
  url.searchParams.append("limit", limit);
  url.searchParams.append("sortBy", sortBy);
  url.searchParams.append("cursorId", cursorId);
  url.searchParams.append("cursorSortId", cursorSortId);
  url.searchParams.append("order", order);

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

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
      newData.length > 1 &&
      !firstCall &&
      sortBy === "created_at" &&
      order === "ASC"
    ) {
      newData.shift();
    }

    setRecruits([...data, ...newData]);
  } catch (error) {
    setError(error.message);
  }
}
