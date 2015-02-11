var d = require ('dequeue');
var redis = require("redis");
var rClient = redis.createClient();
var dgram = require("dgram");

var FIFO = new d();
var index =0;

fetcher();

var udpserver = dgram.createSocket("udp4");
udpserver.on('error', function (err) {
    console.log("Error Server", err);
})
udpserver.on("message",
    function (msg, rinfo) {
        index++;
        FIFO.push(msg.toString());
        console.log("Success:", index);
    }
);

udpserver.bind(4444);



function fetcher () {
    while (FIFO.length > 0)
    {
        var msg = FIFO.shift();
        rClient.hset("raw", "data"+index, msg);
    }
}