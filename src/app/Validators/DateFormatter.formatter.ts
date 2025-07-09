export function DateFormatter(date: Date | string): Date  {
  
  if (typeof date == 'object') {
    const updatedDate = new Date((date as Date).setHours(0, 0, 0, 0));
    return updatedDate;
  }

  let formatedDate = date.split('-');
  const updatedDate = new Date(
    parseInt(formatedDate[2]),
    parseInt(formatedDate[1]) - 1,
    parseInt(formatedDate[0])
  );

  updatedDate.setHours(0, 0, 0, 0);

  return updatedDate;
}
