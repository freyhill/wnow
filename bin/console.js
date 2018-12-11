/* eslint-disable no-console */
/**
 * help output
 *
 * @return {String}  help description
 */
const chalk = require("chalk");
function help(){
	console.log(chalk.blueBright(`
wnow: 1.0.0
Usage: https://github.com/leinov/wnow
options:
[init] [name]       create a new blog template
[new] [1.md]        create a new markdown file
[build]				markdown to html
[start]				open blog in browser
[--help]			options help
[-v]                view the version of wnow

example:
wnow init leinov.github.io   create a leinov.github.io project
		`));
}

/**
 * error output
 *
 * @param  {String} path
 * @return {String}
 */
function error(msg){
	console.log(
		chalk.red(`


❗❗❗ : ${msg}

${chalk.green("Use wnow --help to display the cli options.")}
  `));
}

/**
 * success output
 *
 * @param  {String} path
 * @return {String}
 */
function success(from,to){
	return chalk.green(`
******************************************
*
* 💯
*
* ok: ${from} copy to ${to} success
*
******************************************
  `);
}


/**
 * 普通提示
 *
 * @param {*} text
 */
function msg(text){
	console.log(chalk.magenta(text));
}

module.exports = {
	help:help,
	success:success,
	error:error,
	msg:msg
};