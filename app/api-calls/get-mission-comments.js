import { fetchAuthSession, fetchUserAttributes } from "aws-amplify/auth";

export default async function getMissionComments({
  firstCall,
  cursorId,
  cursorSortId,
  setCursorId,
  setCursorSortId,
  comments,
  setComments,
  setError,
  sortOption,
  missionId,
}) {
  let data = [];

  if (!firstCall) {
    data = [...comments];
  }

  if (firstCall) {
    cursorId = null;
    cursorSortId = null;
  }

  let sortBy = "created_at";
  let order = "DESC";
  let limit = 10;

  console.log(sortOption);

  switch (sortOption) {
    case "Oldest":
      order = "ASC";
      limit = 2;
      break;
    case "Likes":
      sortBy = "comment_likes";
      break;
    default:
      break;
  }

  let username;

  try {
    const userAttributes = await fetchUserAttributes();
    username = userAttributes.preferred_username;
  } catch (error) {
    console.log(error);
    return new Error("Error fetching auth session");
  }

  const url = new URL("http://10.0.0.222:3005/api/get-mission-comments");

  url.searchParams.append("limit", limit);
  url.searchParams.append("sortBy", sortBy);
  url.searchParams.append("cursorId", cursorId);
  url.searchParams.append("cursorSortId", cursorSortId);
  url.searchParams.append("order", order);
  url.searchParams.append("missionId", missionId);
  url.searchParams.append("currentUsername", username);

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

    console.log(newData);
    console.log(cursorObject);

    setComments([...data, ...newData]);
  } catch (error) {
    setError(error.message);
  }
}
