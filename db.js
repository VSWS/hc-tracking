/**
 * Created by tungtouch on 2/6/15.
 */

var ae = require('aerospike');

// Connect cluster
var client = ae.client({
    hosts: [ { addr: 'localhost', port: 3000} ]
}).connect(function (res) {
    //check err
    if( res.code == ae.status.AEROSPIKE_OK ){
        //connection succeeded
        console.log("Connection to Aerospike cluster succeeded");
    } else {
        //connect false;
        console.log("Connection faile");
    }
});

function seedObjects()  {
    var start = 1;
    var end = 1000000;

    for (var i = start; i <= end; i++) {
        var record = {uid: 'user'+i};
        var key = ae.key('test','test',i);
        client.put(key, record, cb);
    }
}

var cb = function (err,rec,meta) {
    if (err.code === ae.status.AEROSPIKE_OK) {
        //success
        console.log('[Success] - ', rec, meta);
    } else {
        //failure
        console.error('Error: ', err);
    }
};
    seedObjects();