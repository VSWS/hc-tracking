/**
 * Created by tungtouch on 2/9/15.
 */
var net = require('net');
var util = require('util');
var port = 5555;
var index = 0;

// Server IP: 128.199.126.250
var server = net.createServer(function (socket) {

    console.log("Client connected!");
    // create connection to TCPe

    //socket.pipe(socket);

    socket.on('data', function (data) {
        //socket.write("Server:", data);
        //var result = data.toString();
      console.log("Index: ", index++);

    });

    //socket.write("Welcome, i'm Server ! \r\n");

    socket.on('error', function (err) {
        console.log("Error server:", err.toString());
    });

    socket.on('end', function () {
        console.log("Client disconnect server");
    });

});

server.listen(port, function () {
    console.log("Server Running!");
});