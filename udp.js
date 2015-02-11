var d = require ('dequeue');
var seatStateStore = require("./SeatStateStore");
var redis = require("redis");
var rClient = redis.createClient();
var dgram = require("dgram");

var FIFO = new d();

fetcher();

var udpserver = dgram.createSocket("udp4");

udpserver.on("message",
    function (msg, rinfo) {
        console.log("MSG", msg);
        FIFO.push(msg);
    }
);

udpserver.bind(4444);

function fetcher () {
    while (FIFO.length > 0) {

        var msg = FIFO.shift();
        console.log("Goi tin: ", msg);
        //rClient.hset("raw", "data"+index, msg);
        seatStateStore.parseMessage(msg);
        process.nextTick(fetcher);
    }
}

///