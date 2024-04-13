import { getBlogs, getPostDetail } from "@/app/libs/getContents";
import parse, { Element, HTMLReactParserOptions } from "html-react-parser";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
type Replace = NonNullable<HTMLReactParserOptions["replace"]>;

export async function generateMetadata({
  params,
}: {
  params: { postId: string };
}): Promise<Metadata> {
  const post = await getPostDetail(params.postId);
  const metadataBase = new URL(`https://romi-travel.com/post/${params.postId}`);
  return {
    title: post.title,
    description: post.content.slice(0, 50),
    openGraph: {
      images: post.eyecatch?.url,
    },
    keywords: post.tag.map((e) => e.name),
    metadataBase: metadataBase,
  };
}

export default async function blogPage({
  params,
}: {
  params: { postId: string };
}) {
  const post = await getPostDetail(params.postId);

  if (!post) {
    notFound();
  }
  return (
    <div className="flex flex-wrap items-center justify-center my-4">
      <div className=" text-center w-11/12  bg-white rounded-lg px-3 py-4">
        <h1 className=" text-2xl">{post.title}</h1>
        <div className="flex flex-wrap items-center justify-center">
          <h2 className=" rounded-md bg-green-200 w-52 ">
            カテゴリー:{post.category.name}
          </h2>
        </div>

        <div>
          {parse(post.content, {
            replace: (domNode) => {
              const typeDomNode = domNode as Element;
              if (!(domNode instanceof Element)) return;
              if (typeDomNode.attribs && typeDomNode.name === "img") {
                const { attribs } = typeDomNode;
                const { width, height }: { width: number; height: number } = {
                  width: 1280,
                  height: 720,
                };
                return (
                  <Image
                    src={attribs.src}
                    width={width}
                    height={height}
                    alt={attribs.alt ? attribs.alt : "Image"}
                    className="mx-auto"
                  />
                );
              }
            },
          })}
        </div>
      </div>
    </div>
  );
}

export const generateStaticParams = async () => {
  const { contents } = await getBlogs();
  const paths = contents.map((post) => {
    return {
      postId: post.id,
    };
  });

  return [...paths];
};
