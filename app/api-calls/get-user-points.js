import { fetchAuthSession } from "aws-amplify/auth";
import useUserStore from "../stores/userStore";

export default async function getUserPoints({ setMissionPoints }) {
  let jwt;

  try {
    const authSession = await fetchAuthSession();
    jwt = authSession.tokens.idToken.toString();
  } catch (error) {
    return;
  }

  const url = new URL(process.env.NEXT_PUBLIC_GET_MISSION_POINTS);

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    if (!response.ok) {
      setMissionPoints(-555);
      return;
    }

    const { mission_points } = await response.json();

    setMissionPoints(mission_points);
    return;
  } catch (error) {
    setMissionPoints(-555);
  }
}
