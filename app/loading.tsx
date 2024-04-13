"use client";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

const Loading = () => {
  const textRef = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    gsap.fromTo(
      ".loading",
      {
        y: 0,
      },
      {
        y: 50,
      }
    );
  }, [textRef]);
  return (
    <div className=" h-screen w-full flex justify-center" ref={textRef}>
      <h2 className="loading text-4xl">Loading...</h2>
    </div>
  );
};

export default Loading;
