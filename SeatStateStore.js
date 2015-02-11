/**
 * Created by tungtouch on 2/11/15.
 */
seatStateProcessor.parseMessage = function (msg) {
    proc = new asyncProcHandler(msg, function (err) {
        if (err) {
            //handle the error
        }
    });
}