"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Blog } from "../libs/getContents";
import { MicroCMSListResponse } from "microcms-js-sdk";
import ArticleCard from "./ArticleCard";
import { Pagination } from "./Pagination";
import gsap from "gsap";

const TagFilter = ({
  pageParams,
  allTags,
  allPosts,
}: {
  pageParams: number;
  allTags: string[];
  allPosts: MicroCMSListResponse<Blog>;
}) => {
  const postsData = allPosts.contents;
  const [displayItems, setDisplayItems] = useState(postsData);
  const id = pageParams;
  const totalCount = displayItems.length;
  const startIndex = (id - 1) * 6;
  const endIndex = id * 6;

  const [activeTags, setActiveTags] = useState<string[]>(["all"]);

  const tagClick = (e: React.MouseEvent) => {
    const targetElement = e.target as Element;
    const tagSearch = targetElement.getAttribute("data-tag");
    // console.log(tagSearch);
    if (tagSearch) {
      let newActiveTags: string[];
      if (activeTags?.includes(tagSearch)) {
        newActiveTags = activeTags.filter((tag) => tag !== tagSearch);
      } else {
        newActiveTags = [
          ...activeTags.filter((tag) => tag !== "all"),
          tagSearch,
        ];
      }

      console.log(newActiveTags);
      console.log(newActiveTags.length);
      setActiveTags(newActiveTags);
      // tagArrayには表示するポストが欲しい
      let tagArray;
      if (newActiveTags.length === 0) {
        setActiveTags(["all"]);
        tagArray = postsData;
      } else {
        tagArray = postsData.filter(({ tag }) => {
          if (newActiveTags.includes("all")) {
            return true;
          } else {
            return tag.some((t) => {
              return newActiveTags.includes(t.name);
            });
          }
        });
      }
      console.log(tagArray);
      setDisplayItems(tagArray);
    }
  };
  // フワっと表示するアニメーション
  const postRef = useRef<HTMLUListElement | null>(null); //useRef hook でポストelementを保存
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
              duration: 2, // Adjust duration as needed
              ease: "power3.out", // Adjust easing as needed
            }
          );
        }
      });
    });
    const articleCards = postRef.current?.querySelectorAll(".post");
    articleCards?.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [postRef]);

  return (
    <div className="w-4/5 text-text-light dark:text-text-dark">
      <div>
        <div className="searchbutton-area mb-6">
          <div className="searchbutton__tags flex flex-wrap justify-center">
            {allTags.map((tag) => {
              return (
                <button
                  data-tag={tag}
                  onClick={tagClick}
                  className={`searchbutton__tag px-3 py-1 m-1 rounded-full border border-primary-light dark:border-primary-dark transition-colors duration-200 ${
                    activeTags.includes(tag)
                      ? "active bg-primary-light dark:bg-primary-dark text-text-light dark:text-text-dark"
                      : "bg-surface-light dark:bg-surface-dark hover:bg-primary-light hover:dark:bg-primary-dark"
                  }`}
                  key={tag}
                >
                  # {tag}
                </button>
              );
            })}
          </div>
          <button
            onClick={tagClick}
            className={`searchbutton__tag px-3 py-1 m-1 rounded-full border border-primary-light dark:border-primary-dark transition-colors duration-200 ${
              activeTags.includes("all")
                ? "active bg-primary-light dark:bg-primary-dark text-text-light dark:text-text-dark"
                : "bg-surface-light dark:bg-surface-dark hover:bg-primary-light hover:dark:bg-primary-dark"
            }`}
            key="allPosts"
            data-tag="all"
          >
            # AllPosts
          </button>
        </div>
        <ul
          className="js-show-on-scroll flex flex-wrap flex-col justify-center items-center gap-4 w-full"
          ref={postRef}
        >
          {displayItems.map((blog, index) => {
            if (index >= startIndex && index < endIndex) {
              return (
                <li
                  key={blog.id}
                  className="post max-w-[350px] md:flex-row md:w-11/12 md:max-w-4xl"
                >
                  {blog.eyecatch?.url && (
                    <ArticleCard
                      title={blog.title}
                      imageURL={blog.eyecatch.url}
                      id={blog.id}
                      category={blog.category.name}
                      createdDate={blog.createdAt}
                      tag={blog.tag}
                    />
                  )}
                </li>
              );
            }
          })}
        </ul>
        <div className="mt-8">
          <Pagination totalCount={totalCount} currentPage={id} />
        </div>
      </div>
    </div>
  );
};

export default TagFilter;
