/**
 * Created by tungtouch on 2/5/15.
 */

/*
* Listen UDP from Device
* */

var dgram = require("dgram");
var colors = require('colors');


var ports = [4000, 4001, 4002, 3333, 4003, 4004, 4005, 4006, 4007, 4008, 4009, 4010];


for(var i=1; i < ports.length; i++){
    var server = dgram.createSocket("udp4");

    console.log("Start listen port ",i,":",ports[i]);

    server.on("error", function (err) {
        console.log("Server error:\n".red + err.stack);
        server.close();
    });

    server.on("message", function (msg, rinfo) {
        console.log("Server got: ".yellow + msg + " from " +
        rinfo.address + ":" + rinfo.port);
    });

    server.on("listening", function () {
        var address = server.address();
        console.log("Server listening ".blue +
        address.address + ":" + address.port);
    });

    server.bind(ports[i]);
}

/*var client = dgram.createSocket('udp4', function(data){
    console.log("")
    console.log("[1. Data Raw]: ".green, data);
    console.log("[2. JSON Data]: ".yellow, JSON.stringify(data));
    //console.log("[3. Decoder:]".blue, typeof data, data.toString('utf8'));
    console.log("-------------------------------------------------");

});*/
    //client.bind(3333);

