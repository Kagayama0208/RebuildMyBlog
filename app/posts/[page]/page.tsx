import Link from "next/link";
import { getAllTags, getBlogs } from "../../libs/getContents";
import Image from "next/image";
import ArticleCard from "../../components/ArticleCard";
import { getBlogCount } from "../../libs/getContents";
import { Pagination } from "../../components/Pagination";
import { GetStaticPaths } from "next";

import { apiClient } from "@/app/libs/apiClient";
import { Blog } from "../../libs/getContents";
import TagFilter from "@/app/components/TagFilter";

const PER_PAGE = 6;

export default async function BlogsPage({
  params,
  searchParams,
}: {
  params: { page: string };
  searchParams?: { category: string };
}) {
  const id = Number(params.page); // Access the dynamic route parameter if needed
  // console.log(searchParams);

  const TagsData = await getAllTags();
  // console.log(TagsData);
  const allTagsName = TagsData.contents.map((e) => e.name);
  // console.log(allTagsName);
  const data = await getBlogs({ offset: (id - 1) * 5, limit: PER_PAGE });
  const allPostsData = await getBlogs();
  const contents= allPostsData.contents.map((e) => e)
  // console.log(allPostsData);
  const totalCount = data.totalCount;

  return (
    <div>
      <div>
        <h1 className="text-3xl text-center py-5">記事一覧</h1>
        <div className="flex flex-wrap text-center justify-center">
          <TagFilter allTags={allTagsName} allPosts={allPostsData} pageParams={id}/>
        </div>
        {/* <ul className="js-show-on-scroll">
          {data.contents.map((blog) => {
            return (
              <li key={blog.id} className="flex flex-wrap">
                {blog.eyecatch?.url && (
                  <ArticleCard
                    title={blog.title}
                    imageURL={blog.eyecatch.url}
                    id={blog.id}
                    category={blog.category.name}
                    createdDate={blog.createdAt}
                    page={id}
                  />
                )}
              </li>
            );
          })}
        </ul> */}
        {/* <Pagination totalCount={totalCount} currentPage={id} /> */}
      </div>
    </div>
  );
}

export const generateStaticParams = async () => {
  const repos = await apiClient.getList({ endpoint: "blogs" });
  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map(
    (repo) => ({ page: repo.toString() })
  );

  return paths;
};

export const revalidate = 3600;
//   // offsetは開始位置 limitは取得個数
//   const { contents } = await getBlogs({ offset: 0, limit: PER_PAGE });
