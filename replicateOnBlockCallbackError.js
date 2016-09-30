const Podium = require('podium');
const podiumObject = new Podium();

podiumObject.registerEvent('event1');
const listener1 = function() {
    console.log('listener1 called');
};

podiumObject.on('event1',listener1);

var arr= [0,1,2,3,4,4,5];

podiumObject.emit('event1',arr,function(err){
    if(err)
        console.log("in error");
    else
        console.log("callback returned true---:O");
});

/*
    2. When we are not sending data through emit(), the callback is getting displayed before the function logs.
*/