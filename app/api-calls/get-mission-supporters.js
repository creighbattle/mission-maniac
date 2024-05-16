import { fetchAuthSession } from "aws-amplify/auth";

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
  //   const { data: currentData } = useUserStore();
  //   const { cursorId, cursorSortId } = useCursorStore();

  console.log("im runing here get user");

  if (!firstCall) {
    data = [...supporters];
  }

  if (firstCall) {
    cursorId = null;
    cursorSortId = null;
  }

  console.log("getting missions supporters");

  let sortBy = "created_at";
  let order = "DESC";
  let limit = 20;

  console.log(sortOption);

  switch (sortOption) {
    case "Oldest":
      order = "ASC";
      limit = 20;
      break;
    case "Funding":
      sortBy = "funds";
      break;
    default:
      break;
  }

  const url = new URL("http://10.0.0.222:3005/api/get-mission-supporters");

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

    setSupporters([...data, ...newData]);
  } catch (error) {
    setError(error.message);
  }
}
