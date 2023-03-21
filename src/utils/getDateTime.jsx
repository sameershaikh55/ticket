export const getDateTime = (date) => {
  const originalDate = new Date(date);
  const year = originalDate.getFullYear();
  const month = originalDate.getMonth() + 1;
  const day = originalDate.getDate();
  const formattedDate = `${day.toString().padStart(2, "0")}-${month
    .toString()
    .padStart(2, "0")}-${year}`;

  const originalTime = new Date(date);
  const hour = originalTime.getHours() + 1;
  const minutes = originalTime.getMinutes() + 1;

  return `${formattedDate} - ${hour}:${minutes} uur`;
};
