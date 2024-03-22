
import Link from "next/link";
import Image from "next/image";
import { getCategories } from "../libs/getContents";

const Header = async () => {
  const { contents: categories } = await getCategories();
  // console.log(categories);
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-6 dark:bg-gray-800 border-b">
        <div className="flex flex-wrap justify-between items-center  max-md:flex-col max-lg:flex-row">
          <Link href="/" className="px-10">
            <Image
              src="/static/logo-navigation.svg"
              width="150"
              height="150"
              alt={"logo"}
            />
          </Link>
          <div className="max-md:pt-2">
            <ul className="flex flex-wrap max-sm:flex-col max-sm:items-center">
              {categories.map((category) => {
                return (
                  <Link
                    key={category.id}
                    href={{
                      pathname: "/posts",
                      query: { category: category.id },
                    }}
                    className="px-3 hover:font-bold"
                  >
                    <li className="">{category.name}</li>
                  </Link>
                );
              })}
              <Link
                key="posts"
                href="/posts/1"
                className="px-3 hover:font-bold"
              >
                記事一覧
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
