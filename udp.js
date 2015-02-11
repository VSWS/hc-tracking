var d = require ('dequeue');
var redis = require("redis");
var rClient = redis.createClient();
var dgram = require("dgram");

var FIFO = new d();
var port = 4444;


init();

var udpServer = dgram.createSocket("udp4");

udpServer.on("message",
    function (msg, rinfo) {
        FIFO.push(msg.toString());
    }
);
udpServer.on('error', function (err) {
    console.log("Error server: ", err);
})

udpServer.bind(port);
console.log("Running server: ", port);
function init() {
    while (FIFO.length > 0)
    {
        var msg = FIFO.shift();
        rClient.hset("raw", "data", msg);

    }
    setImmediate(init);
};