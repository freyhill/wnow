#!/usr/bin/env node

/* eslint-disable no-console */
/* eslint-disable no-undef */

const fs = require("fs-extra");
const path = require("path");
const MarkdownIt = require("markdown-it");
const tip = require("./console");
const bgcolor= require("./bgcolor");
const chalk = require("chalk");
const Git = require("nodegit");
const argv = process.argv;
const cwd = process.cwd(); //执行文件的目录
let packageJson ={};

try{
	packageJson = require(path.resolve(process.cwd(),"package.json"));
}catch(err){
	if(argv[2]=="build"){
		tip.error("Execute 'build' in the root directory of your project");
		return;
	}
}
/**
 * 获取md文件生成html并打包到blog文件夹下
 *
 * @param {*} mdpath
 */
async function mdtohtml(mdpath,dist) {
	try {
		await isExist(dist);
	} catch (err) {
		fs.mkdirSync(dist);
	}
	const arr = [];
	getFilePath(mdpath).map((item) => {
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
					const filePath = dist.split("/").pop();
					fs.writeFile(`${filePath}/${filename}.html`, formathtml, () => {
						console.log("🚀 ",chalk.magenta( `${dist}/${filename}.html`));
						arr.push({
							title:filename,
							url:`${filePath}/${filename}.html`
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
} = {}) {
	const colorItem = Math.floor(Math.random()*10);
	const headerstyle =`background-color:${bgcolor.color[colorItem].from};background-image: linear-gradient(120deg, ${bgcolor.color[colorItem].from} , ${bgcolor.color[colorItem].to});`;
	const tpl = `
				<!DOCTYPE html>
				<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<meta http-equiv="X-UA-Compatible" content="ie=edge">
					<title>${title}</title>
					<link rel="stylesheet" href="../theme.css">
				</head>
				<body>
				<section class="page-header" style='${headerstyle}'>
				<h1 class="project-name">${title}</h1>
					<a href="${packageJson.homepage?packageJson.homepage:""}" class="btn">View on GitHub</a>
				</section>
				<div class='markdown-body' >${body}</div>
				<div style="text-align:center; padding:10px 0;">powered by <a style="color:#F05F57" href="https://github.com/leinov/wnow">@wnow!</a></div>
				</body>
				</html>
			`;
	return tpl;
}

/**
 * 【生成首页面】
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
						<title>${packageJson.author?packageJson.author:"blog"}</title>
						<link rel="stylesheet" href="theme.css">
					</head>
					<body>
						<div class="index-banner" style="${headerstyle}">
							<div class="page-header">
								<image src="${packageJson.avatar}" />
								<h2>${packageJson.author?packageJson.author:""}</h2>
								<a href="${packageJson.homepage?packageJson.homepage:""}" class="btn">${packageJson.author?packageJson.author:""} GitHub</a>
							</div>
						</div>
						<div class='index-body'>${list}</div>
					</body>
				</html>
			`;
	fs.writeFile("index.html",index,()=>{
						
	});
}

/**
 * 【检查文件夹是否存在】
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

// 【初始化项目】
function init(dist){
	console.log(chalk.green(`creating ${dist}......`));
	Git.Clone("https://github.com/leinov/wnow", dist).then(()=>{
		fs.removeSync(path.resolve(dist,"bin")); 
		fs.removeSync(path.resolve(dist,".git")); 
		fs.removeSync(path.resolve(dist,"LICENSE")); 
		fs.removeSync(path.resolve(dist,".gitignore"));
		console.log(chalk.blueBright(`${dist} created success !`));
	});
}



/**
 * 【创建新的markdown文件】
 * 
 * 1.在markdown文件夹下面new，
 * 2.在markdown同一级new
 * 3.非1&2 报错
 * 
 * @param {String} text 创建的文件名
 */
async function newMd(newmd){

	const dir = cwd.split("/").pop();

	// 1.在markdown文件夹下面new
	if(dir == "markdown"){
		try{ // 1-1 文件存在 提示错误
			await isExist(path.resolve(cwd,`${newmd}.md`));
		}catch(err){ //1-2 不存在 创建
			fs.writeFile(path.resolve(cwd,`${newmd}.md`),"",()=>{
				tip.msg(`${newmd}.md created successfully ！`);			
			});
		}
	}else{ 
		try{ // 2. 在markdown同一级new
			await isExist("markdown");
			try{ //2-1. 如果存在同名则提示
				await isExist(path.resolve(cwd,"markdown",`${newmd}.md`));
				tip.error(`${newmd}.md exists`);
			}catch(err){ // 2-2 不存在则创建
				fs.writeFile(path.resolve(cwd,"markdown",`${newmd}.md`),"",()=>{
					tip.msg(`✔ ${newmd}.md created successfully ！`);			
				});
			}
		}catch(err){ //3.既不是在markdown同级new也不是在markdown下面new
			tip.error("pleace create a new markdown in the root of project or in ‘mardown’ directory");
		}
	}
}
 
/**
 * 【markdown编译为html】
 * 
 * 1.判断是不是在根目录下执行
 * 2.如果不是在根目录下则看是不是在上一层。
 *
 */
async function build(){
	try{
		await isExist(path.resolve(cwd,"markdown"));
		if(!argv[3]){
			mdtohtml(path.resolve(cwd,"markdown"),path.resolve(cwd,"blog"));
		}else{
			mdtohtml(path.resolve(cwd,"markdown"),path.resolve(cwd,argv[3]));
		}
	}catch(err){
		try{
			await isExist(path.resolve(cwd,"../","markdown"));
			if(!argv[3]){
				mdtohtml(path.resolve(cwd,"../","markdown"),path.resolve(cwd,"blog"));
			}else{
				mdtohtml(path.resolve(cwd,"../","markdown"),path.resolve(cwd,"../",argv[3]));
			}
		}catch(err){
			console.log(err);
		}
	}	
}

/**
 * 编译执行
 *
 */
function buildBlog(path,dist){
	console.log();
	
}
// 启动项目
function start(){
	if(argv[2] == "start"){
		require("../www.js");
	}
}

// 获取版本
function version(){
	const package_json = require(path.resolve(__dirname,"../","package.json"));
	tip.msg(`
${package_json.name}: ${package_json.version}
	`);
}

// 主调函数
async function main(){


	switch (argv[2]) {
	case "init":   // 初始化创建博客;
		if(!argv[3]){
			console.log(tip.error("请输入要创建的名称"));
		}else{
			init(argv[3]);
		}
		break;
	case "new":    // 创建新markdown页面
		if(!argv[3]){
			console.log(tip.error("please input the markdown file name "));
		}else{
			newMd(argv[3]);
		}
		break;
	case "start":  // 启动查看页面
		start();
		break;
	case "build":  // markdown编译为html
		build();
		break;
	case "--help": // 帮助
		tip.help();
		break;
	case "-v":     // 版本查看
		version();
		break;
	default:       // 没有参数
		tip.help();
		break;
	}
	return;
}

main();