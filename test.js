const { spawnSync } = require('child_process');
const params = [{
  componentTree: "? > Error-test",
  env: "development",
  level: 0,
  message: "a is not defined",
  name: "ReferenceError",
  position: "vue: mounted hook",
  stack: "ReferenceError: a is not defined\n    at http://dev.4dshoetech.local/js/chunk-68071a8a.e6d22a74.js:1:624\n  at http://dev.4dshoetech.local/js/chunk-68071a8a.e6d22a74.js:1:624\n    at u (http://dev.4dshoetech.local/js/chunk-vendors.18666ed0.js:54:4662)\n    at Generator._invoke (http://dev.4dshoetech.local/js/chunk-vendors.18666ed0.js:54:5988)\n    at Generator.next (http://dev.4dshoetech.local/js/chunk-vendors.18666ed0.js:54:5087)\n    at i (http://dev.4dshoetech.local/js/chunk-vendors.18666ed0.js:11:15186)\n    at s (http://dev.4dshoetech.local/js/chunk-vendors.18666ed0.js:11:15389)",
  userAgent: "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36",
  project: 'demon-home',
  file: '',
  versionHash: ''
}]


const { stdout, stderr } = spawnSync('node', ['getStackSource', JSON.stringify(params), '/Users/Administrator/Desktop/error-report/'], { encoding: 'utf-8' })

console.log('---------stdout---------');
console.log(stdout)
console.log('---------stderr---------');
console.log(stderr)


