/**
 * Created by tungtouch on 2/5/15.
 */

/*
* Listen UDP from Device
* */
var dgram = require('dgram');
var buffer = new Buffer(11);

var client = dgram.createSocket('udp4', function(data){
    console.log("Data Raw: ", data);
    var arrData = JSON.stringify(data);
    var buf = new Buffer(data).toString('ascii');

    console.log("Data decoder:", buf);

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