import { useEffect, useState } from "react";
import useUserStore from "../stores/userStore";
import {
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser,
} from "aws-amplify/auth";
import { useRouter, usePathname } from "next/navigation";
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
  const { setUsername, setEmail, username } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    fetchUserAttributes()
      .then((userAttributes) => {
        if (!userAttributes.preferred_username) {
          router.push("new-account");
          return;
        }
        if (!username) {
          setEmail(userAttributes.email);
          setUsername(userAttributes.preferred_username);
        }
        console.log("user attributes");
        console.log(userAttributes);
      })
      .catch((err) => {
        console.log("user attributes erros");
        console.log(err);
      });
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
      cache: "no-cache",
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
