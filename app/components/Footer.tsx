import Link from "next/link";

import GetSnsIcon from "./logo/GetSnsIcon";
import ScrollToTop from "./ScrollToTop";

const list = [
  {
    href: "https://www.instagram.com/yarakashi_marnie/",
    text: "Instagram",
  },
  {
    href: "https://twitter.com/kagayama_kk",
    text: "Twitter",
  },
];

const Footer = () => {
  return (
    <footer className=" mt-4 bg-white h-36 flex justify-center items-center text-black border-gray-200  ">
      <div className="">
        <ScrollToTop />

        <div className="">
          <ul className="flex justify-center items-center">
            {list.map((item) => (
              <li key={item.text} className="px-3 py-2">
                <Link href={item.href}>
                  <GetSnsIcon name={item.text} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="copyright">©2024 Kagayama</p>
      </div>
    </footer>
  );
};

export default Footer;
