import CategoryPage from "@/app/components/CategoryPage";
import { apiClient } from "@/app/libs/apiClient";
import { getBlogs, getCategories } from "@/app/libs/getContents";

import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { page: string; category: string };
}): Promise<Metadata> {
  const categoryName = await getCategories({
    filters: `id[equals]${params.category}`,
    fields: `name`,
  });
  const metadataBase = new URL(
    `https://romi-travel.com/category/${params.category}/${params.page}`
  );
  return {
    title: categoryName.contents[0].name,
    description: `このページは${categoryName.contents[0].name}の記事一覧です`,
    metadataBase: metadataBase,
  };
}

const PER_PAGE = 12;

export default async function categoryPages({
  params,
}: {
  params: { page: string; category: string };
}) {
  const data = await getBlogs({
    filters: `category[equals]${params.category}`,
  });
  const id = Number(params.page);

  if (data.totalCount === 0) {
    return (
      <h1 className="text-3xl h-screen flex justify-center text-center">
        お探しの記事が見つかりません
      </h1>
    );
  }

  return (
    <div>
      <div>
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
