var d = require ('dequeue');
var redis = require("redis");
var dgram = require("dgram");

var rClient = redis.createClient();
var FIFO = new d();
var index =0;

// Start Server

init();

var udpServer = dgram.createSocket("udp4");

udpServer.on("message",
    function (msg, rinfo) {
        FIFO.push(msg.toString());
        //console.log("MSG", msg);
    }
);
udpServer.on('error', function (err) {
    console.log("Error server: ", err);
})

udpServer.bind(4444);



function init () {
    while (FIFO.length > 0)
    {
        index++;
        var msg = FIFO.shift();
        rClient.hset("raw", "data"+index, msg);
        console.log("Successed", index);
    }
}

///