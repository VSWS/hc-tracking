/**
 * Created by tungtouch on 2/11/15.
 */
exports.parseMessage = function (msg) {
    proc = new asyncProcHandler(msg, function (err) {
        if (err) {
            //handle the error
        }
    });
}