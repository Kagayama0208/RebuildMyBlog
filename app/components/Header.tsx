import { getCategories } from "../libs/getContents";
import Menu from "./menu/Menu";

const Header = async () => {
  const { contents: categories } = await getCategories();
  return (
    <header className="bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark header md:h-32 h-24 w-full z-50 sticky">
      <Menu categoryList={categories} />
    </header>
  );
};

export default Header;
