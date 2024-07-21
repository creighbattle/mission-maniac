"use client";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import CreateMissionForm from "./CreateMissionForm";
import useUserStore from "../stores/userStore";

export default function CreateMissionModal({ open, setOpen }) {
  const { showInfo, setShowInfo } = useUserStore();

  const [funds, setFunds] = useState(0);
  const [expire, setExpire] = useState("Never");
  const [mission, setMission] = useState("");
  const [message, setMessage] = useState("");

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        className="relative z-40"
        onClose={() => {
          if (showInfo) {
            setShowInfo(false);
          } else {
            setOpen(false);
          }
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-t-lg sm:rounded-lg bg-[#141414] px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full sm:w-full sm:max-w-sm sm:p-6">
                <CreateMissionForm
                  funds={funds}
                  setFunds={setFunds}
                  expire={expire}
                  setExpire={setExpire}
                  mission={mission}
                  setMission={setMission}
                  message={message}
                  setMessage={setMessage}
                  setOpen={setOpen}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
