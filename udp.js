/**
 * Created by tungtouch on 2/5/15.
 */

/*
* Listen UDP from Device: 128.199.126.250
* */

var dgram = require("dgram");
var colors = require('colors');


var ports = [4000, 4001, 4002, 3333, 4003, 4004, 4005, 4006, 4007, 4008, 4009, 4010,
            3001, 3002, 3003, 3004, 3005, 3006, 3007, 3008, 3009, 3010, 3011];
var r = 0;

for(var i=1; i < ports.length; i++){

    var client = dgram.createSocket('udp4', function(data){
        console.log("")
        console.log("[1. Data Raw]: ".green, data);
        console.log("[2. JSON Data]: ".yellow, JSON.stringify(data));
        //console.log("[3. Decoder:]".blue, typeof data, data.toString('utf8'));
        console.log("-------------------------------------------------");
        console.log("Total request: ".blue, r++ );
        console.log("Port using: ", ports[i]);

    });

    console.log("Start listen port ",i,":",ports[i]);

    client.on("error", function (err) {
        console.log("Server error:\n".red + err.stack);
        client.close();
    });
    //
    client.on("message", function (msg, rinfo) {
        console.log("Server got: ".yellow + " IP: " +
        rinfo.address + " - Port:" + rinfo.port);
    });

    //client.on("listening", function () {
    //    var address = client.address();
    //    console.log("Server listening ".blue +
    //    address.address + ":" + address.port);
    //});

    client.bind(ports[i]);
}

/*var client = dgram.createSocket('udp4', function(data){
    console.log("")
    console.log("[1. Data Raw]: ".green, data);
    console.log("[2. JSON Data]: ".yellow, JSON.stringify(data));
    //console.log("[3. Decoder:]".blue, typeof data, data.toString('utf8'));
    console.log("-------------------------------------------------");

});*/
    //client.bind(3333);

