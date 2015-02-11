var d = require ('dequeue');
var redis = require("redis");
var rClient = redis.createClient();
var dgram = require("dgram");

var FIFO = new d();
var port = 4444;

setInterval(init, 1);


var udpServer = dgram.createSocket("udp4");

udpServer.on("message",
    function (msg, rinfo) {
        FIFO.push(msg.toString());
    }
);

udpServer.on('error', function (err) {
    console.log("Error server: ", err);
});

udpServer.bind(port);
console.log("Running server: ", port);

var index = 0;
function init() {
    while (FIFO.length > 0)
    {
        index++;
        var msg = FIFO.shift();
        rClient.hset("raw", "data"+index, msg+index);
        //console.log("msg", msg);
        //process.nextTick(init);
    }
}