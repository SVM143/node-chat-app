var socket= io();
socket.on('connect',function(){
    console.log('connected to server');
});

socket.on('disconnect',function(){
    console.log('disconnected from server');
});

// socket.emit('createMessage',{
//     from:'sourav',
//     text:'sis'
// });

socket.on('newMessage',function (msg) {
    console.log('New Message',msg);
});
