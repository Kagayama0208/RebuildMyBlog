import type { Metadata } from "next";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import ImageSlider from "./components/Slider/ImageSlider";
import PostsSlider from "./components/Slider/PostsSlider";
import AnimateSection from "./components/AnimationSection";
import { getBlogs } from "./libs/getContents";
import Link from "next/link";
import { formatDate } from "./components/fomatDate";

export const metadata: Metadata = {
  description:
    "This page is blog and portfolio web site using microCMS, Next.js.",
};

const slideImages = [
  // ここの画像は必ず4:3
  {
    src: "/images/shrine/_K4A2213-強化-SR-1-1.jpg",
    alt: "厳島神社",
  },
  { src: "/images/shrine/_K4A2237-1-1.jpg", alt: "厳島神社" },
  { src: "/images/3-4/fuji1.jpg", alt: "fuji1" },
  { src: "/images/3-4/fuji2.jpg", alt: "fuji2" },
  { src: "/images/3-4/fuji3.jpg", alt: "fuji3" },
  { src: "/images/3-4/fuji4.jpg", alt: "fuji4" },
  { src: "/images/3-4/fuji5.jpg", alt: "fuji5" },
];

export default async function Home() {
  const newPostsList = await getBlogs({ limit: 5 });
  const newPosts = newPostsList.contents;

  return (
    <main className="block z-10">
      <AnimateSection />
      <h1 className="text-4xl text-gray-800 text-center">最新記事</h1>
      <div>
        <div className="w-full text-gray-800">
          {/* tablet & smart phone */}
          <section id="newPosts" className=" hidden my-3 max-lg:block">
            <div className="smooth-content w-full flex items-center justify-center flex-col">
              <div className="flex  items-center justify-center mx-auto px-10 w-full">
                <PostsSlider postsList={newPosts} />
              </div>
            </div>
          </section>
          {/* PC */}
          <section className=" w-11/12 flex justify-center mx-auto my-5 max-lg:hidden ">
            <div id="big-card" className="px-2 h-full flex ">
              <div className="border-r-2 border-gray-300 px-2 w-3/4">
                <Link href={`post/${newPosts[0].id}`}>
                  <Image
                    src={
                      newPosts[0].eyecatch?.url ? newPosts[0].eyecatch?.url : ""
                    }
                    width="1000"
                    height="667"
                    alt={newPosts[0].title}
                  />
                </Link>
                <h1 className="text-3xl my-3 text-gray-900">
                  {newPosts[0].title}
                </h1>
                <p>カテゴリー：{newPosts[0].category.name}</p>
                {formatDate(newPosts[0].createdAt)}
              </div>
              <Link href={`post/${newPosts[1].id}`} id="small-card-wrapper">
                <div className="mx-4 border-b-2 border-gray-300 h-1/2 mb-2">
                  <Image
                    src={
                      newPosts[1].eyecatch?.url ? newPosts[1].eyecatch?.url : ""
                    }
                    width="500"
                    height="300"
                    alt={newPosts[1].title}
                  />
                  <h1 className="text-xl my-1 text-gray-900">
                    {newPosts[1].title}
                  </h1>
                  <p>カテゴリー：{newPosts[1].category.name}</p>
                  {formatDate(newPosts[1].updatedAt)}
                </div>
                <div>
                  <Image
                    src={
                      newPosts[2].eyecatch?.url ? newPosts[2].eyecatch?.url : ""
                    }
                    width="500"
                    height="300"
                    alt={newPosts[2].title}
                  />
                  <h1 className="text-xl my-1 p-4 text-gray-900">
                    {newPosts[2].title}
                  </h1>
                  <p>カテゴリー：{newPosts[2].category.name}</p>
                  {formatDate(newPosts[2].updatedAt)}
                </div>
              </Link>
            </div>
          </section>

          <div
            className="max-w-[822px] flex md:flex-row items-center justify-center my-6 md:w-3/4 w-5/6 mx-auto flex-col"
            id="introduction"
          >
            <div className=" md:w-1/2 bg-slate-500 m-2 rounded-2xl">
              <Image
                className="p-2 rounded-3xl w-full image"
                src="/images/myphoto.jpg"
                width="389"
                height="558"
                alt="my photo"
                layout="fixed"
              />
            </div>
            <div className=" md:w-1/2 mx-3 my-6 w-8/12 ">
              <h2 className="text-xl mb-4 text-gray-800">About me</h2>
              <div className=" w-14 h-[1px] bg-black my-2"></div>
              <p>
                大学中退したものです。工学部にいました。
                <br></br>
                現在は就活中です。
                <br />
                猫とゲーム、自然、写真が好きです。
                <br />
                このブログについて詳しく書いた記事をぜひお読みください。
              </p>
            </div>
          </div>
          <h1 className=" font-bold text-3xl justify-center text-center my- text-gray-800">
            Photo Gallery
          </h1>
          <ImageSlider slideImages={slideImages} />
        </div>
      </div>
    </main>
  );
}
