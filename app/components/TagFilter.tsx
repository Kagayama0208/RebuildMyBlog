"use client";

import { useState } from "react";
import { Blog } from "../libs/getContents";
import { MicroCMSListResponse } from "microcms-js-sdk";
import ArticleCard from "./ArticleCard";
import { Pagination } from "./Pagination";

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
      setActiveTags(newActiveTags);
      const tagArray = postsData.filter(({ tag }) => {
        if (!tag || newActiveTags.includes("all")) {
          return postsData;
        } else {
          return tag.some((t) => {
            return newActiveTags.includes(t.name);
          });
        }
      });
      console.log(tagArray);
      setDisplayItems(tagArray);
    }
  };

  return (
    <div className=" w-4/5">
      <div>
        <div className="searchbutton-area">
          <div className="searchbutton__tags">
            {allTags.map((tag) => {
              return (
                <button
                  data-tag={tag}
                  onClick={tagClick}
                  className={`searchbutton__tag px-2 py-1 mx-1 my-1 rounded-full ${
                    activeTags.includes(tag) ? "active bg-lime-600" : ""
                  }`}
                  key={tag}
                >
                  # {tag}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => {
              setDisplayItems(allPosts.contents), setActiveTags(["all"]);
            }}
            className={`searchbutton__tag px-2 py-1 mx-1 my-1 rounded-full ${
              activeTags.includes("all") ? "active bg-lime-600" : ""
            }`}
            key="allPosts"
          >
            # AllPosts
          </button>
        </div>
        <ul className="js-show-on-scroll">
          {displayItems.map((blog, index) => {
            if (index >= startIndex && index < endIndex) {
              return (
                <li key={blog.id} className="flex flex-wrap">
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
        <div>
          <Pagination totalCount={totalCount} currentPage={id} />
        </div>
      </div>
    </div>
  );
};

export default TagFilter;
