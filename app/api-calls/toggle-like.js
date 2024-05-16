import { fetchAuthSession } from "aws-amplify/auth";

export default async function toggleLike({ type, itemId, item, setItem }) {
  let jwt;

  console.log(type, itemId);

  const obj = { ...item };

  console.log(obj);

  if (obj.user_has_liked) {
    if (obj.mission_likes || obj.mission_likes === 0) {
      obj.mission_likes = parseFloat(obj.mission_likes) - 1;
    } else {
      console.log("running else");
      obj.comment_likes = parseFloat(obj.comment_likes) - 1;
    }
  } else {
    if (obj.mission_likes || obj.mission_likes === 0) {
      obj.mission_likes = parseFloat(obj.mission_likes) + 1;
    } else {
      obj.comment_likes = parseFloat(obj.comment_likes) + 1;
    }
  }

  obj.user_has_liked = !obj.user_has_liked;
  setItem(obj);

  try {
    const authSession = await fetchAuthSession();
    jwt = authSession.tokens.accessToken.toString();
  } catch (error) {
    console.log(error);
    return new Error("Error fetching auth session");
  }

  const url = new URL("http://10.0.0.222:3005/api/toggle-like");

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        type,
        itemId,
      }),
    });

    if (!response.ok) {
      console.log("im here");
      console.log(response);
      const { message } = await response.json();
      throw new Error(message);
    }

    const { message } = await response.json();

    console.log(message);
  } catch (error) {
    console.log(error);
  }
}
