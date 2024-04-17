"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

const ImageSlider = ({
  slideImages,
}: {
  slideImages: { src: string; alt: string }[];
}) => {
  return (
    <div className="flex  items-center justify-center mx-auto px-10 max-w-6xl">
      <Swiper
        navigation={true}
        pagination={{ type: "bullets" }}
        modules={[Navigation, Pagination]}
        className="flex w-full rounded-lg  "
        effect={"coverflow"}
        centeredSlides={true}
        hashNavigation={true}
        autoplay={true}
        loop={true}
      >
        {slideImages.map((d, index) => (
          <>
            <SwiperSlide key={index} className=" w-lvw">
              <div className="flex h-full w-full items-center justify-center">
                <Image
                  width="1280"
                  height="800"
                  src={d.src}
                  alt={d.alt}
                  key={d.alt}
                  className="block h-full w-full object-cover"
                />
              </div>
            </SwiperSlide>
          </>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
