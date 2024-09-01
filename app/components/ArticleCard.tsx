"use client";

import Image from "next/image";
import Link from "next/link";
import { CiCalendarDate, CiShoppingTag } from "react-icons/ci";

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
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  return (
    <div
      id="post"
      className="post md:h-[250px] mx-auto my-2 w-full bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden md:w-[650] flex justify-center shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <Link href={`/post/${id}`} className="flex flex-col md:flex-row w-full">
        <div className="w-full md:w-1/2 eyecatch-image overflow-hidden">
          <Image
            src={`${imageURL}?fit=max&w=400&h=400`}
            alt="blog eyecatch"
            width={400}
            height={400}
            quality={100}
            objectFit="cover"
          />
        </div>

        <div className="md:w-1/2 w-full p-5 text-text-light dark:text-text-dark">
          <h2 className="font-bold text-xl py-2 text-text-light dark:text-text-dark">
            {title}
          </h2>
          <div className="flex text-subtext-light dark:text-subtext-dark">
            <p>カテゴリ：</p>
            {category && <p>{category}</p>}
          </div>
          <div className="flex text-subtext-light dark:text-subtext-dark">
            <p className="flex items-center justify-center">
              <CiShoppingTag className="text-primary-light dark:text-primary-dark" />
              :
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
            <p className="flex items-center text-text-light dark:text-text-dark">
              <CiCalendarDate className="text-primary-light dark:text-primary-dark" />
              : {formattedDate}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ArticleCard;
