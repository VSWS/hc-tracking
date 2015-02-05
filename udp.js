/**
 * Created by tungtouch on 2/5/15.
 */
var dgram = require('dgram');
var buf;

var client = dgram.createSocket('udp4', function(data){
    buf = new Buffer(data, "hex");
    console.log("UDP Data: ", buf);
});
    client.bind(3333);










