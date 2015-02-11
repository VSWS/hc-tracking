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

var max = 3000;
var numCluster = 30;
var arr = [];

for (var i = 0; i < max; i++) {
    arr.push(i);
}
var a = 0;
console.log("Num CPU:", numCPUs);
//128.199.126.250 128.199.109.202 [4GB] 128.199.154.201

var q = async.queue(function(index, cb){
    setTimeout(function () {
        client.send(message, 0, message.length, 4444, "128.199.154.201", function (err) {
            console.log("Request : ", a++);
            if(err){
                console.log('ERROR :', err);
            }
            cb(err);
        });
    }, 10);
});



if (cluster.isMaster) {
    // Fork workers.
    for (var i = 0; i < numCluster; i++) {
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
