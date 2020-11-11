const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const citybikeurl = "http://api.citybik.es/v2/networks/decobike-miami-beach"



const port = process.env.PORT || 4001;
const index = require("./routes/index");
const app = express();


app.use(index);

const server = http.createServer(app);
const io = socketIo(server); // < Interesting!
let interval;

var options ={
  host:'api.citybik.es',
  port:80,
  path:'/v2/networks/decobike-miami-beach',
  method:'GET'
};
io.on("connection", socket => {
  var socketId = socket.id;
  var clientIp = socket.request.connection.remoteAddress;
  
  console.log('New connection ' + socketId + ' from ' + clientIp);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

http.request(options,function(res){
  var body='';
  res.on('data',function(chunk){
    body+=chunk;
  });
  res.on('end',function(){
    var price=JSON.parse(body);
    io.on('connect', onConnect);
    function onConnect(socket){
      console.log("Alguien se ha conectado con sockets");
      socket.emit('messages', price);
    };
    console.log(price)
  });
}).end();





server.listen(port, () => console.log(`Listening on port ${port}`));



