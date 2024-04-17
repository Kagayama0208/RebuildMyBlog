import type { Metadata } from "next";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import ImageSlider from "./components/Slider/ImageSlider";
import PostsSlider from "./components/Slider/PostsSlider";
import AnimateSection from "./components/AnimationSection";
import { getBlogs } from "./libs/getContents";

export const metadata: Metadata = {
  description:
    "This page is blog and portfolio web site using microCMS, Next.js. ",
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
      <div>
        <div className="w-full">
          <section id="newPosts" className=" my-3">
            <div className="smooth-content w-full flex items-center justify-center flex-col">
              <h1 className="text-4xl">新着記事</h1>

              <div className="flex  items-center justify-center mx-auto px-10 w-full">
                <PostsSlider postsList={newPosts} />
              </div>
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
              <h2 className="text-xl mb-4">About me</h2>
              <div className=" w-14 h-[1px] bg-black my-2"></div>
              <p>
                私は風景写真、ソーシャルゲームが好きなKagayamaです。日々の生活でADHDとASDと向き合いながら、薬を飲んで充実した日々を過ごしています。美しい風景を見ることが好きで、それを写真としてシェアすることが楽しみです。読者の皆さんと共感を共有できることを願っています。よろしくお願いします！
              </p>
            </div>
          </div>
          <h1 className=" font-bold text-3xl justify-center text-center my-2">
            Photo Gallery
          </h1>
          <ImageSlider slideImages={slideImages} />
        </div>
      </div>
    </main>
  );
}
