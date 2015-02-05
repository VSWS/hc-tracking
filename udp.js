/**
 * Created by tungtouch on 2/5/15.
 */
var dgram = require('dgram');

var client = dgram.createSocket('udp4', function(data){
    console.log("UDP Data: ", data);
});
    client.bind(3333);