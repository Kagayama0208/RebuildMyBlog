"use client";
import { useEffect } from "react";
import { gsap } from "gsap";

const AnimateSection = () => {
  useEffect(() => {
    gsap.fromTo(
      ".image",
      {
        x: 50,
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: ".box",
          start: "top center",
        },
        x: 0,
        opacity: 1,
        duration: 4,
      }
    );

    gsap.fromTo(
      "main",
      {
        y: 50,
      },
      {
        scrollTrigger: {
          trigger: ".box",
          start: "top center",
        },
        y: 0,
        opacity: 1,
        duration: 3,
      }
    );
  }, []);

  return <div className="box"></div>;
};

export default AnimateSection;
