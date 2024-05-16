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
    jwt = authSession.tokens.accessToken.toString();
  } catch (error) {
    console.log(error);
    return new Error("Error fetching auth session");
  }

  const url = new URL("http://10.0.0.222:3005/api/delete-comment");
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
      console.log(response);
      const { message } = await response.json();
      throw new Error(message);
    }

    return true;
  } catch (error) {
    console.log(error);
    console.log(error.message);
    setError(error.message);
    return false;
  } finally {
    setLoading(false);
  }
}
