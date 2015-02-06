/**
 * Created by tungtouch on 2/5/15.
 */

/*
* Listen UDP from Device
* */
var dgram = require('dgram');
//var buffer = new Buffer(11);
var conv = require('binstring');

var client = dgram.createSocket('udp4', function(data){
    console.log("1. Data Raw: ", data);
    console.log("2. JSON Data: ", JSON.string(data));
    console.log("3. Decoder:", typeof data, data.toString('utf8'));

    //console.log("2. New Buffer:");
    var arrData = JSON.stringify(data);
    var buf = new Buffer(arrData);
    //console.log('- BinString 1: ', conv(arrData, { out:'hex' }));
    //console.log('- BinString 2: ', conv(arrData, { out:'utf8' }));
    //console.log('- Buffer: ', typeof buf, buf);
    //console.log('- Decoder: ', buf.toString('utf8'));



    //console.log( "Decode: " + buff.toString('hex'));
});
    client.bind(3333);

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