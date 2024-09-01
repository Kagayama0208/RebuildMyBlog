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
    <footer className="pt-4 bg-surface-light dark:bg-surface-dark h-36 flex justify-center items-center border-t border-border-light dark:border-border-dark">
      <div className="text-text-light dark:text-text-dark">
        <ScrollToTop />

        <div className="">
          <ul className="flex justify-center items-center">
            {list.map((item) => (
              <li key={item.text} className="px-3 py-2">
                <Link
                  href={item.href}
                  className="hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-200"
                >
                  <GetSnsIcon name={item.text} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="copyright text-subtext-light dark:text-subtext-dark">
          ©2024 Kagayama
        </p>
      </div>
    </footer>
  );
};

export default Footer;
