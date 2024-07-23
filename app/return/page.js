"use client";
import React, { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { Amplify } from "aws-amplify";
import { fetchAuthSession } from "aws-amplify/auth";
import Header from "../global-components/Header";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: process.env.NEXT_PUBLIC_POOL_CLIENT_ID,
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
    },
  },
});

export default function Return() {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const [points, setPoints] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");
    setPoints(urlParams.get("points"));

    getSession(sessionId);
  }, []);

  const getSession = async (sessionId) => {
    let jwt;
    try {
      const authSession = await fetchAuthSession();
      jwt = authSession.tokens.idToken.toString();
    } catch (error) {
      router.push("/");
    }

    fetch(`${process.env.NEXT_PUBLIC_GET_SESSION_ID}?session_id=${sessionId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      });
  };

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    return (
      <section id="success">
        <Header />

        {/* <div className="pt-24 lg:pt-36"> */}
        <div className="relative isolate bg-black px-6 py-24 sm:py-32 lg:px-8 min-h-svh">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#4ade80] to-[#000] opacity-30"
            />
          </div>
          <div className="mx-auto max-w-2xl text-center lg:max-w-4xl mt-4">
            <h2 className="text-base font-semibold leading-7 text-green-400">
              Success
            </h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-100 sm:text-5xl">
              {points} Mission Points Purchased
            </p>
          </div>

          <p className="mt-6 max-w-2xl text-center text-md leading-8 text-gray-300 mx-auto">
            Your purchase was completed successfully. Please allow a few moments
            for your account to be updated. A confirmation email will be sent to{" "}
            {customerEmail}. If you have any questions, please email{" "}
            <a href="mailto:orders@example.com">orders@example.com</a>.
          </p>

          <img
            className="h-40 w-40 rounded-full mx-auto mt-6"
            src="/mission_points.webp"
            alt="Mission Maniac logo"
          />
        </div>
      </section>
    );
  }

  return null;
}
