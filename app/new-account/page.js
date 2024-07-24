"use client";

import { Amplify } from "aws-amplify";
import useUserStore from "../stores/userStore";
import {
  updateUserAttribute,
  fetchUserAttributes,
  fetchAuthSession,
} from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: process.env.NEXT_PUBLIC_POOL_CLIENT_ID,
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
    },
  },
});

export default function NewAccount() {
  const { setUsername, username } = useUserStore();
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkForUsername();
  }, []);

  const checkForUsername = async () => {
    const userAttributes = await fetchUserAttributes();
    if (userAttributes.preferred_username) {
      router.push("/");
    }
  };

  const onSubmit = async (e) => {
    if (loading) return;
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userAttributes = await fetchUserAttributes();
      const authSession = await fetchAuthSession();

      if (userAttributes.preferred_username) {
        router.push("/");
        return;
      }

      const email = userAttributes.email;
      const userId = authSession.tokens.accessToken.payload.sub;

      const data = {
        email,
        userId,
        username,
      };

      const response = await fetch(process.env.NEXT_PUBLIC_WRITE_USER, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await updateUserAttribute({
          userAttribute: {
            attributeKey: "preferred_username",
            value: username,
          },
        });
        router.push("/");
      } else {
        const { message } = await response.json();
        throw new Error(message);
      }
    } catch (error) {
      if (error.message === "Username already exists") {
        setError(error.message);
      } else if (error.message === "Username is not valid") {
        setError(
          "Username can only contain letters, numbers, underscores and must be between 3-30 characters long."
        );
      } else {
        setError(
          "Sorry, there seems to be an issue with our servers. Please try again in a moment."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-svh flex-1 flex-col justify-center px-6 py-12 lg:px-8 tracking-wider">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto rounded-lg"
          src="/Logo.jpeg"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-wide text-white">
          Declare Your Username
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={onSubmit}
        >
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-white"
            ></label>
            <div className="mt-2">
              <input
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                name="username"
                type="text"
                required
                className="block w-full text-center rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 outline-none caret-green-400"
              />
            </div>
          </div>
          {error && <p className="text-[#FB87A1] text-center">{error}</p>}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              {!loading ? (
                "Confirm"
              ) : (
                <ClipLoader
                  color={"black"}
                  loading={loading}
                  size={25}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
