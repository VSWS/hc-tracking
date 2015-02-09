'use strict'
/**
 * Created by tungtouch on 2/9/15.
 */
var redis = require('redis');
var rClient = redis.createClient();

var message = new Buffer("Some bytes hello world bo bo bo world HEHEHEHE ahhaha hohoho hehe ban kinh dai bakbakabk efefe");
var async = require('async');

var max = 200000;
var arr = [];

for (var i = 0; i < max; i++) {
    arr.push(i);
}
console.log("Array:", arr);
var q = async.queue(function(index, cb){
    setTimeout(function () {
        rClient.hset("raw", "data"+index, message, redis.print);
        console.log("Data", index);
    }, 10);
});

q.push(arr);

console.log("Starting Benchmark!");
