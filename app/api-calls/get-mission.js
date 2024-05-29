import { fetchUserAttributes } from "aws-amplify/auth";

export default async function getMission({
  missionId,
  setMission,
  setUser,
  setError,
  setRecruiter,
}) {
  let username = "";
  try {
    const userAttributes = await fetchUserAttributes();
    username = userAttributes.preferred_username;
  } catch (error) {}

  const url = new URL(process.env.NEXT_PUBLIC_GET_MISSION);
  url.searchParams.append("missionId", missionId);
  url.searchParams.append("username", username);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }

    const { data, user, recruiter } = await response.json();

    setMission(data);
    if (user) {
      setUser(user);
    } else {
      setUser("deleted");
    }

    setRecruiter(recruiter);
    return true;
  } catch (error) {
    setError(error.message);
    return false;
  }
}
