// import { Fragment, useState } from "react";
// import { Menu, Transition } from "@headlessui/react";
// import { ChevronDownIcon } from "@heroicons/react/20/solid";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function Dropdown({ expire, setExpire }) {
//   return (
//     <Menu as="div" className="relative inline-block text-left w-full">
//       <div>
//         <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-[#141414] px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-600">
//           {expire}
//           <ChevronDownIcon
//             className="-mr-1 h-5 w-5 text-gray-400"
//             aria-hidden="true"
//           />
//         </Menu.Button>
//       </div>

//       <Transition
//         as={Fragment}
//         enter="transition ease-out duration-100"
//         enterFrom="transform opacity-0 scale-95"
//         enterTo="transform opacity-100 scale-100"
//         leave="transition ease-in duration-75"
//         leaveFrom="transform opacity-100 scale-100"
//         leaveTo="transform opacity-0 scale-95"
//       >
//         <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//           <div className="py-1">
//             <Menu.Item>
//               <button
//                 onClick={(e) => {
//                   e.preventDefault();
//                   e.stopPropagation();
//                   setExpire("Never");
//                 }}
//                 className={`${
//                   expire === "Never"
//                     ? "bg-gray-100 text-gray-900"
//                     : "text-gray-700"
//                 } block px-4 py-2 text-sm w-full`}
//               >
//                 Never
//               </button>
//             </Menu.Item>
//             <Menu.Item>
//               <button
//                 onClick={(e) => {
//                   e.preventDefault();
//                   e.stopPropagation();
//                   setExpire("2 weeks");
//                 }}
//                 className={`${
//                   expire === "2 weeks"
//                     ? "bg-gray-100 text-gray-900"
//                     : "text-gray-700"
//                 } block px-4 py-2 text-sm w-full`}
//               >
//                 2 weeks
//               </button>
//             </Menu.Item>
//             <Menu.Item>
//               <button
//                 onClick={(e) => {
//                   e.preventDefault();
//                   e.stopPropagation();
//                   setExpire("1 month");
//                 }}
//                 className={`${
//                   expire === "1 month"
//                     ? "bg-gray-100 text-gray-900"
//                     : "text-gray-700"
//                 } block px-4 py-2 text-sm w-full`}
//               >
//                 1 month
//               </button>
//             </Menu.Item>
//             <Menu.Item>
//               <button
//                 onClick={(e) => {
//                   e.preventDefault();
//                   e.stopPropagation();
//                   setExpire("3 months");
//                 }}
//                 className={`${
//                   expire === "3 months"
//                     ? "bg-gray-100 text-gray-900"
//                     : "text-gray-700"
//                 } block px-4 py-2 text-sm w-full`}
//               >
//                 3 months
//               </button>
//             </Menu.Item>
//             <Menu.Item>
//               <button
//                 onClick={(e) => {
//                   e.preventDefault();
//                   e.stopPropagation();
//                   setExpire("6 months");
//                 }}
//                 className={`${
//                   expire === "6 months"
//                     ? "bg-gray-100 text-gray-900"
//                     : "text-gray-700"
//                 } block px-4 py-2 text-sm w-full`}
//               >
//                 6 months
//               </button>
//             </Menu.Item>

//             <Menu.Item>
//               <button
//                 onClick={(e) => {
//                   e.preventDefault();
//                   e.stopPropagation();
//                   setExpire("1 year");
//                 }}
//                 className={`${
//                   expire === "1 year"
//                     ? "bg-gray-100 text-gray-900"
//                     : "text-gray-700"
//                 } block px-4 py-2 text-sm w-full`}
//               >
//                 1 year
//               </button>
//             </Menu.Item>
//           </div>
//         </Menu.Items>
//       </Transition>
//     </Menu>
//   );
// }

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

// export default function Dropdown({
//   sortOption,
//   setSortOption,
//   sortOptions,
// }) {
export default function Dropdown({ option, setOption, options, right }) {
  return (
    <Menu as="div" className="relative inline-block text-left ml-2">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-[#141414] px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-600">
          {option}
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={`absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
            right ? "right-0" : "left-0"
          }`}
        >
          <div className="py-1" id="box">
            {options.map((el, idx) => (
              <Menu.Item key={idx}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setOption(el);
                  }}
                  className={`${
                    el === option
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700"
                  } block px-4 py-2 text-sm w-full`}
                >
                  {el}
                </button>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
