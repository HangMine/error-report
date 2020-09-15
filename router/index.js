/*
 * @Author: Hang
 * @Date: 2020-07-13 13:12:50
 * @LastEditors: Hang
 * @LastEditTime: 2020-07-23 14:16:42
 * @FilePath: /ln-project/Users/zhengmukang/Desktop/hf-ui/node/router/index.js
 * @Description: hf-ui的演示服务
 */
var compression = require('compression');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routes = require('./routes');
const { getCatchMsg } = require('../common');

const router = app => {
  //解决跨域
  app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.get('origin')); //由于带上了cookies验证，所以这里不能用'*'
    res.header('Access-Control-Allow-Credentials', 'true'); //需要带上cookies验证，需要增加验证许可
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });

  // gzip压缩
  app.use(compression());

  // 前端history模式：这句代码需要在express.static上面
  // app.use(history());
  // 静态文件处理
  app.use('/', express.static('assets'));
  // JSON处理
  app.use(bodyParser.json({ limit: '50mb' }));
  // 处理默认常见的内容格式
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  // 接口路由
  for (const [path, options] of Object.entries(routes)) {
    // options可能是对象或者直接是函数
    const fn = options.fn || options;
    // 兼容没有中间件的情况
    const middle =
      options.middle ||
      ((req, res, next) => {
        next();
      });
    app.all(path, middle, (req, res) => {
      const result = fn(req, res);
      const isPromise = result && result.then;
      if (isPromise) {
        result.catch(err => {
          // 在这里捕获所有未捕获的异常
          res.send({
            msg: getCatchMsg(err),
            ...err
          });
        });
      }
    });
  }
};

module.exports = router;
