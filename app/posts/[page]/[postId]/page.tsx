import { getBlogs, getPostDetail } from "@/app/libs/getContents";
import parse from "html-react-parser";
import { notFound } from "next/navigation";

export default async function blogPage({ params }: { params: { postId: string } }){
  const post = await getPostDetail(params.postId);
  if (!post) {
    notFound();
  }
  return (
    <div>
      <h1>{post.title}</h1>
      <h2>{post.category.name}</h2>
      <div>{parse(post.content)}</div>
    </div>
  );
};

export const generateStaticParams = async () => {
  const { contents } = await getBlogs();
  const paths = contents.map((post) => {
    return {
      postId: post.id,
    };
  });

  return [...paths];
};
