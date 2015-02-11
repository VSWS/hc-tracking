/**
 * Created by tungtouch on 2/11/15.
 */
var dgram = require('dgram');
var client = dgram.createSocket("udp4");
var message = new Buffer("Hi");

client.send(message, 0, message.length, 37040, "113.185.5.111", function (err) {
    console.log("Request : ", message);
    if(err){
        console.log('ERROR :', err);
    }

});