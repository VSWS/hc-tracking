var d = require ('dequeue');
var redis = require("redis");
var rClient = redis.createClient();
var dgram = require("dgram");

var FIFO = new d();

fetcher();

var udpserver = dgram.createSocket("udp4");

udpserver.on("message",
    function (msg, rinfo) {
        FIFO.push(msg.toString());
    }
);

udpserver.bind(4444);

var index =0;

function fetcher () {
    while (FIFO.length > 0)
    {
        index++;
        var msg = FIFO.shift();
        console.log("Success: ", index);
        rClient.hset("raw", "data"+index, msg);
    }
}

///