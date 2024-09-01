import { getAllTags, getBlogs } from "../../libs/getContents";
import { Metadata } from "next";
import { apiClient } from "@/app/libs/apiClient";

import TagFilter from "@/app/components/TagFilter";

export const metadata: Metadata = {
  title: "記事一覧",
  description: "すべての記事の一覧です。",
};

const PER_PAGE = 12;

export default async function BlogsPage({
  params,
}: {
  params: { page: string };
}) {
  const id = Number(params.page); // Access the dynamic route parameter

  const TagsData = await getAllTags();

  const allTagsName = TagsData.contents.map((e) => e.name);

  const allPostsData = await getBlogs();

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen">
      <div className="h-full container mx-auto px-4">
        <h1 className="text-3xl text-center py-5 text-text-light dark:text-text-dark font-bold">
          記事一覧
        </h1>
        <div className="flex flex-wrap text-center justify-center">
          <TagFilter
            allTags={allTagsName}
            allPosts={allPostsData}
            pageParams={id}
          />
        </div>
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

//   // offsetは開始位置 limitは取得個数
//   const { contents } = await getBlogs({ offset: 0, limit: PER_PAGE });
