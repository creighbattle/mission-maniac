import { fetchAuthSession } from "aws-amplify/auth";

export default async function deleteMissionRequest({
  missionId,
  setLoading,
  setError,
  setNError,
  setNTitle,
  setNMessage,
  setShowNotification,
  setOpen,
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

  const url = new URL(process.env.NEXT_PUBLIC_DELETE_MISSION_REQUEST);
  url.searchParams.append("missionId", missionId);

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

    setNError(false);
    setNTitle("Mission Request Deleted");
    setNMessage("The mission request has been successfully deleted.");
    setShowNotification(true);
    setOpen(false);

    return true;
  } catch (error) {
    setError(error.message);
    return false;
  } finally {
    setLoading(false);
  }
}
