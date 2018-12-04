/* eslint-disable no-console */
/**
 * help output
 *
 * @return {String}  help description
 */
const chalk = require("chalk");
function help(){
	console.log(chalk.blueBright(`
fuzhi: 0.08
Usage: https://github.com/leinov/fuzhi

options:
[from] [to]       copy [from] file or directory to [to]

example:
fuzhi a.js b.js   copy a.js to b.js
fuzhi dirA dirB   copy directory dirA to dirB

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