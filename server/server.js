const path=require('path');
const express=require('express');
const http=require('http');
const publicPath=path.join(__dirname,'../public');
const socketIO=require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const port=process.env.PORT || 3004;
var app=express();
var server=http.createServer(app);
app.use(express.static(publicPath));
var io=socketIO(server);
var count=1;

io.on('connection',(socket) =>{
   console.log(`New  user ${count++} Connected`);

    socket.emit('newMessage',generateMessage('Admin','welcome to group'));

    socket.broadcast.emit('newMessage',generateMessage('Admin','New user found'));

    socket.on('createMessage' ,(msg,callback) =>{
        console.log('New Message',msg);
        io.emit('newMessage',generateMessage(msg.from,msg.text));
        callback();
    });

    socket.on('join',(params,callback) => {
        if(!isRealString(params.name)||!isRealString(params.room)){
            callback('Name and Room name are required');
        }
            callback();
    });
    socket.on('createLocationMessage' ,(msg) =>{
        console.log('New Message',msg);
        io.emit('newLocationMessage',generateLocationMessage('Admin',msg.latitude,msg.longitude));
    });

    socket.on('disconnect',(socket) =>{
    console.log(`user ${--count} disconnected`);
    });
});
    server.listen(port,() => {
    console.log(`server is up to on ${port}`);
    });
