export const formatDate = (createdDate: string) => {
  const date = new Date(createdDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 月は0から始まるため、+1する
  const day = date.getDate();

  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  return <p>{formattedDate}</p>;
};
