"use client";

import { MicroCMSListResponse } from "microcms-js-sdk";
import { apiClient } from "../libs/apiClient";
import { Blog, getBlogs } from "../libs/getContents";
import ArticleCard from "./ArticleCard";
import { Pagination } from "./Pagination";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
const CategoryPage = ({
  currentPage,
  postsData,
}: {
  currentPage: number;
  postsData: MicroCMSListResponse<Blog>;
}) => {
  const filteredPosts = postsData;
  const totalCount = filteredPosts.totalCount;
  // animation
  const postsRef = useRef<HTMLUListElement | null>(null);
  useLayoutEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const articleCard = entry.target as HTMLElement;
          gsap.fromTo(
            articleCard,
            {
              x: 50,
              opacity: 0,
            },
            {
              x: 0,
              opacity: 1,
              duration: 3, // Adjust duration as needed
              ease: "power3.out", // Adjust easing as needed
            }
          );
        }
      });
    });
    const articleCards = postsRef.current?.querySelectorAll(".post");
    articleCards?.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [postsRef]);
  return (
    <div>
      <h1 className="text-3xl text-center py-5">記事一覧</h1>
      <h2 className="text-xl text-center py-5">
        カテゴリー：{postsData.contents[0].category.name}
      </h2>
      <ul className="js-show-on-scroll" ref={postsRef}>
        {filteredPosts.contents.map((blog) => {
          return (
            <li
              key={blog.id}
              className="post flex flex-wrap max-w-[350px] md:flex-row md:w-11/12 md:max-w-4xl mx-auto"
            >
              {blog.eyecatch?.url && (
                <ArticleCard
                  title={blog.title}
                  imageURL={blog.eyecatch.url}
                  id={blog.id}
                  category={blog.category.name}
                  createdDate={blog.createdAt}
                  page={currentPage}
                />
              )}
            </li>
          );
        })}
      </ul>
      <Pagination totalCount={totalCount} currentPage={currentPage} />
    </div>
  );
};

export default CategoryPage;
