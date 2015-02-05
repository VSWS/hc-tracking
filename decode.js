/**
 * Created by tungtouch on 2/5/15.
 */
str = "node.js";
buf = new Buffer(str.length);

for (var i = 0; i < str.length ; i++) {
    buf[i] = str.charCodeAt(i);
}

console.log(buf);
