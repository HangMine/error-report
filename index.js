const express = require("express");
const app = express();
const extend = require("./extend");
extend();
const router = require("./router");
router(app);
const colors = require("colors");
const cloneProjects = require('./utils/clone-projects');

const main = async () => {
  // await cloneProjects();
  const server = app.listen(8888, "localhost", async () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`本机后台服务已开启:http://${host}:${port}`.green);
  });
}

main()
