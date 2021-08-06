export default function convertTimestampToDatetime(timestamp) {
  const year = timestamp.slice(0, 3);
  const month = timestamp.slice(4, 6);
  const day = timestamp.slice(8, 9);

  const date = new Date(year, +month - 1, day);

  return Intl.DateTimeFormat("th-TH", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).format(date);
}
