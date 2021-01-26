#!/usr/bin/env node

/**
 * Module dependencies.
 */
var app = require('../app');
var debug = require('debug')('pratice:server');
var http = require('http');
var net=require('net');
var fs=require("fs");



/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
var talk_port=normalizePort(process.env.PORT || '6000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);


var talk_server=net.createServer(function (serversocket) {
  serversocket.setEncoding('utf8');
  console.log('a client in!');
  //socket 有读缓冲区和写缓冲区
//client data :{uname: , utarget: ,udata:}
  serversocket.on('data',function (data) {
    console.log('data: ',data);
    var getdata=JSON.parse(data);
    var getusername=getdata.uname||'';
    var getutarget=getdata.utarget||'';
    var getudata=getdata.udata||'';

    var recordmsgpath=path.join(__dirname,"../resource/live_data.txt");
    var global_datapath=path.join(__dirname,"../resource/global_data.json");
    var recordmsg=fs.readFileSync(recordmsgpath,'utf-8');
    var globaldata=JSON.parse(fs.readFileSync(global_datapath,'utf-8'));

    if(getutarget=='join'){
      if(!globaldata.onlineusers.some(nowusername=>{return nowusername==getusername})){
        globaldata.onlineusers.push(getusername);
        fs.writeFileSync(global_datapath,JSON.stringify(globaldata));
      }
      var senddata=JSON.stringify({
        'onlineusers':globaldata.onlineusers,
        'recordmsg':recordmsg
      });
      serversocket.write(senddata,function () {
        console.log('server join finish send');
      });

    }
    else if(getutarget=='speak'){
      var speakmsg=getusername+' : '+getudata+'\n';
      fs.writeFileSync(recordmsgpath,speakmsg,{flag:'a'});
      var newrecordmsg=fs.readFileSync(recordmsgpath,'utf-8');
      var senddata=JSON.stringify({
        'recordmsg':newrecordmsg
      });
      if(senddata!==undefined){
        serversocket.write(senddata,function () {
          console.log('server speak finish send');
        });
      }
    }
    else if(getutarget=='leave'){
      var usernameindex=globaldata.onlineusers.indexOf(getusername);
      globaldata.onlineusers.splice(usernameindex,1);
      fs.writeFileSync(global_datapath,JSON.stringify(globaldata));
    }



  })

  serversocket.on('end',function () {
    console.log('server disconneted');
  })



});

/**
 * Listen on provided port, on all network interfaces.
 */



server.listen(port);
talk_server.listen(talk_port,onListening);

server.on('error', onError);
server.on('listening', function () {
  console.log('talk_server on listening!');
});

function onrecivedata() {

}




/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}




