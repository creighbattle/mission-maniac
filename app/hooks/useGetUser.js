import { useEffect } from "react";
import useUserStore from "../stores/userStore";
import { fetchAuthSession, fetchUserAttributes } from "aws-amplify/auth";
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

export function useGetUser(setError) {
  const { setUser } = useUserStore();
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    getUser(params.user, setError);
  }, []);

  const getUser = async (username, setError) => {
    setUser(null);
    let currentUsername;

    try {
      const userAttributes = await fetchUserAttributes();
      currentUsername = userAttributes.preferred_username;
    } catch (error) {}

    // Directly make a request without checking session storage
    try {
      const url = new URL(process.env.NEXT_PUBLIC_GET_USER);
      url.searchParams.append("username", username);
      url.searchParams.append("currentUsername", currentUsername);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();

      setUser(data.user);
      return data;
    } catch (error) {
      if (error.message === "User does not exist") {
        router.push("/");
      } else {
        setError(error.message);
      }
    }
  };
}

export function useGetUserAccount(setError) {
  const { setUser, setLoading, user } = useUserStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    getUserAccount(setError);
  }, []);

  const getUserAccount = async (setError) => {
    if (user) setUser(null);
    let jwt;

    try {
      const userAttributes = await fetchUserAttributes();
      if (!userAttributes.preferred_username) {
        router.push("new-account");
        return;
      }

      const authSession = await fetchAuthSession();
      jwt = authSession.tokens.idToken.toString();

      console.log(jwt);

      const response = await fetch(process.env.NEXT_PUBLIC_GET_ACCOUNT, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      setUser(data.user);
      setLoading(false);

      return data;
    } catch (error) {
      if (
        error.message === "Failed to fetch" ||
        error.message === "Server Error"
      ) {
        setError(error.message);
      } else {
        if (pathname === "/account") {
          router.push("/signin");
          return;
        }
      }
    }
  };
}
