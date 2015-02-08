'use strict'
/**
 * Created by tungtouch on 2/9/15.
 */
var dgram = require('dgram');
var message = new Buffer("Some bytes:");
var client = dgram.createSocket("udp4");
var async = require('async');

var max = 10000;
var arr = [];

for (var i = 0; i < max; i++) {
    arr.push(i);
}


var q = async.queue(function(index, cb){
    setTimeout(function () {
        client.send(message, 0, message.length, 4444, "128.199.126.250", function (err) {
            console.log("Request : ", index);
            cb(err);
        });
    }, 20);
});

q.push(arr);

console.log("Starting Benchmark!");
