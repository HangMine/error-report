const { spawnSync } = require('child_process');
// const hasNodeModuelsParams = [{ "versionHash": "6e954bfc4d0f2b1c79235aa3308396c0e370bfbb", "env": "development", "userAgent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36", "componentTree": "? > Error-test", "file": "", "message": "a is not defined", "stack": "TypeError: Cannot read property 'type' of undefined\n    at D4.value (http://sit.4dshoetech.local/js/chunk-4e940f79.5e2563c4.js:1:1733928)\n    at a (http://sit.4dshoetech.local/js/chunk-4e940f79.5e2563c4.js:1:1736121)\n    at http://sit.4dshoetech.local/js/chunk-4e940f79.5e2563c4.js:1:1736777\n    at new Promise (<anonymous>)\n    at D4.value (http://sit.4dshoetech.local/js/chunk-4e940f79.5e2563c4.js:1:1735947)\n    at http://sit.4dshoetech.local/js/chunk-233fdb76.c5ed749d.js:8:125068\n    at u (http://sit.4dshoetech.local/js/chunk-4e940f79.5e2563c4.js:1:1460012)\n    at Generator._invoke (http://sit.4dshoetech.local/js/chunk-4e940f79.5e2563c4.js:1:1459800)\n    at Generator.forEach.e.<computed> [as next] (http://sit.4dshoetech.local/js/chunk-4e940f79.5e2563c4.js:1:1460435)\n    at i (http://sit.4dshoetech.local/js/chunk-vendors.d5c5f378.js:11:15186)", "position": "vue: mounted hook (Promise/async)", "name": "ReferenceError", "level": 0, "project": "art", "ref": "hang/1.19.0" }]

const params = [{
  "stack": "ReferenceError: b is not defined\n    at a.c (https://bucket.cn-frontend-shenzhen-cdn.4dshoetech.com/uat/js/chunk-481818f6.4fa3934b.js:1:618)\n    at nt (https://bucket.cn-frontend-shenzhen-cdn.4dshoetech.com/uat/js/chunk-vendors.f814df9d.js:24:11664)\n    at a.n (https://bucket.cn-frontend-shenzhen-cdn.4dshoetech.com/uat/js/chunk-vendors.f814df9d.js:24:13484)\n    at nt (https://bucket.cn-frontend-shenzhen-cdn.4dshoetech.com/uat/js/chunk-vendors.f814df9d.js:24:11664)\n    at a.On.e.$emit (https://bucket.cn-frontend-shenzhen-cdn.4dshoetech.com/uat/js/chunk-vendors.f814df9d.js:24:26491)\n    at a.handleClick (https://bucket.cn-frontend-shenzhen-cdn.4dshoetech.com/uat/js/chunk-vendors.f814df9d.js:30:244402)\n    at nt (https://bucket.cn-frontend-shenzhen-cdn.4dshoetech.com/uat/js/chunk-vendors.f814df9d.js:24:11664)\n    at HTMLButtonElement.n (https://bucket.cn-frontend-shenzhen-cdn.4dshoetech.com/uat/js/chunk-vendors.f814df9d.js:24:13484)\n    at HTMLButtonElement.Ji.o._wrapper (https://bucket.cn-frontend-shenzhen-cdn.4dshoetech.com/uat/js/chunk-vendors.f814df9d.js:24:51758)",
  "level": 0,
  "sourceStack": "    at a.c (src/views/test/error.vue:25:38)\n    at nt (node_modules/vue/dist/vue.runtime.esm.js:1854:25)\n    at a.n (node_modules/vue/dist/vue.runtime.esm.js:2179:13)\n    at nt (node_modules/vue/dist/vue.runtime.esm.js:1854:25)\n    at a.On.e.$emit (node_modules/vue/dist/vue.runtime.esm.js:3888:8)\n    at a.handleClick (node_modules/element-ui/lib/element-ui.common.js:9417:11)\n    at nt (node_modules/vue/dist/vue.runtime.esm.js:1854:25)\n    at HTMLButtonElement.n (node_modules/vue/dist/vue.runtime.esm.js:2179:13)\n    at HTMLButtonElement.Ji.o._wrapper (node_modules/vue/dist/vue.runtime.esm.js:6917:24)",
  "project": "art",
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.104 Safari/537.36",
  "versionHash": "bd76940674912c563bb371de4c2210d3ee4b2953",
  "env": "uat",
  "message": "b is not defined",
  "componentTree": "? > Error-test > el-button",
  "ref": "origin/uat",
  "file": "packages/button/src/button.vue",
  "name": "ReferenceError",
  "position": "vue: v-on handler"
}]
const { stdout, stderr } = spawnSync('node', ['get-stack-source', JSON.stringify(params), '/Users/Administrator/Desktop/error-report'], { encoding: 'utf-8' })

console.log('---------stdout---------');
console.log(stdout)
console.log('---------stderr---------');
console.log(stderr)


