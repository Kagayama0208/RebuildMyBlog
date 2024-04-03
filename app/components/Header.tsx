import Link from "next/link";
import Image from "next/image";
import { getCategories } from "../libs/getContents";
import Menu from "./menu/Menu";

const Header = async () => {
  const { contents: categories } = await getCategories();
  // console.log(categories);
  return (
    <header className=" bg-customGrey  z-50 ">
      <nav className=" border-gray-200 px-4 lg:px-6 py-6 dark:bg-gray-800 border-b text-gray-600 ">
        <div className="flex flex-wrap justify-between items-center  max-md:flex-col max-lg:flex-row">
          <Link href="/" className="px-10 text-center">
            <h1 className="text-5xl">RoMi</h1>
            <p>roaming mindfully</p>
          </Link>
          <div className="max-md:pt-2">
            <ul className="flex flex-wrap flex-row items-center max-md:hidden">
              {categories.map((category) => {
                return (
                  <Link
                    key={category.id}
                    href={{
                      pathname: "/posts",
                      query: { category: category.id },
                    }}
                    className="px-3 transition-all hover:scale-110 hover:font-bold"
                  >
                    <li className="">{category.name}</li>
                  </Link>
                );
              })}
              <Link
                key="posts"
                href="/posts/1"
                className="px-3 hover:font-bold hover:scale-110 "
              >
                記事一覧
              </Link>
            </ul>
          </div>
          <div className="w-full">
            <Menu categoryList={categories} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
