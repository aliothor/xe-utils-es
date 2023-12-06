import getWhatYear from './getWhatYear'
import toStringDate from './toStringDate'
import isValidDate from './isValidDate'
import isLeapYear from './isLeapYear'

/**
 * 返回某个年份的天数
 *
 * @param {Date} date 日期或数字
 * @param {number} offset 年(默认当年)、前几个年、后几个年
 * @return {number}
 */
function getDayOfYear(date, year) {
  date = toStringDate(date)
  if (isValidDate(date))
    return isLeapYear(getWhatYear(date, year)) ? 366 : 365

  return Number.NaN
}
export default getDayOfYear
