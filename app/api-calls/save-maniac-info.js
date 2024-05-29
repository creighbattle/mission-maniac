import { fetchAuthSession } from "aws-amplify/auth";

export default async function saveManiacInfo({
  minFund,
  acceptingMissions,
  bio,
  setShowNotification,
  setNTitle,
  setNMessage,
  setNError,
  setSaving,
}) {
  setSaving(true);
  let jwt;

  try {
    const authSession = await fetchAuthSession();
    jwt = authSession.tokens.idToken.toString();
  } catch (error) {
    return new Error("Error fetching auth session");
  }

  const url = new URL(process.env.NEXT_PUBLIC_WRITE_MANIAC_INFO);

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        minFund,
        acceptingMissions,
        bio,
      }),
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }

    setNError(false);
    setNTitle("Successfully saved!");
    setNMessage("Your profile has been updated.");

    const { message } = await response.json();
  } catch (error) {
    setNTitle("Uh oh!");
    setNMessage(error.message);
  } finally {
    setSaving(false);
    setShowNotification(true);
  }
}
