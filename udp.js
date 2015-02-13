/*
 * Dependencies Packages
 * */
var dgram = require("dgram"),
    d = require('dequeue');
var redis = require("redis");
var rClient = redis.createClient();
var FIFO = new d();         // Non-blocking performance implement UDP server
/*
 * Set Variables
 * */
var portUDP = 4545; // UDP Port

var hostTCP = "localhost", // TCP IP Server
    portTCP = 7777; // TCP Port

setInterval(init, 1);

/*
 * Proxy UDP to TCP
 * */
//var proxy = new net.Socket();

/*proxy.connect(portTCP, hostTCP, function (socket) {
 console.log("Connecting Server TCP:", hostTCP,":",portTCP);

 });*/
/*

proxy.connect(portTCP, hostTCP, function(socket){
    console.log("Connect succes server:", hostTCP);
});

proxy.on('error', function (err) {
    console.log("Error proxy UDP to TCP: ", err);
});

proxy.write("Push Notification 1");

proxy.on('end', function (data) {
    console.log("Proxy End: ", data);
});

proxy.on('close', function () {
    console.log("Proxy UDP to TCP: Closed !");
});

*/


/*
 *  UDP Server
 * */
var udpServer = dgram.createSocket("udp4");
var index = 0;


var str = "292980002f00802ed51501302005210210079210548829000000007c0000007feffff8001e007800000000000500010000001f0d";

var goidau = str.slice(0,4);
var menhlenh = str.slice(4,6);
var goidai = str.slice(6,10);
var ip = str.slice(10,18);
var vitri = str.slice(18,68);
var sum = str.slice(str.length - 4, str.length - 2);
var morong = str.slice(68, str.length - 4);
var goicuoi = str.slice(str.length - 2, str.length);


var structer = {
    'v1' : {
        "30" : {
            'des' : 'Tìm xem vị trí hiện tại của xe trong chỉ định',
            'type' : 'server',
            'res'  : '81',
            'pro': 'udp/tcp'
        },
        "3D" : {
            'des' : 'Tìm kiếm phiên bản tin của chiếc xe chỉ định',
            'type' : 'server',
            'res' : '2B',
            'pro' : 'udp/tcp',
            'hex' : ''
        },
        '28' : {
            'des' : 'thu thập hình ảnh',
            'type': 'server',
            'res' : '85',
            'pro' : 'udp/tcp',
            'hex' : ''
        },
        '2A' : {
            'des' : 'Chup anh lien tiep 10s',
            'type': 'server',
            'res' : '85',
            'pro' : 'udp/tcp',
            'hex' : ''
        },
        '21': {
            'des' : 'Server gui xac nhan menh lenh',
            'type': 'server',
            'pro' : 'udp',
            'hex' : ''
        },
        '80': {
            'des': 'Du lieu vi tri',
            'type': 'client',
            'res' : '21',
            'pro' : 'udp',
            'func': function(data){

            }
        },
        'B1': {
            'des': 'Du lieu nhay',
            'type': 'client',
            'res': '21',
            'pro': 'udp',
            'hex' : ''
        },
        'E0': {
            'des': 'Nguoi dang ky lai xe thoat',
            'type': 'client',
            'res' : '21',
            'pro' : 'udp',
            'hex' : ''
        }
    }
};

console.log(">", goidau,'menh lenh:',  menhlenh, 'goi dai:', goidai, 'ip:', ip, 'vi tri:', vitri, 'morong:', morong, 'sum:', sum, 'goi cuoi:', goicuoi);


udpServer.on("message", function (msg, rinfo) {
        menhlenh = msg.slice(4,6);
        if(structer.v1[menhlenh]){
            console.log("Du lieu ok")
        }
        if(msg)
        var obj = {data: msg, rinfo: rinfo};
        FIFO.push(obj);
    }
);


udpServer.on('error', function (err) {
    console.log("Error server UDP: ", err);
});

udpServer.bind(portUDP);

console.log("Running server: ", portUDP);


/*
 * Function init listen process performance UDP
 * */


function init() {
    while (FIFO.length > 0) {
        var data = FIFO.shift();
        index++;

        rClient.hmset("raw", "data"+index, data, "ip", data.rinfo.address, 'port',data.rinfo.port);
        //proxy.write(msg.toString());
        console.log("Hoàn thành: ", data);
    }
}