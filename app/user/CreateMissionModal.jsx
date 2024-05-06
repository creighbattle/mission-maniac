"use client";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import CreateMissionForm from "./CreateMissionForm";
import PaymentForm from "./PaymentForm";

export default function CreateMissionModal({ open, setOpen }) {
  const [view, setView] = useState(0);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog className="relative z-50" onClose={setOpen}>
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
                {/* {view === 0 && <CreateMissionForm setView={setView} />} */}
                {/* {view === 1 && <PaymentForm setView={setView} />} */}
                <div className={view === 0 ? "" : "hidden"}>
                  <CreateMissionForm setView={setView} />
                </div>
                <div className={view === 1 ? "" : "hidden"}>
                  <PaymentForm setView={setView} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
