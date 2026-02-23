interface Range {
  startDate: Date;
  endDate: Date;
}

export const getCurrentRangeWeek = (): Range => {
  const now = new Date();
  const current = new Date(now);

  const day = current.getDay();

  const diffToMonday = day === 0 ? -6 : 1 - day;

  const startDate = new Date(current);
  startDate.setDate(current.getDate() + diffToMonday);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  endDate.setHours(23, 59, 59, 999);

  return { startDate, endDate };
};