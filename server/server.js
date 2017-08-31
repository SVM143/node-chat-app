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

   socket.emit('newEmail',{
       from:'sourav.vikas6@gmail.com',
       text:'kya hal hai bhai'
    });
   socket.on('createEmail' ,(newEmail)=>{
        console.log('createMail',newEmail);
    });
     socket.on('disconnect',(socket) =>{
    console.log(`user ${--count} disconnected`);
  })
});
server.listen(port,() => {
    console.log(`server is up to on ${port}`);
});
//console.log(publicpath);