"use client";
import React, { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { fetchAuthSession } from "aws-amplify/auth";
import { Amplify } from "aws-amplify";
import Header from "../global-components/Header";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: process.env.NEXT_PUBLIC_POOL_CLIENT_ID,
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
    },
  },
});

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY);

export default function Checkout() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fetchClientSecret = useCallback(async () => {
    let jwt;
    let priceId;

    try {
      const authSession = await fetchAuthSession();
      jwt = authSession.tokens.idToken.toString();
      priceId = searchParams.get("priceId");
    } catch (error) {
      router.push("/shop");
      return;
    }
    // Create a Checkout Session
    return fetch(process.env.NEXT_PUBLIC_CREATE_CHECKOUT_SESSION, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        productId: priceId,
      }),
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret)
      .catch((err) => {
        router.push("/");
      });
  }, []);

  const options = { fetchClientSecret };

  return (
    <div id="checkout" className="">
      <Header />
      <div className="pt-24 lg:pt-36">
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  );
}
