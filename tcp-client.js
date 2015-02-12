/**
 * Created by tungtouch on 2/9/15.
 */

var cluster = require('cluster');
var net = require('net');
var numCPUs = require('os').cpus().length;
var colors = require('colors');
var async = require('async');
var client = new net.Socket();
//var client = net.connect({port: 5555/*, host: '128.199.126.250'*/},

var max = 100000;
var numCluster = 10;
var host = "localhost";
var arr = [];

for (var i = 0; i < max; i++) {
    arr.push(i);
}

if (cluster.isMaster) {

    var numConn, totalConn, second = 0;

    setInterval(function() {
        console.log(
            colors.red("Connection/s: ", numConn), " | ",
            colors.yellow("Total connection: ", totalConn), " | ",
            colors.blue("Thời gian: ", second++ +"s"));

        //Set zero
        numReqs = 0;
        numConn = 0;

        if(totalReqs == maxReq) {
            console.log(colors.cyan("\n-------------------------------"));
            console.log("Tổng thời gian: ", second-1 + "s", " | Tổng số gói tin:", totalReqs);
            console.log(colors.cyan("Kết quả hệ thống: ", colors.bold(totalReqs / second)), " Thiết bị/giây ! \n");

            //process.exit(1);
        }

    }, 1000);

    // Count requestes
    function messageHandler(msg) {
        if (msg.cmd && msg.cmd == 'notifyRequest') {
            numConn += 1;
            totalConn +=1;


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

    var q = async.queue(function (index, cb) {
        setTimeout(function () {


            //console.log("Request : ", a++);
            process.send({ cmd: 'notifyRequest' });
            if(err){
                console.log('ERROR :', err);
            }
            cb(err);

        }, 20);
    });
    client.connect(5555, host, function (socket) {
        console.log('Connected server!');
        socket.write("First Data")
    });

    client.setEncoding('utf8');
    client.write("Push Notification 1");

    client.on('data', function (data) {
        console.log("Data Server: ", data);
    });

    client.on('error', function (err) {
        console.log("Error client:", err);
    });

    client.on('close', function () {
        console.log("Connection closed!");
    });

    q.push(arr);
}
console.log("Starting Benchmark!");