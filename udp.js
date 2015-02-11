var d = require ('dequeue');
var redis = require("redis");
var rClient = redis.createClient();
var dgram = require("dgram");

var FIFO = new d();

init();

var udpserver = dgram.createSocket("udp4");

udpserver.on("message",
    function (msg, rinfo) {
        FIFO.push(msg.toString());
        //console.log("MSG", msg);
    }
);

udpserver.bind(4444);

var index =0;

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