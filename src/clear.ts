import helperDeleteProperty from './helperDeleteProperty'
import isPlainObject from './isPlainObject'
import isObject from './isObject'
import isArray from './isArray'
import isNull from './isNull'
import assign from './assign'
import objectEach from './objectEach'

/**
 * 清空对象
 *
 * @param {object} obj 对象
 * @param {*} defs 默认值,如果不传（清空所有属性）、如果传对象（清空并继承)、如果传值(给所有赋值)
 * @param {Object/Array} assigns 默认值
 * @return {object}
 */
function clear(obj, defs?, assigns?) {
  if (obj) {
    let len
    const isDefs = arguments.length > 1 && (isNull(defs) || !isObject(defs))
    const extds = isDefs ? assigns : defs
    if (isPlainObject(obj)) {
      objectEach(obj, isDefs
        ? (val, key) => {
            obj[key] = defs
          }
        : (val, key) => {
            helperDeleteProperty(obj, key)
          })
      if (extds)
        assign(obj, extds)
    }
    else if (isArray(obj)) {
      if (isDefs) {
        len = obj.length
        while (len > 0) {
          len--
          obj[len] = defs
        }
      }
      else {
        obj.length = 0
      }
      if (extds)
        obj.push.apply(obj, extds)
    }
  }
  return obj
}
export default clear
