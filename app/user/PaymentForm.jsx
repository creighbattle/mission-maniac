import { Dialog } from "@headlessui/react";
import { memo, useState } from "react";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";

export default function PaymentForm({ setView }) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!elements || !stripe) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      // Show error to your customer
      console.log("submit error");
      console.log(submitError);
      setErrorMessage(submitError.message);
      return;
    }

    elements.update({
      capture_method: "manual",
    });

    //const cardElement = elements.getElement(stripe.elements.CardElement);

    //console.log(cardElement);

    // Get a reference to a payment method
    const { error: paymentMethodError, paymentMethod } =
      await stripe.createPaymentMethod({
        elements,
      });

    if (paymentMethodError) {
      console.log(paymentMethodError);
      setErrorMessage(paymentMethodError.message);
      return;
    }

    console.log(paymentMethod);

    // Fetch to create and confirm the PaymentIntent from your server
    const res = await fetch(
      "http://10.0.0.222:3005/api/create-confirm-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 1099,
          paymentMethodId: paymentMethod.id,
        }),
      }
    );

    const result = await res.json();

    if (!result.success) {
      setErrorMessage(result.message);
      console.log(result.message);
    } else {
      console.log(
        "Payment confirmed:",
        result.clientSecret,
        result.paymentIntentId
      );
    }
  };

  //   const handleSubmit = async (event) => {
  //     event.preventDefault();

  //     if (!elements || !stripe) {
  //       return;
  //     }

  //     // Trigger form validation and wallet collection
  //     const { error: submitError } = await elements.submit();
  //     if (submitError) {
  //       // Show error to your customer
  //       console.log("submit error");
  //       console.log(submitError);
  //       setErrorMessage(submitError.message);
  //       return;
  //     }

  //     // Create the PaymentIntent and obtain clientSecret from your server endpoint
  //     const res = await fetch(
  //       "http://10.0.0.222:3005/api/create-payment-intent",
  //       {
  //         method: "POST",
  //         mode: "cors",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ amount: 1099 }),
  //       }
  //     );

  //     const { clientSecret, paymentIntentId } = await res.json();
  //     //let error = null;

  //     console.log("elements");
  //     console.log(elements);

  //     elements.update({
  //       capture_method: "manual",
  //     });

  //     const { error } = await stripe.confirmPayment({
  //       elements,
  //       clientSecret,
  //       confirmParams: {
  //         return_url: "http://10.0.0.222:3000/user",
  //       },
  //     });

  //     if (error) {
  //       setErrorMessage(error.message);
  //       console.log(error);
  //     } else {
  //       console.log("im here");
  //       console.log(clientSecret);
  //       console.log(paymentIntentId);
  //     }
  //   };

  return (
    <>
      <div>
        <div className="absolute text-white top-7" onClick={() => setView(0)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </div>

        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-3xl font-bold">
          M
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-white"
          >
            Create Mission
          </Dialog.Title>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-0">
          <div className="">
            <p className="mt-4 text-sm leading-6 text-gray-100 text-center">
              Recruit @pekinwoof for a mission.
            </p>
            <PaymentElement className="mt-4" />
          </div>
        </div>
        <div className="mt-5 sm:mt-6">
          <button
            type="submit"
            className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Create Mission
          </button>
        </div>
      </form>
    </>
  );
}
