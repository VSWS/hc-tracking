var dgram = require('dgram');
var util = require('util');
var logdata = new Buffer("hehe this is new buffer");


var client = dgram.createSocket('udp4', function(data){
    //console.log(logdata);	
    //console.log(new Buffer(data));
    var ip = data.slice(6, 10).toString('hex');
    console.log(data);
    console.log(data.toString('hex'));
    //console.log(ip);
    //console.log(new Buffer('29298000', 'hex'));
    //console.log("String data: "	 + data.toString('hex'));
    //console.log("Json data:", data.slice(6, 10).toString('hex')); 
    console.log("----------------------------------------------");
});

client.on('message', function(data, ip) {
    console.log(ip.port, ip.address);
    client.send(logdata, 0, logdata.length, ip.port, ip.address, function(err) {
        if(!err) {
            //console.log('send success');
        }else {
            //console.log(err);
        }
    });
    //console.log(util.inspect(ip, {depth: null}));
})
client.bind(3333);