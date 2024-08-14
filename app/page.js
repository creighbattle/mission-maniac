"use client";
import { fetchUserAttributes } from "aws-amplify/auth";
import Decision from "./home-components/Decision";
import Hero from "./home-components/Hero";
import Recruit from "./home-components/Recruit";
import Report from "./home-components/Report";
import Support from "./home-components/Support";
import What from "./home-components/What";
import { Amplify } from "aws-amplify";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import "aws-amplify/auth/enable-oauth-listener";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
      userPoolClientId: process.env.NEXT_PUBLIC_POOL_CLIENT_ID,
      loginWith: {
        oauth: {
          redirectSignIn: [
            "http://localhost:3000",
            "https://www.mission-maniac.com",
          ],
          redirectSignOut: [
            "http://localhost:3000",
            "https://www.mission-maniac.com",
          ],
          scopes: [
            "email",
            "profile",
            "openid",
            "aws.cognito.signin.user.admin",
          ],
          responseType: "code",
          domain: "mission-maniac.auth.us-east-1.amazoncognito.com",
        },
      },
    },
  },
});

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    checkForUsername();
  }, []);

  const checkForUsername = async () => {
    try {
      const userAttributes = await fetchUserAttributes();
      if (!userAttributes.preferred_username) {
        router.push("new-account");
        return;
      }
    } catch (error) {
      console.error("err: ", error);
    }
  };

  return (
    <>
      <Hero />
      {/* <What />
      <Recruit />
      <Decision />
      <Support />
      <Report /> */}
    </>
  );
}
