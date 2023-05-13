export const ONE_DAY_IN_MILISECONDS = 1000 * 60 * 60 * 24;
export function getAllDatesByHoursInDay(date: Date) {
  let dates = []
  for (let i = 0; i < 24; i++) {
    let current = new Date(date.getFullYear(), date.getMonth(), date.getDate(), i)
    dates.push(current)
  }
  return dates;
}

export function getTheLastDayOfWeek(currentDate: Date) {
  let curr = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  let ret = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6)).toISOString().substring(0, 19);
  return ret;
}

export function getFirstDayOfWeek(currentDate: Date) {
  let curr = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  let ret = new Date(curr.setDate(curr.getDate() - curr.getDay())).toISOString().substring(0, 19);
  return ret;
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
