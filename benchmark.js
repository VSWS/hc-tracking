'use strict'
/**
 * Created by tungtouch on 2/9/15.
 */

var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

var dgram = require('dgram');
var message = new Buffer("Some bytes hello world bo bo bo world HEHEHEHE ahhaha hohoho hehe:");
var client = dgram.createSocket("udp4");
var async = require('async');

var max = 1000;
var arr = [];

for (var i = 0; i < max; i++) {
    arr.push(i);
}

console.log("Num CPU:", numCPUs);

var q = async.queue(function(index, cb){
    setTimeout(function () {
        client.send(message, 0, message.length, 4444, "128.199.126.250", function (err) {
            console.log("Request : ", index);
            if(err){
                console.log('ERROR :', err);
            }
            cb(err);
        });
    }, 100);
});



if (cluster.isMaster) {
    // Fork workers.
    for (var i = 0; i < 40; i++) {
        cluster.fork();
    }

    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });
} else {
    // Workers can share any TCP connection
    // In this case its a HTTP server
    q.push(arr);
}
console.log("Starting Benchmark!");
