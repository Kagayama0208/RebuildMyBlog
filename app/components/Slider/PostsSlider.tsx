"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  FreeMode,
  Navigation,
  Pagination,
} from "swiper/modules";
import {
  MicroCMSContentId,
  MicroCMSDate,
  MicroCMSImage,
  MicroCMSListResponse,
} from "microcms-js-sdk";
import { Blog } from "@/app/libs/getContents";
import { CiCalendarDate, CiShoppingTag } from "react-icons/ci";
import Link from "next/link";
import Image from "next/image";

const PostsSlider = ({
  postsList,
}: {
  postsList: ({
    id: string;
    title: string;
    content: string;
    eyecatch?: MicroCMSImage | undefined;
    category: {
      id: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      revisedAt: string;
      name: string;
    };
    tag: [
      {
        id: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        revisedAt: string;
        name: string;
      }
    ];
  } & MicroCMSDate &
    MicroCMSContentId)[];
}) => {
  const posts = postsList;

  if (!postsList) {
    <div>新着記事は現在ありません</div>;
  } else {
    return (
      <div className="p-2 my-4 w-full max-w-4xl h-[400]">
        <Swiper
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {posts.map((content) => {
            const createdDate = content.createdAt;
            const date = new Date(createdDate);
            const year = date.getFullYear();
            const month = date.getMonth() + 1; // 月は0から始まるため、+1する
            const day = date.getDate();
            const formattedDate = `${year}-${month
              .toString()
              .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
            return (
              <SwiperSlide key={content.id}>
                <div className=" md:w-[300] md:h-[450] bg-slate-300">
                  <Link href={`/post/${content.id}`} className="flex flex-col">
                    <div className="w-full h-1/2 eyecatch-image">
                      <Image
                        src={`${content.eyecatch?.url}?fit=max&w=400&h=300`}
                        alt="blog eyecatch"
                        width={400}
                        height={300}
                        style={{
                          width: "100%",
                          height: "auto",
                        }}
                      />
                    </div>

                    <div className="w-full p-5 text-com h-1/2">
                      <h2 className=" font-bold text-xl py-2 ">
                        {content.title}
                      </h2>
                      <div className="flex">
                        <p>カテゴリ：</p>
                        {content.category && <p>{content.category.name}</p>}
                      </div>
                      <div className="flex">
                        <p className="flex items-center justify-center">
                          <CiShoppingTag />:
                        </p>
                        {content.tag &&
                          content.tag.map((t) => {
                            return (
                              <p key={t.id} className="pr-2">
                                {t.name}
                              </p>
                            );
                          })}
                      </div>
                      <div>
                        <p className="flex items-center">
                          <CiCalendarDate />:{formattedDate}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    );
  }
};

export default PostsSlider;
