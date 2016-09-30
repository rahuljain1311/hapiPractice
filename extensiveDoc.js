const Podium = require('podium');

const podiumObject = new Podium(); // new emitter

//this works fine
podiumObject.registerEvent( [
    {
        name: 'event1',
        channels: ['ch1','ch2','ch3','ch4'],//done
        // clone: true, //done
        // spread: true,//done if true we need to take values in different variables in on()
        tags: true,// works with filter
        shared: true//done
    }
    // , will see this later :P
    // {
    //     name: 'event1',
    //     channels: ['ch3','ch4'],
    //     // clone: true,
    //     spread: true,
    //     tags: true,
    //     shared: true
    // }
]);
const listener1 =(data,next) => {
    console.log('listener1 called');
    console.log(data);
    // setTimeout(function() {console.log("done running")},1000); // with block = true, as soon as this timeout finishes the callback will be called
    next()
};

const listener2 = function(data) {
    console.log('listener2 called');
    console.log(data);
    data [1] = 55;
    console.log(data);
};

podiumObject.on({
    name: 'event1',// done
    // block: true, // if true then listener will receive a callback function and it has to call that
    // to mark the completion of the listener, if value then after this value(milliseconds) the normal callback of emit will be called
    // next() error not working now
    channels: ['ch1'], // done
    // clone:true,   //done... this defaults to clone of registerEvent
    // count: 2,//done
    // filter: ['ch1'] // done
    // spread: true,// done
    // tags: true
},listener1);

podiumObject.on({
    name: 'event1',
    channels: ['ch3', 'ch4']
},listener2);


podiumObject.on({name: 'event1',channels: 'ch2'},(data)=>{
    console.log("asdf");
    console.log(data);
})

var arr= [0,1,2,3,4,4,5];

podiumObject.emit({
    name: 'event1',
    channel: 'ch3'
    // tags: []
},arr,function(err){
    if(err){
        console.log("in error");
    }
    else{
        console.log("callback returned true---:O");
    }
});
console.log(arr);

// const emitter = new Podium(['a', 'b']);
//
// const updates = [];
//
// const aHandler = (data, next) => {
//
//     updates.push({ a: data, id: 1 });
//     next()
// };
//
// emitter.on({ name: 'a', block: true }, aHandler);
//
// const bHandler = (data) => {
//
//     updates.push({ b: data, id: 1 });
// };
//
// emitter.on('b', bHandler);
//
// emitter.emit('a', 1, () => updates.push('a done'));
// emitter.emit('b', 1, () => {
//
//     console.log(updates);
// });



// // filter-tag example
// const emitter = new Podium('test');
//
// const updates = [];
// emitter.on('test', (data) => updates.push({ id: 1, data }));
// emitter.on({ name: 'test', filter: ['a', 'b'] }, (data) => updates.push({ id: 2, data }));
// emitter.on({ name: 'test', filter: 'b' }, (data) => updates.push({ id: 3, data }));
// emitter.on({ name: 'test', filter: ['c'] }, (data) => updates.push({ id: 4, data }));
// emitter.on({ name: 'test', filter: { tags: ['a', 'b'], all: true } }, (data) => updates.push({ id: 5, data }));
//
// emitter.emit({ name: 'test', tags: 'a' }, 1);
// emitter.emit({ name: 'test', tags: ['b'] }, 2);
// emitter.emit({ name: 'test', tags: ['d'] }, 3);
// emitter.emit({ name: 'test', tags: ['a'] }, 4);
// emitter.emit({ name: 'test', tags: ['a', 'b'] }, 5);
// emitter.emit('test', 6, () => {
//
//     console.log(updates);
//
//     // expect(updates).to.equal([
//     //     { id: 1, data: 1 },
//     //     { id: 2, data: 1 },
//     //     { id: 1, data: 2 },
//     //     { id: 2, data: 2 },
//     //     { id: 3, data: 2 },
//     //     { id: 1, data: 3 },
//     //     { id: 1, data: 4 },
//     //     { id: 2, data: 4 },
//     //     { id: 1, data: 5 },
//     //     { id: 2, data: 5 },
//     //     { id: 3, data: 5 },
//     //     { id: 5, data: 5 },
//     //     { id: 1, data: 6 }
//     // ]);
//
//     // done();
// });