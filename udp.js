/**
 * Created by tungtouch on 2/5/15.
 */

/*
* Listen UDP from Device: 128.199.126.250
* */

var dgram = require("dgram");
var colors = require('colors');
var async = require('async');
var redis = require("redis");
var rClient = redis.createClient();

//var ports = [4000, 4001, 4002, 3333, 4003, 4004, 4005, 4006, 4007, 4008, 4009, 4010, 3001, 3002, 3003, 3004, 3005, 3006, 3007, 3008, 3009, 3010, 3011];
var ports = [4444];
var r = 0;

var client = dgram.createSocket('udp4');

function saveData(index, data){
    rClient.hset("raw", "data"+index, data);
}


rClient.on("error", function (err) {
    console.log("Error " + err);
});

var q = async.queue(function (data, callback) {

    saveData(data.index, data.data);
    callback();

}, 20);

for(var i=0; i < ports.length; i++){

    console.log("Start listen port ",i,":", ports[i]);

    client.on("error", function (err) {
        console.log("Server error:\n".red + err.stack);
        client.close();
    });

    client.on("message", function (data, rinfo) {
        r++;
        console.log(("Success:" + r).blue);

        q.push({index: r, data: data}, function (err) {
            if(err){
                console.log("Error queue: ", err);
            }
        });
        //console.log("Number process: ", q.length());
        //console.log("Server got: ".yellow + " IP: " +
        //rinfo.address + " - Port:" + rinfo.port);
    });

    client.bind(ports[i]);
}
