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

var key = ae.key('test', 'demo', 'foo');

if (client != null) {
    client.get(key, function (err, rec, meta) {
        if(err.code = ae.status.AEROSPIKE_OK) {
            console.log(rec, meta);
        } else {
            console.error('err', err);
        }
    })
}