/* eslint-env node */

/**
 * @file: 线上启动程序
 * @author: leinov
 * @date: 2018-10-30
 */

var express = require("express");
var app = express();
var http = require("http");
var port = "3100";
//在浏览器中打开 下面执行
const opn = require("opn");

//静态页面路径
app.use(express.static("./"));
app.set("port", port);

//启动server
var server = http.createServer(app);
server.listen(port);

server.on("listening", onListening);

function onListening() {
	console.log(`server port ${port} listening and open browser with http://localhost:${port}....` );
	opn(`http://localhost:${port}`,"chrome");
}
