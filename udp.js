//var redis = require("redis");
//var rClient = redis.createClient();
var dgram = require("dgram");
var mongoose = require('mongoose');
var d = require('dequeue');
var FIFO = new d();

// Defined variables
var port = 4343;


// Call function init() loop
setInterval(init, 1);

// Implement MongoDB
var db = mongoose.connection;
mongoose.connect('mongodb://localhost/test');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
   console.log("Connect Database Success !");
});

var Schema = mongoose.Schema;

var rawSchema = new Schema({
    raw: String,
    author: String
});

var rawModel = mongoose.model('Raw', rawSchema);

// End mongoDB


// Start server listenning UDP
var udpServer = dgram.createSocket("udp4");

udpServer.on("message",
    function (msg, rinfo) {
        FIFO.push(msg.toString());
    }
);

udpServer.on('error', function (err) {
    console.log("Error server UDP: ", err);
});

udpServer.bind(port);
console.log("Running server: ", port);
// End listen UDP


// Function init listen process performance UDP
var index = 0;
function init() {
    while (FIFO.length > 0) {
        index++;
        var msg = FIFO.shift();

        var rawData = new rawModel({raw: msg, author: 'index:'+index});

        rawData.save(function (err) {

            console.log("Insert succes", index);

            if (err) return handleError(err);

            /*  rawModel.findById(rawData, function (err, doc) {
             if (err) return handleError(err);
             console.log("Data insert: ", doc); // {raw: '12321321312312', author: 'tt'}
             })*/
        });

        //console.log("msg", msg);
    }
}