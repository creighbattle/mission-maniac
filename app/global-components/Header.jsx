export default function Header() {
  return (
    <header className="fixed top-0 w-full z-40 left-0 px-[5.5vw] py-[4vw]">
      <div className="w-full items-center flex justify-between">
        <div className="flex items-center">
          <div className="text-[3.7rem] font-semibold">M</div>
          <div className="mt-[6px] leading-5">
            <h3 className="text-[1.5rem] font-medium">ission</h3>
            <h3 className="text-[1.5rem] font-medium ">aniac</h3>
          </div>
        </div>

        <button>
          <span className="text-[5vw] font-medium">Menu</span>
        </button>
      </div>
    </header>
  );
}
