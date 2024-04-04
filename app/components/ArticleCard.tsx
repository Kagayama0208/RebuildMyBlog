"use client";

import Image from "next/image";
import Link from "next/link";
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
      className="post block mx-auto my-2 w-11/12 max-w-4xl h-60 bg-white rounded-xl overflow-hidden shadow-lg hover:"
    >
      <Link href={`/post/${id}`} className="flex flex-wrap">
        <div className=" relative h-60 w-1/2">
          <Image
            src={`${imageURL}?fit=max&w=400&h=200`}
            alt="blog eyecatch"
            className=""
            layout="fill"
            objectFit="cover"
            quality={70}
          />
        </div>

        <div className=" w-1/2 px-3">
          <h2 className=" font-bold text-xl py-2 ">{title}</h2>
          <div className="flex">
            <p>カテゴリ：</p>
            {category && <p>{category}</p>}
          </div>
          <div className="flex">
            <p>タグ：</p>
            {tag &&
              tag.map((t) => {
                return (
                  <p key={t.id} className="pr-2">
                    {t.name}
                  </p>
                );
              })}
          </div>
          <div className=" relative ">
            <p className=" absolute top-1/2">{formattedDate}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ArticleCard;
