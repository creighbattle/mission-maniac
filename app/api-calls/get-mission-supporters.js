export default async function getMissionSupporters({
  firstCall,
  cursorId,
  cursorSortId,
  setCursorId,
  setCursorSortId,
  supporters,
  setSupporters,
  setError,
  sortOption,
  missionId,
}) {
  let data = [];

  if (!firstCall) {
    data = [...supporters];
  }

  if (firstCall) {
    setCursorId(null);
    setCursorSortId(null);
    cursorSortId = null;
    cursorId = null;
  }

  let sortBy = "created_at";
  let order = "DESC";
  let limit = 5;

  // switch (sortOption) {
  //   case "Oldest":
  //     order = "ASC";
  //     limit = 5;
  //     break;
  //   case "Funding":
  //     sortBy = "funds";
  //     break;
  //   default:
  //     break;
  // }

  const url = new URL(process.env.NEXT_PUBLIC_GET_MISSION_SUPPORTERS);

  url.searchParams.append("limit", limit);
  url.searchParams.append("sortBy", sortBy);
  url.searchParams.append("cursorId", cursorId);
  url.searchParams.append("cursorSortId", cursorSortId);
  url.searchParams.append("order", order);
  url.searchParams.append("missionId", missionId);

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
      setCursorId(cursorObject.supportId);
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

    setSupporters([...data, ...newData]);
  } catch (error) {
    setError(error.message);
  }
}
