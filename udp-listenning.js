/*
 * Listen UDP from Device
 * */
var dgram = require('dgram');
var colors = require('colors');
//var buffer = new Buffer(11);
var ports = [4000, 4001, 4002, 4003, 4004, 4005, 4006, 4007, 4008, 4009, 4010];

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
            'pro' : 'udp/tcp'
        },
        '28' : {
            'des' : 'thu thập hình ảnh',
            'type': 'server',
            'res' : '85',
            'pro' : 'udp/tcp'
        },
        '2A' : {
            'des' : 'Chup anh lien tiep 10s',
            'type': 'server',
            'res' : '85',
            'pro' : 'udp/tcp'
        },
        '21': {
            'des' : 'Server gui xac nhan menh lenh',
            'type': 'server',
            'pro' : 'udp'
        },
        '80': {
            'des': 'Du lieu vi tri',
            'type': 'client',
            'res' : '21',
            'pro' : 'udp'
        },
        'B1': {
            'des': 'Du lieu nhay',
            'type': 'client',
            'res': '21',
            'pro': 'udp'
        },
        'E0': {
            'des': 'Nguoi dang ky lai xe thoat',
            'type': 'client',
            'res' : '21',
            'pro' : 'udp'
        }
    }
}


for(var i=1; i < ports.length; i++){
    console.log("Start listen port ",i,":",ports[i]);

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