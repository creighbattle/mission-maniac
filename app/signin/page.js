"use client";
import { Amplify } from "aws-amplify";
import { useRouter } from "next/navigation";
import useUserStore from "../stores/userStore";
import { useState } from "react";
import { signIn } from "aws-amplify/auth";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { ClipLoader } from "react-spinners";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: process.env.NEXT_PUBLIC_POOL_CLIENT_ID,
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
    },
  },
});

export default function SignIn() {
  const { email, setEmail, password, setPassword } = useUserStore();
  // const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    setLoading(true);

    signIn({ username: email, password })
      .then((signInOutput) => {
        if (signInOutput.isSignedIn) {
          router.push("/");
        } else {
          router.push("/verify-email");
        }
      })
      .catch((err) => {
        if (err.code == "UserNotConfirmedException") {
        }
        setErrors(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="flex h-svh flex-1 items-center justify-center">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                className="h-10 w-auto rounded-lg"
                src="/Logo.jpeg"
                alt="Mission Maniac"
              />
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-white">
                Sign in to your account
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-200">
                Don&apos;t have an account?{" "}
                <a
                  onClick={() => router.push("/signup")}
                  className="font-semibold text-green-400 hover:text-green-500 hover:cursor-pointer"
                >
                  Create account
                </a>
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
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
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
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Password
                    </label>

                    <div className="mt-2 relative">
                      <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 caret-green-400 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-end">
                    <div className="text-sm leading-6">
                      <a
                        onClick={() => router.push("reset-password")}
                        className="font-semibold text-green-400 hover:text-green-500"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>

                  {errors && <p className="text-red-400">{errors}</p>}

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-green-400 px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    >
                      {!loading ? (
                        "Sign in"
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
          </div>
        </div>
      </div>
    </>
  );
}
