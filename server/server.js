const path=require('path');
const express=require('express');
const http=require('http');
const publicPath=path.join(__dirname,'../public');
const socketIO=require('socket.io');
const port=process.env.PORT || 3000;
var app=express();
var server=http.createServer(app);
app.use(express.static(publicPath));
var io=socketIO(server);
var count=1;

io.on('connection',(socket) =>{
   console.log(`New  user ${count++} Connected`);

   socket.emit('createMessage',{
       from:'Server',
       text:'kya hal hai bhai'
    });
   socket.on('createMessage' ,(msg)=>{
        console.log('New Message',msg);
    });
     socket.on('disconnect',(socket) =>{
    console.log(`user ${--count} disconnected`);
  })
});
server.listen(port,() => {
    console.log(`server is up to on ${port}`);
});
//console.log(publicpath);