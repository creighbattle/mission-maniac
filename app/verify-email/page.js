"use client";

import { useState } from "react";
import {
  resendSignUpCode,
  confirmSignUp,
  autoSignIn,
  signIn,
} from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { Amplify } from "aws-amplify";
import useUserStore from "../stores/userStore";
import useInfoStore from "../stores/infoStore";
import { ClipLoader } from "react-spinners";
import MoreInfo from "../global-components/MoreInfo";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: process.env.NEXT_PUBLIC_POOL_CLIENT_ID,
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
    },
  },
});

export default function VerifyEmail() {
  const [errors, setErrors] = useState("");
  const [code, setCode] = useState("");
  const { email, setEmail, password, setPassword } = useUserStore();
  const { setShowInfo, setTitle, setInfoMessage } = useInfoStore();
  const [resent, setResent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifyCodeLoading, setVerifyCodeLoading] = useState(false);
  const router = useRouter();

  const resendCode = async () => {
    if (loading) return;
    setErrors("");
    setLoading(true);
    try {
      await resendSignUpCode({ username: email });
      setTitle("Code Sent");
      setInfoMessage("Please check your spam folder if you do not see it.");
      setShowInfo(true);
      setResent(true);
    } catch (err) {
      if (err.message == "Username cannot be empty") {
        setErrors(
          "You need to provide an email in order to send Resend Activiation Code"
        );
      } else if (err.message == "Username/client id combination not found.") {
        setErrors("Email is invalid or cannot be found.");
      }
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setVerifyCodeLoading(true);
    setErrors("");

    try {
      await confirmSignUp({
        username: email,
        confirmationCode: code,
      });

      await autoSignIn();

      router.push("/new-account");
    } catch (error) {
      if (
        error.message ===
        "The autoSignIn flow has not started, or has been cancelled/completed."
      ) {
        if (email && password) {
          try {
            await signIn({ username: email, password });
            router.push("/new-account");
            setPassword("");
          } catch (error) {
            router.push("/signin");
          }
        } else {
          router.push("/signin");
        }
      } else {
        setErrors(error.message);
      }
    } finally {
      setVerifyCodeLoading(false);
    }
  };

  return (
    <>
      <MoreInfo />
      <div className="flex h-svh flex-1 justify-center items-center">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                className="h-10 w-auto rounded-lg"
                src="/Logo.jpeg"
                alt="Mission Maniac"
              />
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-white">
                Verify your email
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-200">
                A confirmation code has been sent to{" "}
                <span className="text-green-400">{email}</span>.
              </p>
            </div>

            <div className="mt-10">
              <div>
                <form
                  action="#"
                  method="POST"
                  className="space-y-6"
                  onSubmit={onSubmit}
                >
                  <div>
                    <label
                      htmlFor="code"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Code
                    </label>
                    <div className="mt-2">
                      <input
                        onChange={(e) => setCode(e.target.value)}
                        id="code"
                        name="code"
                        type="text"
                        required
                        className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 outline-none caret-green-400"
                      />
                    </div>
                  </div>
                  {!resent && (
                    <p className="text-sm leading-6 text-gray-200 flex items-center">
                      Didn&apos;t get a code?{" "}
                      <button
                        type="button"
                        onClick={resendCode}
                        className="font-semibold text-green-400 hover:text-green-500 flex items-center"
                      >
                        {!loading ? (
                          <span className="ml-1">Resend</span>
                        ) : (
                          <span className="flex items-center justify-center ml-1">
                            <ClipLoader
                              color={"#4ade80"}
                              loading={loading}
                              size={20}
                              aria-label="Loading Spinner"
                              data-testid="loader"
                            />
                          </span>
                        )}
                      </button>
                    </p>
                  )}

                  {errors && <p className="text-red-400">{errors}</p>}
                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-green-400 px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    >
                      {!verifyCodeLoading ? (
                        "Verify"
                      ) : (
                        <ClipLoader
                          color={"black"}
                          loading={verifyCodeLoading}
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
          </div>
        </div>
      </div>
    </>
  );
}
