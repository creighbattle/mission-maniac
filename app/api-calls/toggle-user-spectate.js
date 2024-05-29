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
  setOpen,
}) {
  setLoading(true);
  let jwt;

  try {
    const authSession = await fetchAuthSession();
    jwt = authSession.tokens.idToken.toString();
  } catch (error) {
    setOpen(true);
    setLoading(false);
    return new Error("Error fetching auth session");
  }

  const url = new URL(process.env.NEXT_PUBLIC_WRITE_TOGGLE_USER_SPECTATE);

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
