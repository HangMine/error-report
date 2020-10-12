const { spawnSync } = require('child_process');
const params = [{
  componentTree: "? > Error-test",
  env: "development",
  level: 0,
  message: "a is not defined",
  name: "ReferenceError",
  position: "vue: mounted hook",
  stack: "ReferenceError: a is not defined\nat a.mounted (http://dev.4dshoetech.local/js/chunk-191fcb38.240da3ad.js:1:474)\nat nt (http://dev.4dshoetech.local/js/chunk-vendors.18666ed0.js:17:11677)\nat Rn (http://dev.4dshoetech.local/js/chunk-vendors.18666ed0.js:17:29145)\nat Object.insert (http://dev.4dshoetech.local/js/chunk-vendors.18666ed0.js:17:20796)\nat T (http://dev.4dshoetech.local/js/chunk-vendors.18666ed0.js:17:47562)\nat a.__patch__ (http://dev.4dshoetech.local/js/chunk-vendors.18666ed0.js:17:48878)\nat a.e._update (http://dev.4dshoetech.local/js/chunk-vendors.18666ed0.js:17:26991)\nat a.i (http://dev.4dshoetech.local/js/chunk-vendors.18666ed0.js:17:27814)\nat ni.get (http://dev.4dshoetech.local/js/chunk-vendors.18666ed0.js:17:30684)\nat ni.run (http://dev.4dshoetech.local/js/chunk-vendors.18666ed0.js:17:31417)",
  userAgent: "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36",
  project: 'demon-home',
  file: '',
  versionHash: ''
}, {
  componentTree: "? > Error-test",
  env: "development",
  level: 0,
  message: "b is not defined",
  name: "ReferenceError",
  position: "vue: mounted hook",
  stack: "ReferenceError: b is not defined\nat a.mounted (http://dev.4dshoetech.local/js/chunk-191fcb38.240da3ad.js:1:474)\nat nt (http://dev.4dshoetech.local/js/chunk-vendors.18666ed0.js:17:11677)\nat Rn (http://dev.4dshoetech.local/js/chunk-vendors.18666ed0.js:17:29145)\nat Object.insert (http://dev.4dshoetech.local/js/chunk-vendors.18666ed0.js:17:20796)\nat T (http://dev.4dshoetech.local/js/chunk-vendors.18666ed0.js:17:47562)\nat a.__patch__ (http://dev.4dshoetech.local/js/chunk-vendors.18666ed0.js:17:48878)\nat a.e._update (http://dev.4dshoetech.local/js/chunk-vendors.18666ed0.js:17:26991)\nat a.i (http://dev.4dshoetech.local/js/chunk-vendors.18666ed0.js:17:27814)\nat ni.get (http://dev.4dshoetech.local/js/chunk-vendors.18666ed0.js:17:30684)\nat ni.run (http://dev.4dshoetech.local/js/chunk-vendors.18666ed0.js:17:31417)",
  userAgent: "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36",
  project: 'demon-home',
  file: '',
  versionHash: ''
}]



const tt = `
[{"componentTree":"? > Error-test","env":"development","file":"file","level":0,"message":"a is not defined","name":"ReferenceError","position":"vue: mounted hook","stack":"ReferenceError: a is not defined\\n","userAgent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36","versionHash":"hash","project":"demon-home"}]
`

const { stdout, stderr } = spawnSync('node', ['getStackSource', JSON.stringify(params), '/Users/Administrator/Desktop/error-report/'], { encoding: 'utf-8' })

console.log('---------stdout---------');
console.log(stdout)
console.log('---------stderr---------');
console.log(stderr)


