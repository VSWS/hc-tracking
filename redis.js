'use strict'
/**
 * Created by tungtouch on 2/9/15.
 */

var http = require("http"), server;
var message = new Buffer("Some bytes hello world bo bo bo world HEHEHEHE ahhaha hohoho hehe ban kinh dai bakbakabk efefe");
var redis_client = require("redis").createClient();
var r = 0;
server = http.createServer(function (request, response) {
    r++;
    response.writeHead(200, {
        "Content-Type": "text/plain"
    });
    redis_client.hset("raw", "data"+r, message, redis.print);
    redis_client.incr("requests", function (err, reply) {
        response.write(reply+'\n');
        response.end();
    });
}).listen(6666);

server.on('error', function(err){
    console.log(err);
    process.exit(1);
});