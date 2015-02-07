/**
 * Created by tungtouch on 2/5/15.
 */

/*
* Listen UDP from Device
* */
var dgram = require('dgram');
var colors = require('colors');
//var buffer = new Buffer(11);
var conv = require('binstring');
var ports = [4000, 4001, 4002, 4003, 4004, 4005, 4006, 4007, 4008, 4009, 4010];

var client = dgram.createSocket('udp4', function(data){
    console.log("[1. Data Raw]: ".green, data);
    console.log("[2. JSON Data]: ".yellow, JSON.stringify(data));
    //console.log("[3. Decoder:]".blue, typeof data, data.toString('utf8'));
    console.log("-------------------------------------------------");
    //console.log("2. New Buffer:");
    var arrData = JSON.stringify(data);
    var buf = new Buffer(arrData);
    //console.log('- BinString 1: ', conv(arrData, { out:'hex' }));
    //console.log('- BinString 2: ', conv(arrData, { out:'utf8' }));
    //console.log('- Buffer: ', typeof buf, buf);
    //console.log('- Decoder: ', buf.toString('utf8'));



    //console.log( "Decode: " + buff.toString('hex'));
});
for(var i=1; i < ports.length; i++){
    console.log("Start listen port ",i,":",ports[i]);
    client.bind(ports[i]);
}
    //client.bind(3333);

/*
* Listen TCP from Device
* */
var net = require('net');
var server = net.createServer(function (c) {
    console.log('Client Connected');
    c.on('end', function () {
        console.log('Client Disconnected');
    });
    c.write("Test TCP");
    c.pipe(c);
});
server.listen(5555, function () {
    console.log("TCP bound!");
});


// Running
console.log("Running");