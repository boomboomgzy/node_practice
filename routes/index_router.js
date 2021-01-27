var express = require('express');
var router = express.Router();
var http = require('http'),
    dns = require('dns'),
    fs = require('fs'),
    url = require('url'),
    querystring = require('querystring'),
    util = require('util'),
    path = require('path')
var session_service=require('../service/session_service');



router.get('/login', function(req, res, next) {
    session_service(req,res);
    var globaldata=require('../resource/data.json');
    var username=req.body['username'];
    if(!globaldata.onlineuser.some(nowuser => nowuser==username)){
        globaldata.onlineuser.add(username);
    }
    res.end();
});

router.post('/input',function (req,res,next){

})

//function dealencoding(req,res){
//    var crypto=require('crypto')
//        ,text='gaozhenyu';
//    const iv = crypto.randomBytes(16);
//    const key = crypto.randomBytes(32);
//    console.log('iv: ',iv);
//        var cipher=crypto.createCipheriv('aes-256-cbc',key,iv);
//        var decipher=crypto.createDecipheriv('aes-256-cbc',key,iv);
//    cipher.update(text,'utf8','hex');
//    var encryptedtext=cipher.final('hex');
//    console.log('encryptedtext: ',encryptedtext);
//    decipher.update(encryptedtext,'hex','utf8');
//    var decryptedtext=decipher.final('utf8');
//    console.log('decryptedtext: ',decryptedtext);
//
// //   var hmac=crypto.createHmac("md5","gzy");
// //   hmac.update("gaozhenyu");//加密
// //   var encode=hmac.digest();//得到加密后的内容，调用后hash会清空
// //   console.log(encode);
// //
//}

////function dealsession(res,req){
//    var cookies={};
//    if(typeof req.headers.cookie!=='undefined'){
//        req.headers.cookie.split(';').forEach(function (cookie) {
//            var parts = cookie.split('=');
//            cookies[parts[0].trim()]=(parts[1] || '').trim();
//        })
//    }
//    else {
//        cookies.sessionid=-1;
//    }
//    var currentsessionid = cookies.sessionid;
//    var filepath = path.join(__dirname,'../resource/sessions.json');
//    console.log('filepath: ',filepath);
//    var sessions = fs.readFileSync(filepath);
//
//    var sessionsdata=JSON.parse(sessions);
//    var sessionbody={};
//    if(typeof sessionsdata[currentsessionid]!='undefined'){
//        sessionbody = sessionsdata[currentsessionid];    //单个session的数据->  sessionid:{expires:****},
//        if(sessionbody.expires<Date()){
//            delete sessionsdata[currentsessionid];
//            return newsession(res);
//        }
//        else{
//            var expiresdate=new Date();
//            sessionbody.expires=expiresdate.setMinutes(expiresdate.getMinutes()+30);
//            return sessionbody;
//        }
//    }
//    else{
//        return newsession(res);
//    }
//    function newsession(res) {
//        var chars='0123456789abcdyfghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
//        var sessionid='';
//        for(let i=0;i<40;i++){
//            var num=Math.floor(Math.random()*chars.length);
//            sessionid+=chars[num];
//        }
//        if(typeof sessionsdata[sessionid]!=='undefined'){
//            return newsession(res);
//        }
//        var expires= new Date();
//        expires.setMinutes(expires.getMinutes()+30);
//        var session={'expires':expires};
//        sessionsdata[sessionid]=session;
//        fs.writeFileSync(path.join(__dirname,'../resource/sessions.json'),JSON.stringify(sessionsdata));
//    }
//
//}
//


//function dealstatic(path,realpath,res,req){
//        if(!fs.existsSync(realpath)){
//            res.writeHead(404,{'Content-Type:':'text/plain'});
//            res.write('Not Found!');
//            res.end();
//        }
//        else {
//            var fileinfo = fs.statSync(realpath);
//            var lastmodified = fileinfo.mtime.toUTCString();
//            var date = new Date();
//            date.setTime(date.getTime() + 60 * 60 * 24 * 365 * 1000);
//            res.setHeader("Expires", date.toUTCString());
//            if (req.headers['if-modified-since'] && lastmodified == req.headers['if-modified-since']) {
//                res.writeHead(304, 'Not modified!');
//                res.end();
//            } else {
//                var pointindex = path.lastIndexOf('.');
//                minestring = path.substring(pointindex + 1);
//                switch (minestring) {
//                    case 'jpg':
//                        mineType = 'image/jpg';
//                        break;
//                }
//                fs.readFile(realpath, 'binary', function (err, file) {
//                    if (err) {
//                        res.writeHead(500, {'Content-Type': 'text/plain'});
//                        res.end();
//                    } else {
//                        res.setHeader('Last-Modified',lastmodified);
//                        res.writeHead(200, {'Content-Type': mineType});
//                        res.write(file, 'binary');
//                        res.end();
//
//                    }
//                })
//            }
//        }
//    }
//function resolvedns(getdns,callback){
//
//    dns.resolve(getdns,function (err,address) {
//        if(!address){
//            address=['resolve failed!'];
//        }
//        callback(address);
//    })
//
//}
//


module.exports = router;


//function getFileData(callback) {
//  fs.readFile('/tmp/gzy.txt','utf-8',function (err,data) {
//    callback(data);
//  })
//}

//function returnData(callback) {
//  getFileData(function (data) {
//    setTimeout(function () {
//      callback(data);
//    },1000);
//
//  })
//}


