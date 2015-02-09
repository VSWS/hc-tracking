/**
 * Created by tungtouch on 2/9/15.
 */
'use strict'
/**
 * Created by tungtouch on 2/9/15.
 */
var redis = require('redis');
var rClient = redis.createClient();

var message = new Buffer("Some bytes hello world bo bo bo world HEHEHEHE ahhaha hohoho hehe ban kinh dai bakbakabk efefe");
var async = require('async');

var max = 2000000;
var arr = [];

for (var i = 0; i < max; i++) {
    arr.push(i);
}

var q = async.queue(function(index, cb){
    setTimeout(function () {
        rClient.hset("raw", "data"+index, message, redis.print);
    }, 10);
});

q.push(arr);

console.log("Starting Benchmark!");
