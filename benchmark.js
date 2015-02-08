/**
 * Created by tungtouch on 2/9/15.
 */
var dgram = require('dgram');
var message = new Buffer("Some bytes:");
var client = dgram.createSocket("udp4");

var max = 5;

for (var i = 0; i < max; i++) {
    benchmark(i);
}

function benchmark(i){
    client.send(message, 0, message.length, 4444, "128.199.126.250", function (err) {
        console.log("OK: ", i);
        if(err){
            console.log(err);
        }
        //client.close();
    });
}