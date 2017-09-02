var socket= io();
socket.on('connect',function(){
    console.log('connected to server');
});

socket.on('disconnect',function(){
    console.log('disconnected from server');
});

//var li=jQuery('<li></li>');
var jq=jQuery('#messages');

socket.on('newLocationMessage',msg =>{
    console.log('current location',msg);
    var li=jQuery('<li></li>');
    var a=jQuery('<a target="_blank">My current location</a>');
    li.text(`${msg.from}:`);
    a.attr('href',msg.url);
    li.append(a);
    jq.append(li);
});



socket.on('newMessage',function (msg) {
    var li=jQuery('<li></li>');
    console.log('New Message',msg);
    li.text(`${msg.from}:${msg.text}`);
    jq.append(li);
});

jQuery('#message-form').on('submit',function (e){
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    },function () {
        //console.log('checked');
    });
});
var locationButton=jQuery('#send-location');
    locationButton.on('click',function () {
    if(!navigator.geolocation){
        return alert('geolocation not supported by browser');
    }
    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });
        },
        function () {
        alert('Unable to fetch location');
    });
});
