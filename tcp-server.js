/**
 * Created by tungtouch on 2/9/15.
 */
var net = require('net');
var port = 5555;


// Proxy server
var server = net.createServer(function (socket) {

    console.log("Client connected!");
    // create connection to TCPe

    socket.pipe(socket);

    socket.on('data', function (data) {
        console.log('Data client:', data.toString());
    });

    socket.write("I'm Server ! \r\n");

    socket.on('error', function (err) {
        console.log("Error server:", err.soString());
    });

    socket.on('end', function () {
        console.log("Client disconnect server");
    });

});

server.listen(port, function () {
    console.log("Server Running!");
});