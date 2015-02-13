/*
 * Listen UDP from Device
 * */
var dgram = require('dgram');
var colors = require('colors');
//var buffer = new Buffer(11);
var ports = [4000, 4001, 4002, 4003, 4004, 4005, 4006, 4007, 4008, 4009, 4010];

for(var i=1; i < ports.length; i++){
    //console.log("Start listen port ",i,":",ports[i]);

    var client = dgram.createSocket('udp4', function(data){
        console.log("[1. Data Raw]: ".green, data);
        console.log("[2. JSON Data]: ".yellow, JSON.stringify(data));
        //console.log("[3. Decoder:]".blue, typeof data, data.toString('utf8'));
        console.log("-------------------------------------------------");

    });
    client.bind(ports[i]);
}
//client.bind(3333);


// Running
console.log("Running Server!");