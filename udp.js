/*
* Dependencies Packages
* */
var dgram = require("dgram"),
    net = require('net'),
    d = require('dequeue');


/*
 * Set Variables
 * */
var portUDP = 4343; // UDP Port

var hostTCP = "128.199.126.250", // TCP IP Server
    portTCP = 5555; // TCP Port


/*
 * Proxy UDP to TCP
 * */
var proxy = new net.Socket();

proxy.connect(portTCP, hostTCP, function (socket) {
    console.log("Connecting Server TCP:", hostTCP,":",portTCP);
});

proxy.write("First data !");

proxy.on('error', function (err) {
    console.log("Error proxy UDP to TCP: ", err);
});

proxy.on('close', function () {
    console.log("Proxy UDP to TCP: Closed !");
});


/*
*  UDP Server
* */
var udpServer = dgram.createSocket("udp4");
var index = 0;
var obj;

udpServer.on("message",
    function (msg, rinfo) {
        index++;
        obj = {"index": index, "msg": msg};
        FIFO.push(obj);
    }
);

udpServer.on('error', function (err) {
    console.log("Error server UDP: ", err);
});

console.log("Running server: ", portUDP);


/*
* Function init listen process performance UDP
* */
var FIFO = new d();         // Non-blocking performance implement UDP server

function init() {
    while (FIFO.length > 0) {
        var msg = FIFO.shift();
        console.log("Data:", msg.index);
    }
}