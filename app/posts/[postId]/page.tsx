import { notFound } from "next/navigation";
import parse from "html-react-parser";
import { getBlogs, getPostDetail } from "@/app/libs/getContents";

export async function generateStaticParams() {
  const { contents } = await getBlogs();

  const paths = contents.map((post) => {
    return {
      postId: post.id,
    };
  });

  return [...paths];
}

export default async function staticDetailPage({
  params: { postId },
}: {
  params: { postId: string };
}) {
  const post = await getPostDetail(postId);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <div>{parse(post.content)}</div>
    </div>
  );
}
