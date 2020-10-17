const { spawnSync } = require('child_process');
const params = [{ "versionHash": "cfebe8c9be38ad07a7638b0578545f55c3100c1e", "env": "development", "userAgent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36", "componentTree": "? > Error-test", "file": "", "message": "a is not defined", "stack": "ReferenceError: a is not defined\n    at http://dev.4dshoetech.local/js/chunk-577474a8.0a9d5ce5.js:1:639\n    at u (http://dev.4dshoetech.local/js/chunk-vendors.35e84e3b.js:54:4662)\n    at Generator._invoke (http://dev.4dshoetech.local/js/chunk-vendors.35e84e3b.js:54:5988)\n    at Generator.next (http://dev.4dshoetech.local/js/chunk-vendors.35e84e3b.js:54:5087)\n    at i (http://dev.4dshoetech.local/js/chunk-vendors.35e84e3b.js:11:15186)\n    at s (http://dev.4dshoetech.local/js/chunk-vendors.35e84e3b.js:11:15389)\n    at http://dev.4dshoetech.local/js/chunk-vendors.35e84e3b.js:11:15448\n    at new Promise (<anonymous>)\n    at http://dev.4dshoetech.local/js/chunk-vendors.35e84e3b.js:11:15329\n    at a.mounted (http://dev.4dshoetech.local/js/chunk-577474a8.0a9d5ce5.js:1:684)", "position": "vue: mounted hook (Promise/async)", "name": "ReferenceError", "level": 0, "project": "art", "ref": "hang/1.19.0" }]


const { stdout, stderr } = spawnSync('node', ['get-stack-source', JSON.stringify(params), '/Users/Administrator/Desktop/error-report'], { encoding: 'utf-8' })

console.log('---------stdout---------');
console.log(stdout)
console.log('---------stderr---------');
console.log(stderr)


