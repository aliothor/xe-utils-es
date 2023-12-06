/**
 * 获取一个全局唯一标识
 *
 * @param {string} prefix 前缀
 * @return {number}
 */
let __uniqueId = 0
function uniqueId(prefix) {
  return [prefix, ++__uniqueId].join('')
}
export default uniqueId
