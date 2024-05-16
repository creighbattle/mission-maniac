"use client";
import { Elements } from "@stripe/react-stripe-js";
import Header from "../global-components/Header";
import User from "./User";
import { loadStripe } from "@stripe/stripe-js";
import { useGetUser } from "../hooks/useGetUser";
import useUserStore from "../stores/userStore";
import { ClipLoader } from "react-spinners";
import Notification from "../global-components/Notification";

const stripePromise = loadStripe(
  "pk_test_51PClGEFpEHwNvH6HaOedO7wpQ1x7asRPpFKMJpeVBO0JAP28Knn9gQFitin7rTXvMU8aOOn1jZsWiy0LpBFtRVCr00woCMaPMq"
);

export default function UserPage() {
  useGetUser();
  const { user, loading, amount } = useUserStore();

  const options = {
    mode: "payment",
    amount: 1099,
    currency: "usd",
    appearance: {
      theme: "night",
      labels: "above",
    },
    paymentMethodCreation: "manual",
  };

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
    <Elements stripe={stripePromise} options={options}>
      <Notification />
      <Header />
      <User />
    </Elements>
  );
}
