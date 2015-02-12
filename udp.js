/*
 * Dependencies Packages
 * */
var dgram = require("dgram"),
    d = require('dequeue');
var redis = require("redis");
var rClient = redis.createClient();
var FIFO = new d();         // Non-blocking performance implement UDP server
/*
 * Set Variables
 * */
var portUDP = 4545; // UDP Port

var hostTCP = "localhost", // TCP IP Server
    portTCP = 7777; // TCP Port

setInterval(init, 1);

/*
 * Proxy UDP to TCP
 * */
//var proxy = new net.Socket();

/*proxy.connect(portTCP, hostTCP, function (socket) {
 console.log("Connecting Server TCP:", hostTCP,":",portTCP);

 });*/
/*

proxy.connect(portTCP, hostTCP, function(socket){
    console.log("Connect succes server:", hostTCP);
});

proxy.on('error', function (err) {
    console.log("Error proxy UDP to TCP: ", err);
});

proxy.write("Push Notification 1");

proxy.on('end', function (data) {
    console.log("Proxy End: ", data);
});

proxy.on('close', function () {
    console.log("Proxy UDP to TCP: Closed !");
});

*/


/*
 *  UDP Server
 * */
var udpServer = dgram.createSocket("udp4");
var index = 0;

udpServer.on("message", function (msg, rinfo) {
        var obj = {data: msg, rinfo: rinfo};
        FIFO.push(obj);
    }
);


udpServer.on('error', function (err) {
    console.log("Error server UDP: ", err);
});

udpServer.bind(portUDP);

console.log("Running server: ", portUDP);


/*
 * Function init listen process performance UDP
 * */


function init() {
    while (FIFO.length > 0) {
        var data = FIFO.shift();
        index++;
        rClient.hset("raw", "data"+index, data.msg, "ip", data.msg.address, "port", data.msg.port);
        //proxy.write(msg.toString());
        console.log("Hoàn thành: ", data);
    }
}