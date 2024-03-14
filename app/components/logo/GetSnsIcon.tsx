import { FaTwitter, FaInstagram } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";

const GetSnsIcon = ({ name }: { name: string }) => {
  if (!name) {
    return null;
  }
  const formatedName = name.toLowerCase();
  switch (formatedName) {
    case "twitter":
      return <FaTwitter />;
    case "instagram":
      return <FaInstagram />;
    case "thread":
      return <FaThreads />;
    default:
      return null;
  }
};

export default GetSnsIcon;
