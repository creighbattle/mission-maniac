"use client";
import React, { useCallback, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { fetchAuthSession } from "aws-amplify/auth";
import { Amplify } from "aws-amplify";
import Header from "../global-components/Header";

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
          domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN,
        },
      },
    },
  },
});

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY);

export default function Checkout() {
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState(null);

  const fetchClientSecret = useCallback(async () => {
    let jwt;
    let priceId;

    try {
      const authSession = await fetchAuthSession();
      jwt = authSession.tokens.idToken.toString();

      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      priceId = urlParams.get("priceId");
    } catch (error) {
      console.error(error);
      router.push("/shop");
      return;
    }

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_CREATE_CHECKOUT_SESSION,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({
            productId: priceId,
          }),
        }
      );
      const data = await response.json();
      setClientSecret(data.clientSecret);
    } catch (err) {
      console.error(err);
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    fetchClientSecret();
  }, [fetchClientSecret]);

  if (!clientSecret) {
    return <div>Loading...</div>; // Fallback UI during loading
  }

  const options = { clientSecret };

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
