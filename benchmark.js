//
/**
 * Created by tungtouch on 2/9/15.
 */

var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

var dgram = require('dgram');
var message = new Buffer("Some bytes hello world bo bo bo world HEHEHEHE ahhaha hohoho hehe:");
var client = dgram.createSocket("udp4");
var async = require('async');

var max = 100;
var numCluster = 100;
var arr = [];

for (var i = 0; i < max; i++) {
    arr.push(i);
}
var a = 0;

//[2GB]128.199.126.250 [8GB]128.199.109.202


if (cluster.isMaster) {

    // Keep track of http requests
    var numReqs = 0;

    setInterval(function() {
        console.log("numReqs =", numReqs);
    }, 1000);

// Count requestes
    function messageHandler(msg) {
        if (msg.cmd && msg.cmd == 'notifyRequest') {
            numReqs += 1;
        }
    }


    // Start workers and listen for messages containing notifyRequest

    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    Object.keys(cluster.workers).forEach(function(id) {
        cluster.workers[id].on('message', messageHandler);
    });

} else {
    var q = async.queue(function(index, cb){
        console.log("Index: ", index);
        setTimeout(function () {
            client.send(message, 0, message.length, 4444, "128.199.126.250", function (err) {
                //console.log("Request : ", a++);
                process.send({ cmd: 'notifyRequest' });
                if(err){
                    console.log('ERROR :', err);
                }
                cb(err);
            });
        }, 10);
    });

    q.push(arr);

}