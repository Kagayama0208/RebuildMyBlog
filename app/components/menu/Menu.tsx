"use client";

import { Category, getCategories } from "@/app/libs/getContents";
import { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

const Menu = ({
  categoryList,
}: {
  categoryList: (Category & MicroCMSContentId & MicroCMSDate)[];
}) => {
  const container = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log(isMenuOpen);
    if (!isMenuOpen) {
      const menuElement = document.querySelector(".menu-bar");
      const closeMenuElemnt = document.querySelector(".menu-overlay");
      gsap.to(menuElement, {
        duration: 0.3,
        opacity: 0,
        display: "none",
      });
      gsap.to(closeMenuElemnt, {
        duration: 0.5,
        opacity: 1,
        display: "block",
      });
    } else {
      const menuElement = document.querySelector(".menu-bar");
      const closeMenuElemnt = document.querySelector(".menu-overlay");
      gsap.to(menuElement, {
        duration: 0.3,
        opacity: 1,
        display: "block",
      });
      gsap.to(closeMenuElemnt, {
        duration: 0.5,
        opacity: 0,
        display: "none",
      });
    }
  };

  useEffect(() => {
    const myElement = document.querySelector(".menu-container");
    gsap.to(myElement, {
      duration: 0.5,
      opacity: 1,
    });
  }, []);
  const formattedList = categoryList.map((category) => {
    return { path: `/categories/${category.id}/1`, label: category.name };
  });

  return (
    <div className="w-full h-4  py-3 mx-auto z-50  md:hidden">
      <div
        className="menu-container  flex justify-center text-center z-40 relative  bg-customGrey  text-lg w-full"
        id="fadeInBox"
        ref={container}
      >
        <div className="menu-bar absolute" onClick={toggleMenu}>
          <div className="menu-open">
            <p>カテゴリー</p>
          </div>
        </div>
        <div
          className="menu-overlay  absolute  hidden z-50"
          onClick={toggleMenu}
        >
          <div className="menu-overlay-bar">
            <div className="menu-logo">
              <div>カテゴリー</div>
            </div>
          </div>
          <div className="menu-close-icon">
            <p>&#x2715;</p>
          </div>
          <div className="menu-copy ">
            <div className="menu-links">
              <Link href="/">Home</Link>
              {formattedList.map((link, index) => (
                <div className="menu-link-item" key={index}>
                  <div className="menu-link-item-holder">
                    <Link href={link.path} className="menu-link">
                      {link.label}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
