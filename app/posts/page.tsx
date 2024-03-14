import Link from "next/link";
import { getBlogs } from "../libs/getContents";
import Image from "next/image";
import ArticleCard from "../components/ArticleCard";

export default async function BlogsPage() {
  const PER_PAGE = 6;
  
  // offsetは開始位置 limitは取得個数
  const { contents } = await getBlogs({ offset: 0, limit: PER_PAGE });
  console.log(contents);

  if (!contents || contents.length === 0) {
    return <h1>No contents</h1>;
  }

  return (
    <div>
      <ul className="js-show-on-scroll">
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
    </div>
  );
}
