/**
 * Created by tungtouch on 2/7/15.
 */

// Require the dgram module
var dgram = require('dgram');

// Take in the host from command-line input
var host = process.argv[2];
// Take in port number (and parse as an integer)
var port = parseInt(process.argv[3], 10);

// Create the client
client = dgram.createSocket('udp4');

// Accept input  via standard input
process.stdin.resume();

// Listen for incoming standard input
process.stdin.on('data', function (data) {
    // Send all data to the client.
    client.send(data, 0, data.length, port, host);
});

// Listen for messages from client
client.on('message', function (message) {
    console.log("Client: " + message.toString());
});

console.log("To send a message, " +
"type now and press return.");