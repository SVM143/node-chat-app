var generateMessage=(from,text)=>{
    //console.log('lk');
    return{
        from,
        text,
        createdAt:new Date().getTime()
    };
};

module.exports={generateMessage};