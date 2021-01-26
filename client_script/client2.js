var net = require('net');
var client = net.connect({port: 6000},
    function() { //'connect' listener
  console.log('connected to server!');
  console.log(client.localPort);
  client.setEncoding('utf8');
  
  client.on('data', function(data) {
  console.log(data);
});

  client.on('end', function() {
  console.log('disconnected from server');
});


});

/*var senddata=JSON.stringify({
  	'uname':'hj',
  	'utarget':'join',
  	'udata':null
  });
 client.write(senddata,function(){
  console.log('client finish send');
 });

 senddata=JSON.stringify({
    'uname':'hj',
    'utarget':'speak',
    'udata':'fuck you'
  });
 client.write(senddata,function(){
  console.log('client finish send');
 });
*/

var senddata=JSON.stringify({
    'uname':'gzy',
    'utarget':'leave',
    'udata':null
  });
 client.write(senddata);


//server data :{data:}