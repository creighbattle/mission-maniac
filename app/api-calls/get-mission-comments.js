import { fetchUserAttributes } from "aws-amplify/auth";

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
  setLoading,
}) {
  if (firstCall) {
    setLoading(true);
    setCursorId(null);
    setCursorSortId(null);
    cursorSortId = null;
    cursorId = null;
  }

  let data = [];

  if (!firstCall) {
    data = [...comments];
  }

  let sortBy = "created_at";
  let order = "DESC";
  let limit = 2;

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
    //return new Error("Error fetching auth session");
  }

  const url = new URL(process.env.NEXT_PUBLIC_GET_MISSION_COMMENTS);

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

    let cursorObject = null;

    if (nextCursor) {
      const decodedString = atob(nextCursor);
      cursorObject = JSON.parse(decodedString);
    }

    if (cursorObject) {
      setCursorId(cursorObject.commentId);
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

    setComments([...data, ...newData]);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
}
