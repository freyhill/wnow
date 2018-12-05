/* eslint-disable no-console */
/**
 * help output
 *
 * @return {String}  help description
 */
const chalk = require("chalk");
function help(){
	console.log(chalk.blueBright(`
somb: 1.0.0
Usage: https://github.com/leinov/somb

options:
[init] [name]       create a new blog template
[build]				markdown to html
[start]				open blog in browser
[--help]			options help

example:
somb init leinov.github.io   create a leinov.github.io project

		`));
}

/**
 * error output
 *
 * @param  {String} path
 * @return {String}
 */
function error(msg){
	return chalk.red(`

⛑ ⛑ ⛑

error: ${msg}

Use --help to display the cli options.
  `);
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

module.exports = {
	help:help,
	success:success,
	error:error 
};