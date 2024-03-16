import Link from "next/link";

export const Pagination = ({
  totalCount,
  currentPage,
}: {
  totalCount: number;
  currentPage: number;
}) => {
  const PER_PAGE = 5;
  console.log(currentPage);
  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  return (
    <ul className="flex flex-wrap text-slate-950 items-center justify-center py-3">
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((_number, index) => (
        <li
          key={index}
          className={`mx-2 text-lg bg-slate-400 w-5 flex items-center justify-center rounded-md ${
            currentPage === _number ? "bg-blue-500" : ""
          }`}
        >
          <Link href={`/posts/${_number}`}>{_number}</Link>
        </li>
      ))}
    </ul>
  );
};
