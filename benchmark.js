/**
 * Created by tungtouch on 2/9/15.
 */
var dgram = require('dgram');
var message = new Buffer("Some bytes");
var client = dgram.createSocket("udp4");
client.send(message, 0, message.length, 41234, "128.199.126.250", function(err) {
    console.log("OK");
    client.close();
});