var net = require('net');
var fs = require("fs");
var dgram = require('dgram');
var path = require('path');


exports.talk_server_create = function () {
    var talk_server = net.createServer(function (serversocket) {
        serversocket.setEncoding('utf8');
        console.log('a client in!');
        //socket 有读缓冲区和写缓冲区
//client data :{uname: , utarget: ,udata:}
        serversocket.on('data', function (data) {
            console.log('data: ', data);
            var getdata = JSON.parse(data);
            var getusername = getdata.uname || '';
            var getutarget = getdata.utarget || '';
            var getudata = getdata.udata || '';

            var recordmsgpath = path.join(__dirname, "../resource/live_data.txt");
            var global_datapath = path.join(__dirname, "../resource/global_data.json");
            var recordmsg = fs.readFileSync(recordmsgpath, 'utf-8');
            var globaldata = JSON.parse(fs.readFileSync(global_datapath, 'utf-8'));

            if (getutarget == 'join') {
                if (!globaldata.onlineusers.some(nowusername => {
                    return nowusername == getusername
                })) {
                    globaldata.onlineusers.push(getusername);
                    fs.writeFileSync(global_datapath, JSON.stringify(globaldata));
                }
                var senddata = JSON.stringify({
                    'onlineusers': globaldata.onlineusers,
                    'recordmsg': recordmsg
                });
                serversocket.write(senddata, function () {
                    console.log('server join finish send');
                });

            } else if (getutarget == 'speak') {
                var speakmsg = getusername + ' : ' + getudata + '\n';
                fs.writeFileSync(recordmsgpath, speakmsg, {flag: 'a'});
                var newrecordmsg = fs.readFileSync(recordmsgpath, 'utf-8');
                var senddata = JSON.stringify({
                    'recordmsg': newrecordmsg
                });
                if (senddata !== undefined) {
                    serversocket.write(senddata, function () {
                        console.log('server speak finish send');
                    });
                }
            } else if (getutarget == 'leave') {
                var usernameindex = globaldata.onlineusers.indexOf(getusername);
                globaldata.onlineusers.splice(usernameindex, 1);
                fs.writeFileSync(global_datapath, JSON.stringify(globaldata));
            }


        })

        serversocket.on('end', function () {
            console.log('server disconneted');
        })


    });
    return talk_server;

}
exports.photo_server_create = function () {
    var photo_server = dgram.createSocket('udp4');
    photo_server.on('message', function (data, rinfo) {
        var getdata = JSON.parse(data);
        var newpath = path.dirname(getdata.url) + '/' + path.basename(getdata.url, path.extname(getdata.url)) + '(resized)' + path.extname(getdata.url);
        //doresize
        fs.renameSync(getdata.url, newpath);
        var jsonnewpath = JSON.stringify({
            'newpath': newpath
        })
        photo_server.send(jsonnewpath, 0, jsonnewpath.length, rinfo.port, rinfo.address);
    })
    photo_server.on('listening', function () {
        console.log('udp server listening!');
    })
    photo_server.bind(6001);

}