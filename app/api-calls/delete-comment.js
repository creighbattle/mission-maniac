import { fetchAuthSession } from "aws-amplify/auth";

export default async function deleteComment({
  commentId,
  setLoading,
  setError,
}) {
  setLoading(true);
  setError("");

  let jwt;

  try {
    const authSession = await fetchAuthSession();
    jwt = authSession.tokens.idToken.toString();
  } catch (error) {
    return new Error("Error fetching auth session");
  }

  const url = new URL(process.env.NEXT_PUBLIC_DELETE_COMMENT);
  url.searchParams.append("commentId", commentId);

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "DELETE",
      mode: "cors",
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }

    return true;
  } catch (error) {
    setError(error.message);
    return false;
  } finally {
    setLoading(false);
  }
}
