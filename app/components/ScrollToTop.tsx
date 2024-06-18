"use client";

import { BiColor, BiSolidToTop } from "react-icons/bi";

const ScrollToTop: React.FC = () => {
  const scroll = (): void => {
    typeof window !== "undefined" &&
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
  };
  return (
    <div>
      <button onClick={scroll}>
        <div className="flex justify-center text-center flex-col">
          <BiSolidToTop className="text-4xl mx-auto" />
          <p className="text-xl text-white">BACK TO TOP</p>
        </div>
      </button>
    </div>
  );
};

export default ScrollToTop;
