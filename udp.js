//var redis = require("redis");
//var rClient = redis.createClient();
var dgram = require("dgram");
var MongoClient = require('mongodb').MongoClient
var d = require('dequeue');
var FIFO = new d();

// Defined variables
var port = 4343;


// Call function init() loop
setInterval(init, 1);

// Implement MongoDB
var conn = 'mongodb://localhost:27017/hc';
MongoClient.connect(conn, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    insertDocuments(db, function () {
        db.close();
    });
});

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

        var insertDocuments = function(db, callback) {
            // Get the documents collection
            var collection = db.collection('documents');
            // Insert some documents
            collection.insert([
                {raw: msg, auth: index}
            ], function(err, result) {
                if(err){
                    console.log("Error insert: ", err);
                }
                console.log("insert sucess:", result);
                callback(result);
            });
        };
    }
}