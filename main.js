var net = require('net');
var fs = require('fs');
const scokets = [];
var server = net.createServer();
server.on('error', (err) => {
   throw err;
})
server.on('connection', (socket) => {
   scokets.push(socket);
   server.getConnections((err, count) => {
      console.log('Total connections  = ' + count);
   })
   socket.setEncoding('utf8');
   socket.on('end', function() {
      console.log('client disconnected');
   });
   socket.on('data', function(data) {
      for(let i = 0; i< scokets.length; i++) {
         if (scokets[i] === socket) {
            const userJson = JSON.parse(data);
            fs.writeFileSync('./noSql/' + userJson.uniqueId + '.json', data);
            console.log('asdas', require('./noSql/' + userJson.uniqueId + '.json'))
            scokets[i].write(data);
         }
      }
   });
})
server.listen(8080, function() { 
   console.log('server is listening');
});
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
   console.log('asdn,asmnd,m,sad', req);
   res.send('Cool');
})

server.listen(port, () => {
  console.log(`Server running at http://:${port}/`);
});