"use client";

import Image from "next/image";
import Link from "next/link";
import { CiCalendarDate, CiShoppingTag } from "react-icons/ci";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const ArticleCard = ({
  title,
  imageURL,
  id,
  category,
  createdDate,
  page,
  tag,
}: {
  title: string;
  imageURL: string;
  id: string;
  category: string;
  createdDate: string;
  page?: number;
  tag?: [
    {
      id: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      revisedAt: string;
      name: string;
    }
  ];
}) => {
  const date = new Date(createdDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 月は0から始まるため、+1する
  const day = date.getDate();

  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  // animation

  return (
    <div
      id="post"
      className="post md:h-[250px] mx-auto my-2 w-full bg-white dark:bg-slate-500 rounded-xl overflow-hidden  md:w-[650]  flex justify-center"
    >
      <Link href={`/post/${id}`} className="flex flex-col  md:flex-row w-full">
        <div className="w-full md:w-1/2 eyecatch-image  overflow-hidden">
          <Image
            src={`${imageURL}?fit=max&w=400&h=400`}
            alt="blog eyecatch"
            width={400}
            height={400}
            quality={100}
            objectFit="cover"
          />
        </div>

        <div className=" md:w-1/2 w-full p-5 text-com">
          <h2 className=" font-bold text-xl py-2 ">{title}</h2>
          <div className="flex">
            <p>カテゴリ：</p>
            {category && <p>{category}</p>}
          </div>
          <div className="flex">
            <p className="flex items-center justify-center">
              <CiShoppingTag />:
            </p>
            {tag &&
              tag.map((t) => {
                return (
                  <p key={t.id} className="pr-2">
                    {t.name}
                  </p>
                );
              })}
          </div>
          <div>
            <p className="flex items-center">
              <CiCalendarDate />: {formattedDate}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ArticleCard;
