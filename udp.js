//var redis = require("redis");
//var rClient = redis.createClient();
var dgram = require("dgram");

var d = require('dequeue');
var FIFO = new d();

// Defined variables
var port = 4343;


// Call function init() loop
setInterval(init, 1);


// Start server listenning UDP
var udpServer = dgram.createSocket("udp4");
var index = 0;
var obj;
udpServer.on("message",
    function (msg, rinfo) {
        index++;
        obj = {"msg": msg, "index": index};
        FIFO.push(obj);
    }
);

udpServer.on('error', function (err) {
    console.log("Error server UDP: ", err);
});

udpServer.bind(port);
console.log("Running server: ", port);
// End listen UDP


// Function init listen process performance UDP

function init() {
    while (FIFO.length > 0) {
        console.log("FIFO:", FIFO);
        var msg = FIFO.shift();
        console.log("Data:", msg);
    }
}