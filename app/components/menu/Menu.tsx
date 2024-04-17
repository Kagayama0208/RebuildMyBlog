"use client";

import { Category, getCategories } from "@/app/libs/getContents";
import { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { IoMenu } from "react-icons/io5";

const Menu = ({
  categoryList,
}: {
  categoryList: (Category & MicroCMSContentId & MicroCMSDate)[];
}) => {
  const container = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleFunction = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log(isMenuOpen);

    if (!isMenuOpen) {
      const menuElement = document.querySelector(".ham-menu");
      const menuLink = document.querySelectorAll(".menu-link");
      gsap.to(menuElement, {
        duration: 1,
        opacity: 1,
        height: "60vh",
        ease: "expo.inOut",
      });
      menuLink.forEach((e) => {
        gsap.to(e, {
          duration: 1,
          delay: 0.5,
          opacity: 1,
          y: 20,
          stagger: 0.1,
          ease: "expo.inOut",
        });
      });
    } else {
      const menuElement = document.querySelector(".ham-menu");
      const menuLink = document.querySelectorAll(".menu-link");
      gsap.to(menuElement, {
        duration: 1,
        opacity: 0,
        height: 0,
        delay: 0.5,
        ease: "expo.inOut",
      });
      menuLink.forEach((e) => {
        gsap.to(e, {
          duration: 1,
          opacity: 0,
          y: 0,
          stagger: 0.1,
          ease: "expo.inOut",
        });
      });
    }
  };

  const formattedList = categoryList.map((category) => {
    return { path: `/categories/${category.id}/1`, label: category.name };
  });

  return (
    <nav className="nav w-full h-full relative z-50">
      <div className="wrapper h-full " ref={container}>
        <div className="top-menu h-full max-w-6xl flex flex-wrap justify-between text-center items-center mx-auto">
          <div>
            <Link href="/" className=" text-xl px-4">
              RoMi
            </Link>
          </div>

          <div className="hum-wrapper px-4 md:hidden" onClick={toggleFunction}>
            <div className="ham">
              <span>☰</span>
            </div>
          </div>

          <ul className="flex-wrap flex-row hidden md:flex">
            {formattedList.map((link, index) => (
              <div className="menu-link-item p-5" key={index}>
                <div className="menu-link-item-holder">
                  <Link href={link.path}>{link.label}</Link>
                </div>
              </div>
            ))}
            <Link key="posts" href="/posts/1" className="p-5 ">
              記事一覧
            </Link>
          </ul>
        </div>

        <ul className="ham-menu md:hidden opacity-0 absolute w-screen z-50 flex flex-wrap flex-col justify-center text-center items-center  bg-gray-700 text-gray-400">
          {formattedList.map((link, index) => (
            <Link
              href={link.path}
              className="menu-link p-5"
              onClick={toggleFunction}
              key={index}
            >
              {link.label}
            </Link>
          ))}
          <Link
            key="posts"
            href="/posts/1"
            className="p-5 menu-link"
            onClick={toggleFunction}
          >
            記事一覧
          </Link>
        </ul>
      </div>
    </nav>
  );
};

// {formattedList.map((link, index) => (
//   <div className="menu-link-item" key={index}>
//     <div className="menu-link-item-holder">
//       <Link href={link.path} className="menu-link">
//         {link.label}
//       </Link>
//     </div>
//   </div>
// ))}

export default Menu;
