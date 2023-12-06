import isArray from './isArray'
import isPlainObject from './isPlainObject'
import each from './each'

function handleMerge(target, source) {
  if ((isPlainObject(target) && isPlainObject(source)) || (isArray(target) && isArray(source))) {
    each(source, (obj, key) => {
      target[key] = handleMerge(target[key], obj)
    })
    return target
  }
  return source
}
/**
 * 将一个或多个源对象合并到目标对象中
 *
 * @param {object} target 目标对象
 * @param {...object}
 * @return {boolean}
 */
const merge = function (target) {
  if (!target)
    target = {}

  const args = arguments
  const len = args.length
  for (var source, index = 1; index < len; index++) {
    source = args[index]
    if (source)
      handleMerge(target, source)
  }
  return target
}
export default merge
