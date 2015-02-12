/**
 * Created by tungtouch on 2/9/15.
 */
var net = require('net');
var port = 5555;


// Proxy server
var proxy = net.createServer(function (socket) {

    console.log("Client connected!");
    // create connection to TCPe
    //socket.write("Echo Server\r\n");
    socket.pipe(socket);

    socket.on('data', function (data) {
        console.log('Data client:', data.toString());
    });

    socket.on('error', function (err) {
        console.log("Error server:", err.soString());
    });

    socket.on('end', function () {
        console.log("Client disconnect server");
    });

});

proxy.listen(port, function () {
    console.log("Server Running!");
});