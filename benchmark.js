/**
 * Created by tungtouch on 2/9/15.
 */
var dgram = require('dgram');
var message = new Buffer("Some bytes:");
var client = dgram.createSocket("udp4");
var async = require('async');

var max = 1000;
var arr = [];
var item = 0;

for (var i = 0; i < max; i++) {
    benchmark(i);
    if(i=max){
        client.close();
    }
}

function benchmark(item){

    client.send(message, 0, message.length, 4444, "128.199.126.250", function (err, result) {
        console.log("OK: ", item);
        if(err){
            console.log("err: ",err);
        }
        if(result){
            console.log("Result:", result);
        }
    });
}