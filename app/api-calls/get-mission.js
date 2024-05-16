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

  const url = new URL("http://10.0.0.222:3005/api/get-mission");
  url.searchParams.append("missionId", missionId);
  url.searchParams.append("username", username);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }

    const { data, user, recruiter } = await response.json();

    console.log(data);

    setMission(data);
    setUser(user);
    setRecruiter(recruiter);

    console.log(recruiter);
  } catch (error) {
    setError(error.message);
  }
}
