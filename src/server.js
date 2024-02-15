const express = require("express");
const https = require("https");
const fs = require("fs");

const app = express();
const port = 3000;

const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};

https.createServer(options, app).listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});

// 기존의 HTTP 서버 코드도 두 번째 인자로 전달하여 동시에 HTTP 서버도 실행할 수 있습니다.
// http.createServer(app).listen(3000);
