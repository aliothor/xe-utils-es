import helperCreateIterateHandle from './helperCreateIterateHandle'

/**
 * 对象中的值中的每一项运行给定函数,如果该函数对每一项都返回true,则返回true,否则返回false
 *
 * @param {object} obj 对象/数组
 * @param {Function} iterate(item, index, obj) 回调
 * @param {object} context 上下文
 * @return {boolean}
 */
const every = helperCreateIterateHandle('every', 1, 1, false, true)
export default every
