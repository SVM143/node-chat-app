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

var messageTextBox = jQuery('[name=message]');
jQuery('#message-form').on('submit',function (e){
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    },function () {
        messageTextBox.val('');
    });
});
var locationButton=jQuery('#send-location');
    locationButton.on('click',function () {
    if(!navigator.geolocation){
        return alert('geolocation not supported by browser');
    }
        locationButton.attr('disabled','disabled').text('Sending location....');
    navigator.geolocation.getCurrentPosition(function (position) {
            locationButton.removeAttr('disabled').text('Send location')
        console.log(position);
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });
        },
        function () {
            locationButton.removeAttr('disabled').text('Send location')
        alert('Unable to fetch location');
    });
});
