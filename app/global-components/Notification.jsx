"use client";
import { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/20/solid";
import useNotificationStore from "../stores/notificationStore";

export default function Notification() {
  const { showNotification, setShowNotification, nError, nTitle, nMessage } =
    useNotificationStore();
  const [progress, setProgress] = useState(100);
  const [timeoutId, setTimeoutId] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [showProgress, setShowProgress] = useState(true);

  useEffect(() => {
    if (showNotification) {
      setShowProgress(true);
      const start = Date.now();
      const interval = setInterval(() => {
        const elapsedTime = Date.now() - start;
        setProgress(100 - (elapsedTime / 3000) * 100);
      }, 30);
      setIntervalId(interval);

      const timeout = setTimeout(() => {
        setShowNotification(false);
        clearInterval(interval);
        setTimeout(() => {
          setProgress(100);
        }, 1000);
      }, 3000);
      setTimeoutId(timeout);
    } else {
      setTimeout(() => {
        setProgress(100);
      }, 1000);
    }

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [showNotification]);

  const handleNotificationClick = () => {
    clearTimeout(timeoutId);
    clearInterval(intervalId);
    setShowProgress(false);
    setProgress(100); // Optionally reset the progress bar
    //setShowNotification(false); // Optionally close the notification immediately
  };

  return (
    <>
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-50"
        onClick={handleNotificationClick}
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          <Transition
            show={showNotification}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {!nError ? (
                      <CheckCircleIcon
                        className="h-6 w-6 text-green-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <ExclamationCircleIcon
                        className="h-6 w-6 text-red-400"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">
                      {nTitle}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">{nMessage}</p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => {
                        setShowNotification(false);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                {showProgress && (
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div
                      className={`h-1.5 rounded-full ${
                        nError ? "bg-red-400" : "bg-green-400"
                      }`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}
