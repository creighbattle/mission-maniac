// "use client";
// import { Fragment } from "react";
// import { Transition } from "@headlessui/react";
// import { InformationCircleIcon } from "@heroicons/react/24/outline";
// import { XMarkIcon } from "@heroicons/react/20/solid";

// export default function MoreInfo({ title, message, showInfo, setShowInfo }) {
//   return (
//     <>
//       {/* Global notification live region, render this permanently at the end of the document */}
//       <Transition.Root show={showInfo} as={Fragment}>
//       <div
//         aria-live="assertive"
//         className="inset-0 flex items-start px-4 py-6 sm:items-start sm:p-6 z-50"
//         onClick={(e) => {
//           console.log("top click");
//           e.stopPropagation();
//         }}
//       >
//         <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
//           {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
//           <Transition
//             show={showInfo}
//             as={Fragment}
//             enter="transform ease-out duration-300 transition"
//             enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
//             enterTo="translate-y-0 opacity-100 sm:translate-x-0"
//             leave="transition ease-in duration-100"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div
//               onClick={(e) => {
//                 console.log("click");
//                 e.stopPropagation();
//               }}
//               className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-red-300 shadow-lg ring-1 ring-black ring-opacity-5 z-50"
//             >
//               <div className="p-4">
//                 <div className="flex items-start">
//                   <div className="flex-shrink-0">
//                     <InformationCircleIcon
//                       className="h-6 w-6 text-green-400"
//                       aria-hidden="true"
//                     />
//                   </div>
//                   <div className="ml-3 w-0 flex-1 pt-0.5">
//                     <p className="text-sm font-medium text-gray-900">{title}</p>
//                     <p className="mt-1 text-sm text-gray-500">{message}</p>
//                   </div>
//                   <div className="ml-4 flex flex-shrink-0">
//                     <button
//                       type="button"
//                       className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                       onClick={() => {
//                         setShowInfo(false);
//                       }}
//                     >
//                       <span className="sr-only">Close</span>
//                       <XMarkIcon className="h-5 w-5" aria-hidden="true" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Transition>
//         </div>
//       </div>
//     </>
//   );
// }

"use client";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import useInfoStore from "../stores/infoStore";

export default function MoreInfo() {
  const { title, message, setShowInfo, showInfo } = useInfoStore();

  return (
    <Transition.Root show={showInfo} as={Fragment}>
      <Dialog className="relative z-50" onClose={() => setShowInfo(false)}>
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
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      {title}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{message}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => setShowInfo(false)}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
