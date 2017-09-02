var expect=require('expect');
var {generateMessage,generateLocationMessage}=require('./message');

describe('generateMessage',() =>{
     it('should generate correct message object', ()=>{
         console.log('kll');
        var from='jen';
        var text='some message';
        var message=generateMessage(from,text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,text});
     });
});

describe('generateLocationMessage',() =>{
    it('should generate current location object',() => {
        var from ='deb';
        var latitude =15;
        var logitude =19;
        var url='https://www.google.com/maps?q=15,19';
        var message=generateLocationMessage(from,latitude,logitude);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,url});
    });
});