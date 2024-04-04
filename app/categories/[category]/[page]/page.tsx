import ArticleCard from "@/app/components/ArticleCard";
import CategoryPage from "@/app/components/CategoryPage";
import { Pagination } from "@/app/components/Pagination";
import { apiClient } from "@/app/libs/apiClient";
import { getBlogs, getCategories } from "@/app/libs/getContents";
import { useLayoutEffect, useRef } from "react";

const PER_PAGE = 6;
export default async function categoryPages({
  params,
}: {
  params: { page: string; category: string };
}) {
  const data = await getBlogs({
    filters: `category[equals]${params.category}`,
  });
  // console.log(data);
  const id = Number(params.page);
  const totalCount = data.totalCount;
  const categoryName = await getCategories({
    filters: `id[equals]${params.category}`,
    fields: `name`,
  });
  console.log(categoryName);
  const category = categoryName.contents[0].name;
  if (data.totalCount === 0) {
    return (
      <h1 className="text-3xl flex justify-center text-center my-4">
        お探しの記事が見つかりません
      </h1>
    );
  }

  return (
    <div>
      <div>
        {/* <h1 className="text-3xl flex justify-center text-center my-4">
          カテゴリー：<div className={``}>{category}</div>
        </h1>
        <ul className="js-show-on-scroll">
          {data.contents.map((blog) => {
            return (
              <li key={blog.id} className="flex flex-wrap post">
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
        <Pagination totalCount={totalCount} currentPage={id} /> */}
        <CategoryPage currentPage={id} postsData={data} />
      </div>
    </div>
  );
}

export const generateStaticParams = async () => {
  const repos = await apiClient.getList({ endpoint: "blogs" });
  const { contents: categories } = await getCategories();
  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  const pagePaths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map(
    (repo) => ({ page: repo.toString() })
  );

  const categoryPaths = categories.map((category) => ({
    category: category.id,
  }));

  return [pagePaths, categoryPaths];
};
