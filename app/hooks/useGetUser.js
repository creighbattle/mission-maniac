import { useEffect, useState } from "react";
import useUserStore from "../stores/userStore";
import {
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser,
} from "aws-amplify/auth";
import { useRouter, usePathname, useParams } from "next/navigation";
import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: process.env.NEXT_PUBLIC_POOL_CLIENT_ID,
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
    },
  },
});

export function useGetUser() {
  const { setUsername, setEmail, username, setUser } = useUserStore();
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    getUser(params.user);
  }, []);

  const getUser = async (username) => {
    let currentUsername;

    try {
      const userAttributes = await fetchUserAttributes();
      currentUsername = userAttributes.preferred_username;
    } catch (error) {}

    // Directly make a request without checking session storage
    try {
      const url = new URL("http://10.0.0.222:3005/api/get-user");
      url.searchParams.append("username", username);
      url.searchParams.append("currentUsername", currentUsername);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("success", data);
        setUser(data.user);
        return data;
      } else {
        throw new Error("Failed to fetch user profile");
      }
    } catch (error) {
      console.log("Error fetching user profile:", error);
      router.push("/");
    }
  };

  return;
}

export function useGetUserAccount() {
  const { setUser, setLoading, user } = useUserStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    getUserAccount();
  }, []);

  const getUserAccount = async () => {
    if (user) return;

    console.log("running");
    try {
      const userAttributes = await fetchUserAttributes();
      if (!userAttributes.preferred_username) {
        router.push("new-account");
        return;
      }

      const { user } = await getUser();

      console.log(user);

      setUser(user);
      setLoading(false);
    } catch (error) {
      console.log(error);
      console.log(pathname);
      if (pathname === "/account") {
        router.push("/signin");
        return;
      }
    }
  };
}

const getUser = async () => {
  let jwt;

  try {
    const authSession = await fetchAuthSession();
    jwt = authSession.tokens.accessToken.toString();
  } catch (error) {
    console.log(error);
    return new Error("Error fetching auth session");
  }

  try {
    const response = await fetch("http://10.0.0.222:3005/api/test", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (!response.ok) {
      router.push("/signin");
      return;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
