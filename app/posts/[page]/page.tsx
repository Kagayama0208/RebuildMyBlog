import Link from "next/link";
import { getBlogs } from "../../libs/getContents";
import Image from "next/image";
import ArticleCard from "../../components/ArticleCard";
import { getBlogCount } from "../../libs/getContents";
import { Pagination } from "../../components/Pagination";
import { GetStaticPaths } from "next";

import { apiClient } from "@/app/libs/apiClient";
import { Blog } from "../../libs/getContents";

const PER_PAGE = 6;

export default async function BlogsPage({
  params,
}: {
  params: { page: string };
}) {
  const id = Number(params.page); // Access the dynamic route parameter if needed

  const data = await apiClient.getList({
    endpoint: "blogs",
    queries: { offset: (id - 1) * 5, limit: PER_PAGE },
  });
  const totalCount = data.totalCount;

  return (
    <div>
      <h1 className="text-3xl text-center py-5">記事一覧</h1>
      <ul className="js-show-on-scroll">
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
      </ul>
      <Pagination totalCount={totalCount} currentPage={id} />
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

//   // offsetは開始位置 limitは取得個数
//   const { contents } = await getBlogs({ offset: 0, limit: PER_PAGE });
