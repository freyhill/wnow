#!/usr/bin/env node

/* eslint-disable no-console */
/* eslint-disable no-undef */

var fs = require("fs-extra");
const path = require("path");
const MarkdownIt = require("markdown-it");
const tip = require("./console");
const chalk = require("chalk");
var Git = require("nodegit");
const argv = process.argv;


/**
 * 获取md文件生成html并打包到blog文件夹下
 *
 * @param {*} mdpath
 */

async function mdtohtml(mdpath,dist) {
	try {
		await isExist(path.resolve(mdpath,`../${dist}`));
	} catch (err) {
		fs.mkdirSync(path.resolve(mdpath,`../${dist}`));
	}
	const arr = [];
	getFilePath(mdpath).map((item,index) => {
		const filepath = path.resolve(mdpath, item);
		
		if (path.extname(filepath) == ".md") {
			fs.readFile(filepath, "utf-8", function (err, data) {
				if (err) {
					console.log("error");
				} else {
					const filename = item.split(".")[0];
					let md = new MarkdownIt(),
						html = md.render(data);
					const formathtml = formatHtml({
						title: filename,
						body: html
					});
					fs.writeFile(path.resolve(dist, `${filename}.html`), formathtml, () => {
						console.log(chalk.magenta(path.resolve(dist, `${filename}.html`)));
						arr.push({
							title:filename,
							url:`${dist}/${filename}.html`
						});
						indexPage(arr);
					});
				}
			});
		}
	});

}

/**
 * 遍历文件
 *
 * @param {*} path
 * @returns
 */
function getFilePath(path){
	let arr = [];
	let existpath = fs.existsSync(path); //是否存在目录
	if(existpath){
		let readdirSync = fs.readdirSync(path);  //获取目录下所有文件
		readdirSync.map((item)=>{
			arr.push(item);
		});
		return arr;
	}
}

/**
 * 格式化输出html模板
 *
 * @param {*} [{title="leinov blog",body="",giturl=""}={}]
 * @returns
 */
function formatHtml({
	title = "leinov blog",
	body = "",
	giturl = ""
} = {}) {
	headerstyle = "background-color: #92FFC0;background-image: linear-gradient(120deg, #92FFC0 , #002661);";
	const tpl = `
				<!DOCTYPE html>
				<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<meta http-equiv="X-UA-Compatible" content="ie=edge">
					<title>${title}</title>
					<link rel="stylesheet" href="../markdown.css">
				</head>
				<body>
				<section class="page-header" style='${headerstyle}'>
				<h1 class="project-name">${title}</h1>
				<h2 class="project-tagline">${title}</h2>
					<a href="${giturl}" class="btn">View on GitHub</a>
				</section>
				<div class='markdown-body' >${body}</div>
				</body>
				</html>
			`;
	return tpl;
}

/**
 * 生成首页面
 *
 * @param {*} arr
 */
function indexPage(arr){
	let list = "";
	arr.map((item)=>{
		list += `<div class="list-item"><a href="${item.url}">${item.title}</a></div>`;
	});
	
	headerstyle = "background-color: #F05F57;background-image: linear-gradient(120deg, #F05F57 , #360940);";
	const index = `
				<!DOCTYPE html>
				<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<meta http-equiv="X-UA-Compatible" content="ie=edge">
					<title></title>
					<link rel="stylesheet" href="../markdown.css">
				</head>
				<body>
				
				<div class="index-banner" style="${headerstyle}"></div>
				<div class='index-body'>${list}</div>
				</body>
				</html>
			`;
	fs.writeFile("index.html",index,()=>{
						
	});
}

/**
 * 检查文件夹是否存在
 *
 * @param {*} path
 * @returns
 */
function isExist(path) {
	return new Promise((resolve, reject) => {
		fs.access(path, (err) => {
			if (err !== null) {
				reject(`${path} does not exist`);
			} else {
				resolve(true);
			}
		});
	});
}

// 初始化项目
function init(dist){
	Git.Clone("https://github.com/leinov/lemb", dist).then(()=>{
		fs.removeSync(path.resolve(dist,"bin")); 
	});
}

// 启动项目
function start(){
	if(argv[2] == "start"){
		require("../www.js");
	}
}
// 帮助

// 主调函数
function main(){
	if(!argv[2]){
		tip.help();
	}
	if(argv[2] == "init"){
		if(!argv[3]){
			console.log(tip.error("请输入要创建的名称"));
		}else{
			init(argv[3]);
		}
	}
	if(argv[2] == "start"){
		start();
	}
	if(argv[2] == "build"){
		if(!argv[3]){
			mdtohtml("markdown","blog");
		}else{
			mdtohtml(path.resolve(__dirname,"../markdown"),argv[3]);
		}
		
	}
	if(argv[2] == "--help"){
		tip.help();
	}
}

main();