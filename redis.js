'use strict'
/**
 * Created by tungtouch on 2/9/15.
 */

var http = require("http"), server, i;
var message = new Buffer("Some bytes hello world bo bo bo world HEHEHEHE " +
                        "ahhaha hohoho hehe ban kinh dai bakbakabk " +
                        "oh yeahh oh yeahh oekeke efefe");
var redis_client = require("redis").createClient();
var r = 0;
server = http.createServer(function (request, response) {
    r++;
    response.writeHead(200, {
        "Content-Type": "text/plain"
    });
    console.log("Insert data", r);
    for(i=0; i<100000; i++){
        redis_client.hset("raw", "data"+'-'+r+'-'+i, message, redis_client.print);
    }
}).listen(6666);

server.on('error', function(err){
    console.log(err);
    process.exit(1);
});