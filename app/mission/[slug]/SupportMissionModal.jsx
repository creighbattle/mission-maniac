"use client";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import SupportMissionForm from "./SupportMissionForm";

export default function SupportMissionModal({
  open,
  setOpen,
  supporters,
  setSupporters,
}) {
  const [funds, setFunds] = useState(0);
  const [comment, setComment] = useState("");
  const [isCommentPublic, setIsCommentPublic] = useState(false);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        className="relative z-40"
        onClose={() => {
          setOpen(false);
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
                <SupportMissionForm
                  setFunds={setFunds}
                  funds={funds}
                  setComment={setComment}
                  comment={comment}
                  setIsCommentPublic={setIsCommentPublic}
                  isCommentPublic={isCommentPublic}
                  supporters={supporters}
                  setSupporters={setSupporters}
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
