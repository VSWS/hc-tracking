/**
 * Created by tungtouch on 2/5/15.
 */
var dgram = require('dgram');

var client = dgram.createSocket('udp4', function(data){
    var buff = new Buffer(data, 'utf8');
    console.log("UDP Data: ", data + " | Decode: " + buff.toString('hex'));
});
    client.bind(3333);

console.log("Running");