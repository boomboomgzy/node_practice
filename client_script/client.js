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

var senddata=JSON.stringify({
  	'uname':'gzy',
  	'utarget':'join',
  	'udata':null
  });
 client.write(senddata);


senddata=JSON.stringify({
  	'uname':'gzy',
  	'utarget':'speak',
  	'udata':'aklsdjaljd'
  });
 client.write(senddata);
 console.log('senddata1:',senddata);

senddata=JSON.stringify({
    'uname':'gzy',
    'utarget':'leave',
    'udata':null
  });
console.log('senddata2:',senddata);
 client.write(senddata);



//server data :{data:}