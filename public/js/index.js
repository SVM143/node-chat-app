var socket= io();
socket.on('connect',function(){
    console.log('connected to server');

    socket.emit('createEmail',{
       Email:'vikas.4@gmail.com',
       type:'thik hooon aur tera hal bata'
    });
});

socket.on('disconnect',function(){
    console.log('disconnected from server');
});

socket.on('newEmail',function (email) {
    console.log('New Email',email);
})