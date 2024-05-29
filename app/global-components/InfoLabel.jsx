import { InformationCircleIcon } from "@heroicons/react/24/outline";
import useInfoStore from "../stores/infoStore";

export default function InfoLabel({ label, title, message }) {
  const { setShowInfo, setTitle, setInfoMessage } = useInfoStore();

  return (
    <div
      className="flex items-center gap-1"
      onClick={() => {
        setShowInfo(true);
        setTitle(title);
        setInfoMessage(message);
      }}
    >
      <InformationCircleIcon
        className="h-5 w-5 text-white"
        aria-hidden="true"
      />
      <p className="text-green-400">{label}: </p>
    </div>
  );
}
