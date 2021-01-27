var fs = require('fs'),
    multer = require('multer'),
    dgram = require('dgram')

exports.photo_upload = function (req, res, next) {
    var files = req.files;

    var imageinfo = {
        'weight': req.body.weight,
        'height': req.body.height,
        'url': files[0].path
    }
    var jsonImageInfo = JSON.stringify(imageinfo);
    var client = dgram.createSocket("udp4");

    var msg = new Buffer(jsonImageInfo);

    client.send(msg, 0, msg.length, 6001, '127.0.0.1');
    client.on('message', function (data, rinfo) {
        var getdata = JSON.parse(data);
        console.log('resizephoto_path: ', getdata.newpath);
        res.writeHead(200);
        res.end();
    })


}

