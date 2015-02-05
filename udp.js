/**
 * Created by tungtouch on 2/5/15.
 */

/*
* Listen UDP from Device
* */
var dgram = require('dgram');

var client = dgram.createSocket('udp4', function(data){
    console.log("Data Raw: ", data);
    var buff = new Buffer(data, 'utf8');
    console.log( "Decode: " + buff.toString('hex'));
});
    client.bind(3333);

/*
* Listen TCP from Device
* */
var net = require('net');
var server = net.createServer(function (conn) {
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