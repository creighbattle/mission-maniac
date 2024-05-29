import { Dialog } from "@headlessui/react";
import { memo, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { fetchAuthSession } from "aws-amplify/auth";
import useUserStore from "../stores/userStore";
import { ClipLoader } from "react-spinners";
import useNotificationStore from "../stores/notificationStore";

export default function PaymentForm({
  setView,
  funds,
  expire,
  mission,
  message,
  setOpen,
}) {
  const { user, amount } = useUserStore();
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { setShowNotification, setNTitle, setNMessage, setNError } =
    useNotificationStore();

  const handleSubmit = async (event) => {
    setLoading(true);

    event.preventDefault();
    setErrorMessage("");

    let jwt;

    try {
      const authSession = await fetchAuthSession();
      jwt = authSession.tokens.idToken.toString();
    } catch (error) {
      return new Error("Error fetching auth session");
    }

    if (!elements || !stripe) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      // Show error to your customer

      setErrorMessage(submitError.message);
      return;
    }

    elements.update({
      capture_method: "manual",
    });

    // Get a reference to a payment method
    const { error: paymentMethodError, paymentMethod } =
      await stripe.createPaymentMethod({
        elements,
      });

    if (paymentMethodError) {
      setErrorMessage(paymentMethodError.message);
      return;
    }

    // Fetch to create and confirm the PaymentIntent from your server
    const res = await fetch(
      process.env.NEXT_PUBLIC_WRITE_CREATE_MISSION_REQUEST,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          amount,
          paymentMethodId: paymentMethod.id,
          funds,
          mission,
          expire,
          message,
          maniac: user.username,
        }),
      }
    );

    const result = await res.json();

    if (!res.ok) {
      setErrorMessage(result.message);
    } else {
      // notification

      setOpen(false);
      setNError(false);
      setNTitle("Mission Request Created");
      setNMessage(
        `Your mission was successfully created. You can keep an eye on the status of the request in your account page under Recruits.`
      );
      setShowNotification(true);
    }

    setLoading(false);
  };

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
            <p className="mt-4 text-sm leading-6 text-gray-100 text-center"></p>
            <PaymentElement className="mt-4" />
            {errorMessage && (
              <p className="text-[#FB87A1] mt-4 text-center">{errorMessage}</p>
            )}
          </div>
        </div>
        <div className="mt-5 sm:mt-6">
          <button
            type="submit"
            className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            {!loading ? (
              "Create Mission"
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
    </>
  );
}
