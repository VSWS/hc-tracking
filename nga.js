var dgram = require('dgram');


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
            'func': function(str){
                return {
                    'goidai' : str.slice(6,10),
                    'ip' : str.slice(10,18),
                    'vitri': str.slice(18,68),
                    'morong': str.slice(),
                    'sum': str.slice(str.length - 4, str.length - 2)
                }
            }
        },
        'B1': {
            'des': 'Du lieu nhay',
            'type': 'client',
            'res': '21',
            'pro': 'udp',
            'hex' : '',
            'func': function(str){
                return {
                    'goidai' : str.slice(6,10),
                    'ip' : str.slice(10,18),
                    'vitri': str.slice(18,68),
                    'morong': str.slice(),
                    'sum': str.slice(str.length - 4, str.length - 2)
                }
            }
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


var client = dgram.createSocket('udp4', function(data){
    var data = data.toString('hex');
    console.log('data',data);

    var menhlenh = data.slice(4,6);

    console.log("Menh lenh:", menhlenh);

    if(menhlenh == 80){
        var obj = structer.v1[menhlenh].func(data);
        console.log("Du lieu cuoi:", obj);
    }


    console.log(data);
    console.log("----------------------------------------------");
});

client.on('message', function(data, ip) {
    console.log(ip.port, ip.address);
   /* client.send(logdata, 0, logdata.length, ip.port, ip.address, function(err) {
        if(!err) {
            //console.log('send success');
        }else {
            //console.log(err);
        }
    });*/
    //console.log(util.inspect(ip, {depth: null}));
})
client.bind(3333);