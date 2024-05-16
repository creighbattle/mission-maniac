import { fetchAuthSession } from "aws-amplify/auth";

export default async function toggleUserSpectate({
  profileUsername,
  setLoading,
  setNError,
  setNTitle,
  setNMessage,
  setShowNotification,
  spectating,
  setUser,
  user,
}) {
  setLoading(true);
  let jwt;

  try {
    const authSession = await fetchAuthSession();
    jwt = authSession.tokens.accessToken.toString();
  } catch (error) {
    console.log(error);
    return new Error("Error fetching auth session");
  }

  const url = new URL("http://10.0.0.222:3005/api/toggle-user-spectate");

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        profileUsername,
      }),
    });

    if (!response.ok) {
      console.log("im here");
      console.log(response);
      const { message } = await response.json();
      throw new Error(message);
    }

    const tmp = { ...user };

    if (spectating) {
      setNError(false);
      setNTitle("Spectating");
      setNMessage(`You are now spectating @${profileUsername}.`);
      tmp.spectators = parseInt(tmp.spectators) + 1;
    } else {
      setNError(false);
      setNTitle("Spectating");
      setNMessage(`You are no longer spectating @${profileUsername}.`);
      tmp.spectators = parseInt(tmp.spectators) - 1;
    }

    tmp.is_spectating = !tmp.is_spectating;

    setUser(tmp);

    return true;
  } catch (error) {
    console.log(error);
    setError(error.message);
    setNError(true);
    setNTitle("Uh oh");
    setNMessage(error.message);
    return false;
  } finally {
    setLoading(false);
    setShowNotification(true);
  }
}
