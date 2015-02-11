var FIFO = require ('dequeue');
var seatStateStore = require("./SeatStateStore");
var dgram = require("dgram");

fetcher();

var udpserver = dgram.createSocket("udp4");

udpserver.on("message",
    function (msg, rinfo) {
        console.log(FIFO);
        FIFO.push(msg);
    }
);

udpserver.bind(4444);

function fetcher () {
    while (FIFO.length > 0) {
        var msg = FIFO.shift();
        console.log(msg);
        seatStateStore.parseMessage(msg);
        process.nextTick(fetcher);
    }
}
