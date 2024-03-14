'use client'
import { useEffect } from "react";

export const useScrollFadeIn = () => {
  useEffect(() => {
    const callback = function (entries: IntersectionObserverEntry[]) {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-slideIn");
        } else {
          entry.target.classList.remove("animate-slideIn");
        }
      });
    };

    const observer = new IntersectionObserver(callback);

    const targets = document.querySelectorAll(".js-show-on-scroll");
    targets.forEach(function (target) {
      target.classList.add("opacity-0");
      observer.observe(target);
    });
  }, []);
};
