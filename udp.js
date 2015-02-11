var d = require ('dequeue');
var redis = require("redis");
var rClient = redis.createClient();
var dgram = require("dgram");

var FIFO = new d();
var index =0;
fetcher();

var udpserver = dgram.createSocket("udp4");

udpserver.on("message",
    function (msg, rinfo) {
        index++;
        console.log("Success: ", index);
        FIFO.push(msg.toString());
    }
);

udpserver.bind(4444);

function fetcher () {
    while (FIFO.length > 0)
    {
        var msg = FIFO.shift();
        rClient.hset("raw", "data"+index, msg);
    }
    setImmediate(fetcher); //make this function continuously run
}

///