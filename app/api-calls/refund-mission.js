import { fetchAuthSession } from "aws-amplify/auth";

export default async function refundMission({
  supportId,
  setLoading,
  setError,
  setOpen,
  mission,
  supports,
  setSupports,
}) {
  setError("");
  setLoading(true);
  let jwt;

  console.log(supportId);

  try {
    const authSession = await fetchAuthSession();
    jwt = authSession.tokens.accessToken.toString();
  } catch (error) {
    console.log(error);
    return new Error("Error fetching auth session");
  }

  const url = new URL("http://10.0.0.222:3005/api/refund-mission");

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        supportId,
      }),
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }

    const { message } = await response.json();

    const obj = { ...mission, refunded: true };
    const supps = [...supports];

    for (let i = 0; i < supps.length; i++) {
      if (supps[i].mission_id === obj.mission_id) {
        supps[i] = obj;
        break;
      }
    }

    setSupports(supps);

    setOpen(false);

    console.log(message);
  } catch (error) {
    console.log(error);
    setError(error.message);
  } finally {
    setLoading(false);
  }
}
