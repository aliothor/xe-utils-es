function lastArrayEach(obj, iterate, context?) {
  for (let len = obj.length - 1; len >= 0; len--)
    iterate.call(context, obj[len], len, obj)
}
export default lastArrayEach
