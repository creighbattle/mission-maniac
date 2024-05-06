import { Dialog } from "@headlessui/react";

export default function CreateMissionForm({ setView }) {
  return (
    <>
      <div>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-3xl font-bold">
          M
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-white"
          >
            Create Mission
          </Dialog.Title>
        </div>
      </div>

      <form>
        <div className="space-y-0">
          <div className="">
            <p className="mt-4 text-sm leading-6 text-gray-100 text-center">
              Recruit @pekinwoof for a mission.
            </p>

            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4">
              <div className="">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-green-400"
                >
                  Fund
                </label>
                <div className="mt-2 w-full">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md outline-none  text-white">
                    <span className="flex select-none items-center pl-3 text-white-500 sm:text-sm">
                      $
                    </span>
                    <input
                      type="tel"
                      inputMode="decimal"
                      name="username"
                      id="username"
                      autoComplete="off"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="mission"
                  className="block text-sm font-medium leading-6 text-green-400"
                >
                  Mission
                </label>
                <div className="mt-2">
                  <textarea
                    id="mission"
                    name="mission"
                    autoComplete="off"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 px-2 bg-[#141414] text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-400 sm:text-sm sm:leading-6 outline-none"
                    defaultValue={""}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium leading-6 text-green-400"
                >
                  Message
                </label>
                <div className="mt-2">
                  <textarea
                    id="message"
                    name="message"
                    autoComplete="off"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 px-2 bg-[#141414] text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-400 sm:text-sm sm:leading-6 outline-none"
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className="mt-5 sm:mt-6">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          onClick={() => setView(1)}
        >
          Continue
        </button>
      </div>
    </>
  );
}
