"use client";
import Header from "../global-components/Header";
import User from "./User";
import { useGetUser } from "../hooks/useGetUser";
import useUserStore from "../stores/userStore";
import { ClipLoader } from "react-spinners";
import Notification from "../global-components/Notification";
import MoreInfo from "../global-components/MoreInfo";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { fetchUserAttributes } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { Amplify } from "aws-amplify";
import SignInModal from "../global-components/SignInModal";
import getUserPoints from "../api-calls/get-user-points";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: process.env.NEXT_PUBLIC_POOL_CLIENT_ID,
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
    },
  },
});

export default function UserPage() {
  const [error, setError] = useState("");
  useGetUser(setError);
  const { user, loading, setMissionPoints } = useUserStore();
  const router = useRouter();
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    checkForUsername();
  }, []);

  const checkForUsername = async () => {
    try {
      const userAttributes = await fetchUserAttributes();
      setIsUser(true);
      if (!userAttributes.preferred_username) {
        router.push("new-account");
        return;
      }
      await getUserPoints({ setMissionPoints });
    } catch (error) {}
  };

  if (
    error === "Error fetching user" ||
    error === "Failed to fetch" ||
    error !== ""
  ) {
    return (
      <div className="flex h-svh flex-col items-center justify-center max-w-7xl px-4">
        <ExclamationTriangleIcon className="w-10 h-10 text-red-300" />
        <p className="text-3xl text-white text-center">
          Uh oh! Our servers are having trouble are the moment.
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-svh w-svw flex flex-col items-center justify-center">
        <ClipLoader
          color={"#4ade80"}
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <>
      <Notification />
      <Header />
      <User isUser={isUser} />
      <MoreInfo />
      <SignInModal />
    </>
  );
}
