/**
 * Created by csimek001c on 3/19/18.
 */

var express = require('express');

var proxy = require('express-http-proxy');

var opn = require('opn');

var app = express();

var port = process.env.PORT || 9000;

var path = require('path');

app.use(express.static(path.join(__dirname, '/')));

/**
 * Set up the rexapi proxy.
 * Any requests made of this node
 * server within the app starting with root rex `/rex`
 * will be proxied through the same domain as the
 * application, but will interface with host
 * `https://rexapi.ccp.xcal.tv:10123`
*/
// app.use('/rex', proxy('http://rexapi.ccp.xcal.tv:10123/'));


// cmd.run( `open -a Google\ Chrome --args 'http://localhost'`);
opn('http://localhost:' + port);

app.listen(port);
console.log("\x1b[32m%s\x1b[0m", 'App is listening on port ' + port);
