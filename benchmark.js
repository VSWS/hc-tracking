//
/**
 * Created by tungtouch on 2/9/15.
 */

var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
var colors = require('colors');
var dgram = require('dgram');
var message = new Buffer("Some bytes hello world bo bo bo world HEHEHEHE ahhaha hohoho hehe:");
var client = dgram.createSocket("udp4");
var async = require('async');

var max = 1000;
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
    var totalReqs = 0;
    var second = 0;

    setInterval(function() {
        console.log(
            colors.red("Gói tin/s: ", numReqs), " | ",
            colors.yellow("Tổng gói tin: ", totalReqs), " | ",
            colors.blue("Thời gian: ", second++ +"s"));
        numReqs = 0;
        if(totalReqs == (max * numCluster)) {
            console.log(colors.cyan("\n-------------------------------"));
            console.log("Tổng thời gian: ", second-1 + "s", " | Tổng số gói tin:", totalReqs);
            console.log(colors.cyan("Kết quả hệ thống: ", colors.bold(totalReqs / second)), " Thiết bị/giây ! \n");

            process.exit(1);
        }
    }, 1000);

    // Count requestes
    function messageHandler(msg) {
        if (msg.cmd && msg.cmd == 'notifyRequest') {
            numReqs += 1;
            totalReqs +=1;
        }
    }

    // Start workers and listen for messages containing notifyRequest

    for (var i = 0; i < numCluster; i++) {
        cluster.fork();
    }

    Object.keys(cluster.workers).forEach(function(id) {
        cluster.workers[id].on('message', messageHandler);
    });

} else {
    var q = async.queue(function(index, cb){
        //console.log("Index: ", index);
        setTimeout(function () {
            client.send(message, 0, message.length, 4444, "128.199.126.250", function (err) {
                //console.log("Request : ", a++);
                process.send({ cmd: 'notifyRequest' });
                if(err){
                    console.log('ERROR :', err);
                }
                cb(err);
            });
        }, 20);
    });

    q.push(arr);

}