"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useRef, useState } from "react";

const slideImages = [
  // ここの画像は必ず4:3
  {
    src: "/images/shrine/_K4A2213-強化-SR-1-1.jpg",
    alt: "厳島神社",
    title: "Shrine",
  },
  { src: "/images/shrine/_K4A2237-1-1.jpg", alt: "厳島神社", title: "Shrine" },
  { src: "", alt: "" },
  { src: "", alt: "" },
];

const images = [
  "/images/shrine/_K4A1933-Edit-1-1.jpg",
  "/images/shrine/_K4A2129-1-1.jpg",
  "/images/shrine/_K4A2213-強化-SR-1-1.jpg",
  "/images/shrine/_K4A2233-1.jpg",
];

export default function Home() {
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
      "*",
      {
        y: 50,
        opacity: 0,
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
  return (
    <main>
      <div className="w-full h-full flex items-center justify-center bg-gray-950">
        <div className="mx-auto h-[823px] w-[1440px] relative">
          <div className=" absolute inset-0 flex top-1/3 justify-center z-20 text-4xl">
            Roam Mindfully
          </div>
          {/* width="1440"
            height="832" */}
          <Image
            src="/images/fuji-2.jpg"
            alt="富士山"
            layout="fill"
            sizes=""
            objectFit="cover"
            className="z-10"
          />
        </div>
      </div>
      <div
        className="max-w-[822px] flex md:flex-row items-center justify-center my-6 md:w-3/4 w-5/6 mx-auto flex-col"
        id="introduction"
      >
        <div className=" md:w-1/2 bg-slate-500 m-2 rounded-2xl">
          <Image
            className="p-2 rounded-3xl w-full image"
            src="/images/myphoto.jpg"
            width="389"
            height="558"
            alt="my photo"
            layout="fixed"
          />
        </div>
        <div className=" md:w-1/2 mx-3 my-6 w-8/12 ">
          <h2 className="text-xl mb-4">About me</h2>
          <div className=" w-14 h-[1px] bg-black my-2"></div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui id
            ornare arcu odio ut sem nulla pharetra diam. Risus viverra
            adipiscing at in. Augue lacus viverra vitae congue eu consequat ac
            felis donec. Volutpat sed cras ornare arcu
          </p>
        </div>
      </div>
      <div className="w-full h-48 flex justify-center items-center bg-customGrey">
        <div>
          <h1 className="text-4xl">Mt.Fuji</h1>
        </div>
      </div>
      <div className="flex  items-center justify-center">
        <Swiper
          navigation
          pagination={{ type: "fraction" }}
          modules={[Navigation, Pagination]}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          className="flex w-full rounded-lg  "
        >
          {slideImages.map((d, index) => (
            <SwiperSlide key={index} className=" w-lvw">
              <h2>{d.title}</h2>
              <div className="flex h-full w-full items-center justify-center">
                <Image
                  width="800"
                  height="900"
                  src={d.src}
                  alt={d.alt}
                  className="block h-full w-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </main>
  );
}
