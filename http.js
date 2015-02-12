/**
 * Created by tungtouch on 2/12/15.
 */
var sys = require('sys'),
    http = require('http');
var i=0;
http.createServer(function(req, res) {
    i++;
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<p>Hello World</p>',i++);
    console.log("Request server:", i++, req)
    res.end();
}).listen(7878);
console.log("Server running: 7878");