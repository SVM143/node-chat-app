var socket= io();
socket.on('connect',function(){
    console.log('connected to server');
});

socket.on('disconnect',function(){
    console.log('disconnected from server');
});

socket.emit('createMessage',{
   from:'Frank',
   text:'Hi'
   },function(data){
    console.log('got it',data);
});

socket.on('newMessage',function (msg) {
    console.log('New Message',msg);
    var li=jQuery('<li></li>');
    li.text(`${msg.from}:${msg.text}`);
    
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit',function (e){
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    },function () {
    });
});