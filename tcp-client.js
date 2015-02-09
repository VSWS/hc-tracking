/**
 * Created by tungtouch on 2/9/15.
 */

var net = require('net');

var client = new net.Socket();
//var client = net.connect({port: 5555/*, host: '128.199.126.250'*/},

var max = 5000;
var arr = [];

for (var i = 0; i < max; i++) {
    arr.push(i);
}

client.connect(5555, 'localhost', function (socket) {
    console.log('Connected server!');
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

if (cluster.isMaster) {
    // Fork workers.
    for (var i = 0; i < 40; i++) {
        cluster.fork();
    }

    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });
} else {
    // Workers can share any TCP connection
    // In this case its a HTTP server
    q.push(arr);
}
console.log("Starting Benchmark!");