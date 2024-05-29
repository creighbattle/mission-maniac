"use client";
import { Amplify } from "aws-amplify";
import { useRouter } from "next/navigation";
import useUserStore from "../stores/userStore";
import { useState } from "react";
import { resetPassword, confirmResetPassword, signIn } from "aws-amplify/auth";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { ClipLoader } from "react-spinners";
import MoreInfo from "../global-components/MoreInfo";
import useInfoStore from "../stores/infoStore";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: process.env.NEXT_PUBLIC_POOL_CLIENT_ID,
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
    },
  },
});

export default function ResetPassword() {
  const { email, setEmail, password, setPassword } = useUserStore();
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [view, setView] = useState(0);
  const router = useRouter();
  const [resent, setResent] = useState(false);
  const [confirmPasswordLoading, setConfirmPasswordLoading] = useState(false);
  const [code, setCode] = useState("");
  const { setShowInfo, setTitle, setInfoMessage } = useInfoStore();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    setLoading(true);

    try {
      await resetPassword({ username: email });
      setView(1);
    } catch (error) {
      setErrors(error.message);
    } finally {
      setLoading(false);
    }
  };

  const confirmPassword = async (e) => {
    e.preventDefault();
    if (confirmPasswordLoading) return;
    setErrors("");
    setConfirmPasswordLoading(true);

    try {
      await confirmResetPassword({
        confirmationCode: code,
        newPassword: password,
        username: email,
      });
      await signIn({ username: email, password: password });
      router.push("/");
    } catch (error) {
      setErrors(error.message);
    } finally {
      setConfirmPasswordLoading(false);
    }
  };

  const resendCode = async () => {
    setLoading(true);
    try {
      await resetPassword({ username: email });
      setTitle("Code Sent");
      setInfoMessage("Please check your spam folder if you do not see it.");
      setShowInfo(true);
      setResent(true);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  if (view == 1) {
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
                  Reset Password
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-200">
                  A verification code has been sent to{" "}
                  <span className="text-green-400">{email}</span>.
                </p>
              </div>

              <div className="mt-10">
                <div>
                  <form
                    action="#"
                    method="POST"
                    className="space-y-6"
                    onSubmit={confirmPassword}
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
                          value={code}
                          id="code"
                          name="code"
                          type="text"
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
                        New Password
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
                        {!confirmPasswordLoading ? (
                          "Confirm"
                        ) : (
                          <ClipLoader
                            color={"black"}
                            loading={confirmPasswordLoading}
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

  return (
    <>
      <MoreInfo />
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
                Reset Password
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-200">
                Remember it?{" "}
                <a
                  onClick={() => router.push("/signin")}
                  className="font-semibold text-green-400 hover:text-green-500 hover:cursor-pointer"
                >
                  Sign in
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

                  {errors && <p className="text-red-400">{errors}</p>}

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-green-400 px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    >
                      {!loading ? (
                        "Send Reset Link"
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
