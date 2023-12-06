import toValueString from './toValueString'

/**
 * 去除字符串左边的空格
 *
 * @param {string} str 字符串
 * @return {string}
 */
function trimLeft(str) {
  return str && str.trimLeft ? str.trimLeft() : toValueString(str).replace(/^[\s\uFEFF\xA0]+/g, '')
}
export default trimLeft
