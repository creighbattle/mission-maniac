import { fetchAuthSession } from "aws-amplify/auth";

export default async function toggleLike({
  type,
  itemId,
  item,
  setItem,
  setOpen,
}) {
  let jwt;

  try {
    const authSession = await fetchAuthSession();
    jwt = authSession.tokens.idToken.toString();
  } catch (error) {
    setOpen(true);
    return new Error("Error fetching auth session");
  }

  const obj = { ...item };

  if (obj.user_has_liked) {
    if (obj.mission_likes || obj.mission_likes === 0) {
      obj.mission_likes = parseFloat(obj.mission_likes) - 1;
    } else {
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

  const url = new URL(process.env.NEXT_PUBLIC_WRITE_TOGGLE_LIKE);

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
      const { message } = await response.json();
      throw new Error(message);
    }

    const { message } = await response.json();
  } catch (error) {}
}
