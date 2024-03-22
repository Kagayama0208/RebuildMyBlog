import { apiClient } from "../libs/apiClient";
import { getBlogs } from "../libs/getContents";
import ArticleCard from "./ArticleCard";
import { Pagination } from "./Pagination";

const CategoryPage = async ({
  categoryId,
  currentPage,
}: {
  categoryId: string;
  currentPage: number;
}) => {
  const filteredPosts = await getBlogs({
    filters: `category[equals]${categoryId}`,
  });
  const totalCount = filteredPosts.totalCount;
  return (
    <div>
      <h1 className="text-3xl text-center py-5">記事一覧</h1>
      <ul className="js-show-on-scroll">
        {filteredPosts.contents.map((blog) => {
          return (
            <li key={blog.id} className="flex flex-wrap">
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
