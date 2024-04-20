import { getBlogs, getPostDetail } from "@/app/libs/getContents";
import parse, { Element, HTMLReactParserOptions } from "html-react-parser";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import * as cheerio from "cheerio";
type Replace = NonNullable<HTMLReactParserOptions["replace"]>;

import "./style.css";

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
  // 目次
  const $ = cheerio.load(post.content);
  const headings = $("h1, h2, h3, h4, h5").toArray();

  const toc = headings.map((data: any) => ({
    text: data.children[0].data,
    id: data.attribs.id,
    name: data.name,
  }));

  return (
    <div className="flex flex-wrap items-center justify-center my-4">
      <div className=" text-center w-11/12  bg-white rounded-lg px-3 py-4">
        <h1 className=" text-2xl">{post.title}</h1>
        <div className="flex flex-wrap items-center justify-center">
          <p className=" rounded-md bg-green-200 w-52 ">
            カテゴリー:{post.category.name}
          </p>
        </div>

        <div className="m-4 py-5 px-9 bg-slate-400 w-60 mx-auto rounded-lg text-gray-100">
          <section id="table-contents">
            <h2 className="text-2xl">目次</h2>
            <ul id="lists" className="text-lg">
              {toc.map((toc, index) => (
                <li id={toc.id} key={index} className="gap-2">
                  <a href={`#${toc.id}`}>{toc.text}</a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="text-left w-3/4 mx-auto">
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
                    quality={100}
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
