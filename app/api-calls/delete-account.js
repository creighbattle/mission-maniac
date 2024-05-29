import { fetchAuthSession } from "aws-amplify/auth";

export default async function deleteAccount({ setLoading, setError }) {
  let jwt;
  setLoading(true);

  try {
    const authSession = await fetchAuthSession();
    jwt = authSession.tokens.idToken.toString();
  } catch (error) {
    return new Error("Error fetching auth session");
  }

  const url = new URL(process.env.NEXT_PUBLIC_DELETE_ACCOUNT);

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
    setError("Failed to delete your account. Please try again.");
    return false;
  } finally {
    setLoading(false);
  }
}
