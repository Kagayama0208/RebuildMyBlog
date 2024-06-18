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
    <footer className=" mt-4 bg-slate-600 h-36 flex justify-center items-center border-gray-200 ">
      <div className="text-white">
        <ScrollToTop />

        <div className="">
          <ul className="flex justify-center items-center ">
            {list.map((item) => (
              <li key={item.text} className="px-3 py-2 ">
                <Link href={item.href} className="">
                  <GetSnsIcon name={item.text} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="copyright text-white">©2024 Kagayama</p>
      </div>
    </footer>
  );
};

export default Footer;
