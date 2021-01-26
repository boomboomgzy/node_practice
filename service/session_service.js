
module.exports=function (req,res) {
    var cookies={};
    if(typeof req.headers.cookie!=='undefined'){
        req.headers.cookie.split(';').forEach(function (cookie) {
            var parts = cookie.split('=');
            cookies[parts[0].trim()]=(parts[1] || '').trim();
        })
    }
    else {
        cookies.sessionid=-1;
    }
    var currentsessionid = cookies.sessionid;
    var filepath = path.join(__dirname,'../resource/session.json');
    console.log('filepath: ',filepath);
    var sessions = fs.readFileSync(filepath);

    var sessionsdata=JSON.parse(sessions);
    var sessionbody={};
    if(typeof sessionsdata[currentsessionid]!='undefined'){
        sessionbody = sessionsdata[currentsessionid];    //单个session的数据->  sessionid:{expires:****},
        if(sessionbody.expires<Date()){
            delete sessionsdata[currentsessionid];
            return newsession(res);
        }
        else{
            var expiresdate=new Date();
            sessionbody.expires=expiresdate.setMinutes(expiresdate.getMinutes()+30);
            return sessionbody;
        }
    }
    else{
        return newsession(res);
    }
    function newsession(res) {
        var chars='0123456789abcdyfghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var sessionid='';
        for(let i=0;i<40;i++){
            var num=Math.floor(Math.random()*chars.length);
            sessionid+=chars[num];
        }
        if(typeof sessionsdata[sessionid]!=='undefined'){
            return newsession(res);
        }
        var expires= new Date();
        expires.setMinutes(expires.getMinutes()+30);
        var session={'expires':expires};
        sessionsdata[sessionid]=session;
        fs.writeFileSync(path.join(__dirname,'../resource/sessions.json'),JSON.stringify(sessionsdata));
        res.cookie("sessionid",sessionid,{maxAge:1800,httpOnly:true});
    }


}