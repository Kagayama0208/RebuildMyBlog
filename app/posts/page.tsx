import Link from "next/link";
import { getBlogs } from "../libs/getContents";
import Image from "next/image";
import ArticleCard from "../components/ArticleCard";
import { getBlogCount } from "../libs/getContents";
import { Pagination } from "../components/Pagination";
import { useState } from "react";

export default async function BlogsPage() {
  const PER_PAGE = 6;
  const data = getBlogCount({ limit: 0, offset: PER_PAGE });
  // console.log(data);
  const totalCount = (await data).props.totalCount;
  // console.log(totalCount);

  // offsetは開始位置 limitは取得個数
  const { contents } = await getBlogs({ offset: 0, limit: PER_PAGE });

  if (!contents || contents.length === 0) {
    return <h1>No contents</h1>;
  }

  return (
    <div>
      
      <ul>
        {contents.map((post) => {
          return (
            <li key={post.id} className="flex flex-wrap">
              {post.eyecatch?.url && (
                <ArticleCard
                  title={post.title}
                  imageURL={post.eyecatch.url}
                  id={post.id}
                  category={post.category.name}
                  createdDate={post.createdAt}
                />
              )}
            </li>
          );
        })}
      </ul>
      <Pagination totalCount={totalCount} />
    </div>
  );
}
