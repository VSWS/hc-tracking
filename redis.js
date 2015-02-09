'use strict'
/**
 * Created by tungtouch on 2/9/15.
 */
var redis = require('redis');
var rClient = redis.createClient();

var message = new Buffer("Some bytes hello world bo bo bo world HEHEHEHE ahhaha hohoho hehe ban kinh dai bakbakabk efefe");
var async = require('async');

var max = 20000000;


for (var i = 0; i < max; i++) {
    console.log("Insert Data:", i);
    rClient.hset("raw", "data"+i, message, redis.print);
}


console.log("Starting Benchmark!");
