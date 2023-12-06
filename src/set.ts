import staticParseInt from './staticParseInt'
import helperGetHGSKeys from './helperGetHGSKeys'
import hasOwnProp from './hasOwnProp'

const sKeyRE = /(.+)?\[(\d+)\]$/
function setDeepProps(obj, key, isEnd, nextKey, value) {
  if (obj[key]) {
    if (isEnd)
      obj[key] = value
  }
  else {
    let index
    let rest
    const currMatchs = key ? key.match(sKeyRE) : null
    if (isEnd) {
      rest = value
    }
    else {
      const nextMatchs = nextKey ? nextKey.match(sKeyRE) : null
      if (nextMatchs && !nextMatchs[1]) {
        // 如果下一个属性为数组类型
        rest = new Array(staticParseInt(nextMatchs[2]) + 1)
      }
      else {
        rest = {}
      }
    }
    if (currMatchs) {
      if (currMatchs[1]) {
        // 如果为对象中数组
        index = staticParseInt(currMatchs[2])
        if (obj[currMatchs[1]]) {
          if (isEnd) {
            obj[currMatchs[1]][index] = rest
          }
          else {
            if (obj[currMatchs[1]][index])
              rest = obj[currMatchs[1]][index]

            else
              obj[currMatchs[1]][index] = rest
          }
        }
        else {
          obj[currMatchs[1]] = new Array(index + 1)
          obj[currMatchs[1]][index] = rest
        }
      }
      else {
        // 如果为数组
        obj[currMatchs[2]] = rest
      }
    }
    else {
      // 如果为对象
      obj[key] = rest
    }
    return rest
  }
  return obj[key]
}
/**
 * 设置对象属性上的值。如果属性不存在则创建它
 * @param {Object/Array} obj 对象
 * @param {String/Function} property 键、路径
 * @param {object} value 值
 */
function set(obj, property, value) {
  if (obj) {
    if ((obj[property] || hasOwnProp(obj, property)) && !isPrototypePolluted(property)) {
      obj[property] = value
    }
    else {
      let rest = obj
      const props = helperGetHGSKeys(property)
      const len = props.length
      for (let index = 0; index < len; index++) {
        if (isPrototypePolluted(props[index]))
          continue

        const isEnd = index === len - 1
        rest = setDeepProps(rest, props[index], isEnd, isEnd ? null : props[index + 1], value)
      }
    }
  }
  return obj
}
/**
 * Blacklist certain keys to prevent Prototype Pollution
 * @param {string} key
 */
function isPrototypePolluted(key) {
  return key === '__proto__' || key === 'constructor' || key === 'prototype'
}
export default set
