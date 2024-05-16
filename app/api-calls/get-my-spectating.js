import { fetchAuthSession } from "aws-amplify/auth";

export default async function getMySpectating({
  firstCall,
  cursorId,
  setCursorId,
  setError,
  users,
  setUsers,
}) {
  let data = [];

  if (!firstCall) {
    data = [...users];
  }

  if (firstCall) {
    cursorId = null;
  }

  let order = "DESC";
  let limit = 10;

  //   console.log(sortOption);

  //   switch (sortOption) {
  //     case "Oldest":
  //       order = "ASC";
  //       limit = 10;
  //       break;
  //     case "Funding":
  //       sortBy = "funds";
  //       break;
  //     default:
  //       break;
  //   }

  let jwt;

  try {
    const authSession = await fetchAuthSession();
    jwt = authSession.tokens.accessToken.toString();
  } catch (error) {
    console.log(error);
    return new Error("Error fetching auth session");
  }

  const url = new URL("http://10.0.0.222:3005/api/get-my-spectating");

  url.searchParams.append("limit", limit);
  url.searchParams.append("cursorId", cursorId);
  url.searchParams.append("order", order);

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    if (!response.ok) {
      console.log("here is response");
      console.log(response);
      const { message } = await response.json();
      console.log(message);
      throw new Error(message);
    }

    const { data: newData, nextCursor } = await response.json();

    let cursorObject = null;

    if (nextCursor) {
      const decodedString = atob(nextCursor);
      cursorObject = JSON.parse(decodedString);
    }

    if (cursorObject) {
      setCursorId(cursorObject.spectate_id);
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

    console.log(newData);

    setUsers([...data, ...newData]);
  } catch (error) {
    console.error(error);
    setError(error.message);
  }
}
