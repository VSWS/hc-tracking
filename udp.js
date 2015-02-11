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
var index = 0;
function init() {
    while (FIFO.length > 0)
    {
        index++;
        var msg = FIFO.shift();
        rClient.hset("raw", "data"+index, msg);
        console.log("Success: ", index);
    }
    setImmediate(init);
};