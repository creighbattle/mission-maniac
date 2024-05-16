import { fetchAuthSession } from "aws-amplify/auth";

export default async function toggleVote({
  mission_id,
  vote,
  mission,
  setMission,
}) {
  let jwt;

  if (vote === mission.user_vote) return;

  try {
    const authSession = await fetchAuthSession();
    jwt = authSession.tokens.accessToken.toString();
  } catch (error) {
    console.log(error);
    return new Error("Error fetching auth session");
  }

  const obj = { ...mission };

  if (obj.user_vote === "honor" && vote === "dishonor") {
    obj.user_vote = "dishonor";
    obj.honors = parseInt(obj.honors) - 1;
    obj.dishonors = parseInt(obj.dishonors) + 1;
  } else if (obj.user_vote === "dishonor" && vote === "honor") {
    obj.user_vote = "honor";
    obj.honors = parseInt(obj.honors) + 1;
    obj.dishonors = parseInt(obj.dishonors) - 1;
  } else {
    obj.user_vote = vote;
    if (vote === "honor") {
      obj.honors = parseInt(obj.honors) + 1;
    } else {
      obj.dishonors = parseInt(obj.dishonors) + 1;
    }
  }

  setMission(obj);

  const url = new URL("http://10.0.0.222:3005/api/toggle-vote");

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        mission_id,
        vote,
      }),
    });

    if (!response.ok) {
      console.log("im here");
      console.log(response);
      const { message } = await response.json();
      throw new Error(message);
    }

    const { message } = await response.json();

    console.log(message);
  } catch (error) {
    console.log(error);
  }
}
