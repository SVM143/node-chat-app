var socket= io();
socket.on('connect',function(){
    console.log('connected to server');

    socket.emit('createMessage',{
        from:'client',
        msg:'hi Whats up Server'
    });
});

socket.on('disconnect',function(){
    console.log('disconnected from server');
});

socket.on('createMessage',function (msg) {
    console.log('New Message',msg);
});
