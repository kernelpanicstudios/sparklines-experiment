/* Node.js Web Server for Development
 *
 * Created by Adam Morris.
 *
 * Free for use and modification under the Creative Commons Attribution 3.0 Unported license.
 * The author asks that you attribute him in your comments.
 * http://creativecommons.org/licenses/by/3.0/
 */

var port = 8000;
var rootPath = './site';

var connect = require('connect');

connect.createServer(
	connect.static(rootPath)
).listen(port);
