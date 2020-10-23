const { spawnSync } = require('child_process');
const hasNodeModuelsParams = [{ "versionHash": "6e954bfc4d0f2b1c79235aa3308396c0e370bfbb", "env": "development", "userAgent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36", "componentTree": "? > Error-test", "file": "", "message": "a is not defined", "stack": "TypeError: Cannot read property 'type' of undefined\n    at D4.value (http://sit.4dshoetech.local/js/chunk-4e940f79.5e2563c4.js:1:1733928)\n    at a (http://sit.4dshoetech.local/js/chunk-4e940f79.5e2563c4.js:1:1736121)\n    at http://sit.4dshoetech.local/js/chunk-4e940f79.5e2563c4.js:1:1736777\n    at new Promise (<anonymous>)\n    at D4.value (http://sit.4dshoetech.local/js/chunk-4e940f79.5e2563c4.js:1:1735947)\n    at http://sit.4dshoetech.local/js/chunk-233fdb76.c5ed749d.js:8:125068\n    at u (http://sit.4dshoetech.local/js/chunk-4e940f79.5e2563c4.js:1:1460012)\n    at Generator._invoke (http://sit.4dshoetech.local/js/chunk-4e940f79.5e2563c4.js:1:1459800)\n    at Generator.forEach.e.<computed> [as next] (http://sit.4dshoetech.local/js/chunk-4e940f79.5e2563c4.js:1:1460435)\n    at i (http://sit.4dshoetech.local/js/chunk-vendors.d5c5f378.js:11:15186)", "position": "vue: mounted hook (Promise/async)", "name": "ReferenceError", "level": 0, "project": "art", "ref": "hang/1.19.0" }]

const { stdout, stderr } = spawnSync('node', ['get-stack-source', JSON.stringify(hasNodeModuelsParams), '/Users/Administrator/Desktop/error-report'], { encoding: 'utf-8' })

console.log('---------stdout---------');
console.log(stdout)
console.log('---------stderr---------');
console.log(stderr)


