// 创建一个 express 服务器
const express = require("express");
const next = require("next");
const { parse } = require("url");
const server = express();

const app = next({ dev: false });
const handle = app.getRequestHandler();

const port = 4000;

app.prepare().then(() => {
  // setAssetPrefix not work bug
  app.setAssetPrefix("https://google.com");

  server.get("/", (req, res) => {
    app.render(req, res, "/");
  });

  server.get("*", (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  server.listen(port, function () {
    console.log(`Server is listening http://localhost:${port}`);
  });
});
