function typeJoin() {
  if (!Array.isArray(this)) {
    throw ('typeJoin函数调用失败:请用数组调用')
  }
  const arr = [];
  for (const item of this) {
    arr.push(typeof item === 'number' ? item : `'${item}'`)
  }
  return arr.join();
}

// 数组原型扩展
const arrayPrototypeMap = {
  typeJoin
}

const extend = () => {
  Object.entries(arrayPrototypeMap).forEach(([key, fn]) => Array.prototype[key] = fn)
}

module.exports = extend;