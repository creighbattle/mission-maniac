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
    setCursorId(null);
    cursorId = null;
  }

  let order = "DESC";
  let limit = 10;

  let jwt;

  try {
    const authSession = await fetchAuthSession();
    jwt = authSession.tokens.idToken.toString();
  } catch (error) {
    return new Error("Error fetching auth session");
  }

  const url = new URL(process.env.NEXT_PUBLIC_GET_MY_SPECTATING);

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

    setUsers([...data, ...newData]);
  } catch (error) {
    setError(error.message);
  }
}
