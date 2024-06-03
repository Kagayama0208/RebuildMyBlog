import { getCategories } from "../libs/getContents";
import Menu from "./menu/Menu";

const Header = async () => {
  const { contents: categories } = await getCategories();
  // console.log(categories);
  return (
    <header className=" bg-slate-600  header md:h-32 h-24 w-full z-50">
      <Menu categoryList={categories} />
    </header>
  );
};

export default Header;
