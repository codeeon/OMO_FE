export const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1);
  const day = String(today.getHours());

  const formattedDateTime = `${year}.${month}.${day}`;
  return formattedDateTime;
};
