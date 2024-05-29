"use client";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import RequestInfo from "./RequestInfo";
import AcceptMission from "./AcceptMission";
import DeclineMission from "./DeclineMission";
import ActiveMissionInfo from "./ActiveMissionInfo";
import AbortMission from "./AbortMission";
import CompleteMission from "./CompleteMission";
import UpdateMission from "./UpdateMission";
import MissionSummary from "./MissionSummary";
import MissionExpired from "./MissionExpired";
import MoreInfo from "@/app/global-components/MoreInfo";

export default function RequestModal({
  open,
  setOpen,
  view,
  setView,
  missions,
  setMissions,
}) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        className="relative z-50"
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
                <MoreInfo />
                <div className={view === 0 ? "" : "hidden"}>
                  <RequestInfo setView={setView} setOpen={setOpen} />
                </div>
                <div className={view === 1 ? "" : "hidden"}>
                  <DeclineMission
                    setView={setView}
                    setOpen={setOpen}
                    missions={missions}
                    setMissions={setMissions}
                  />
                </div>
                <div className={view === 2 ? "" : "hidden"}>
                  <AcceptMission
                    setView={setView}
                    setOpen={setOpen}
                    missions={missions}
                    setMissions={setMissions}
                  />
                </div>
                <div className={view === 3 ? "" : "hidden"}>
                  <ActiveMissionInfo setView={setView} setOpen={setOpen} />
                </div>
                <div className={view === 4 ? "" : "hidden"}>
                  <AbortMission
                    setView={setView}
                    setOpen={setOpen}
                    missions={missions}
                    setMissions={setMissions}
                  />
                </div>
                <div className={view === 5 ? "" : "hidden"}>
                  <CompleteMission
                    setView={setView}
                    setOpen={setOpen}
                    missions={missions}
                    setMissions={setMissions}
                  />
                </div>
                <div className={view === 6 ? "" : "hidden"}>
                  <MissionSummary setView={setView} setOpen={setOpen} />
                </div>
                <div className={view === 7 ? "" : "hidden"}>
                  <UpdateMission
                    setView={setView}
                    setOpen={setOpen}
                    missions={missions}
                    setMissions={setMissions}
                  />
                </div>
                <div className={view === 8 ? "" : "hidden"}>
                  <MissionExpired setView={setView} setOpen={setOpen} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
