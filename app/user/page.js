"use client";
import { Elements } from "@stripe/react-stripe-js";
import Header from "../global-components/Header";
import User from "./User";
import { loadStripe } from "@stripe/stripe-js";

// export default function UserPage() {
//   return (
//     <div className="h-svh bg-[#141414]">
//       <Header />
//       <User />
//     </div>
//   );
// }

const stripePromise = loadStripe(
  "pk_test_51PClGEFpEHwNvH6HaOedO7wpQ1x7asRPpFKMJpeVBO0JAP28Knn9gQFitin7rTXvMU8aOOn1jZsWiy0LpBFtRVCr00woCMaPMq"
);

export default function UserPage() {
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

  return (
    <Elements stripe={stripePromise} options={options}>
      <Header />
      <User />
    </Elements>
  );
}
