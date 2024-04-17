import Link from "next/link";
import Image from "next/image";
import { getCategories } from "../libs/getContents";
import Menu from "./menu/Menu";

const Header = async () => {
  const { contents: categories } = await getCategories();
  // console.log(categories);
  return (
    <header className=" bg-customGrey  header md:h-40 h-20 w-full z-50">
      <Menu categoryList={categories} />
    </header>
  );
};

export default Header;
