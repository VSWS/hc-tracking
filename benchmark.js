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
var numCluster = 100;
var arr = [];

for (var i = 0; i < max; i++) {
    client.send(message, 0, message.length, 4444, "128.199.126.250", function (err) {
        console.log("Request : ", a++);
        if(err){
            console.log('ERROR :', err);
        }
        //cb(err);
    });
}
var a = 0;

//[2GB]128.199.126.250 [8GB]128.199.109.202

var q = async.queue(function(index, cb){
    console.log("Index: ", index);
    setTimeout(function () {

    }, 1);
});


/*

if (cluster.isMaster) {
    // Fork workers.
    for (var m = 0; m < numCPUs; m++) {
        console.log("Starting Benchmark!", m);
        cluster.fork();
    }

    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });
} else {
    var clusterId = cluster.worker.id;
    console.log("Cluster Id", clusterId);
    q.push(arr);
    // Workers can share any TCP connection
    // In this case its a HTTP server

}
*/


