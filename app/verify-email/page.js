"use client";

import { useState } from "react";
import { resendSignUpCode, confirmSignUp, autoSignIn } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { Amplify } from "aws-amplify";
import useUserStore from "../stores/userStore";

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
  const { email, setEmail } = useUserStore();
  const router = useRouter();

  const resendCode = async () => {
    setErrors("");
    try {
      await resendSignUpCode({ username: email });
      console.log("code resent successfully");
    } catch (err) {
      console.log(err);
      if (err.message == "Username cannot be empty") {
        setErrors(
          "You need to provide an email in order to send Resend Activiation Code"
        );
      } else if (err.message == "Username/client id combination not found.") {
        setErrors("Email is invalid or cannot be found.");
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors("");

    try {
      const confirmSignUpOutput = await confirmSignUp({
        username: email,
        confirmationCode: code,
      });

      //   const data = {
      //     email,
      //     userId: confirmSignUpOutput.userId,
      //   };

      await autoSignIn();
      //   await fetch("http://10.0.0.222:3005/api/create-user", {
      //     method: "POST",
      //     mode: "cors",
      //     cache: "no-cache",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(data),
      //   });

      router.push("/mission");
    } catch (error) {
      console.log(error);
      setErrors(error.message);

      if (
        error.message ===
        "The autoSignIn flow has not started, or has been cancelled/completed."
      ) {
        router.push("/signin");
      }
    }
  };

  return (
    <>
      <div className="flex h-svh flex-1">
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
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@email.com"
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 outline-none caret-green-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
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
                  <p className="text-sm leading-6 text-gray-200">
                    Didn't get a code?{" "}
                    <button
                      type="button"
                      onClick={resendCode}
                      className="font-semibold text-green-400 hover:text-green-500"
                    >
                      Resend
                    </button>
                  </p>
                  {errors && <p className="text-red-400">{errors}</p>}
                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-green-400 px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    >
                      Verify
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
