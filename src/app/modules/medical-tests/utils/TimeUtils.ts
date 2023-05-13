export const ONE_DAY_IN_MILISECONDS = 1000 * 60 * 60 * 24;
export const ONE_WEEK_IN_MILLISECONDS = ONE_DAY_IN_MILISECONDS * 7;

export function getAllDatesByWorkingHoursInDay(date: Date) {
  let dates = []
  for (let i = 8; i < 22; i++) {
    let current = new Date(date.getFullYear(), date.getMonth(), date.getDate(), i)
    dates.push(current)
  }
  return dates;
}

export function getTheLastDayOfWeek(currentDate: Date) {
  return getStartOfNextWeek(currentDate).toISOString().substring(0, 19);
}

export function getFirstDayOfWeek(currentDate: Date) {
  return getStartOfWeek(currentDate).toISOString().substring(0, 19);
}

export function getStartOfWeek(date: Date): Date {
  const startOfWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 1, 0, 0, 0);
  return startOfWeek;
}

export function getStartOfNextWeek(date: Date): Date {
  const startOfWeek = getStartOfWeek(date);
  const startOfNextWeek = new Date(startOfWeek.getTime());
  startOfNextWeek.setDate(startOfNextWeek.getDate() + 7);
  return startOfNextWeek;
}

export function getAllDaysInWeekByDate(currDate: Date) {
  var week = [];
  let date = new Date(currDate);
  // Starting Monday not Sunday
  var first = date.getDate() - date.getDay() + 1;
  date.setDate(first);
  for (var i = 0; i < 7; i++) {
    week.push(new Date(+date));
    date.setDate(date.getDate() + 1);
  }
  return week;
}
