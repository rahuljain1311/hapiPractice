const Podium = require('podium');

const podiumObject = new Podium(); // new emitter

//this works fine
podiumObject.registerEvent( [
    {
        name: 'event1',
        channels: ['ch1','ch2','ch3','ch4'],//done
        clone: true,
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

const listener1 = function(data) {
    console.log('listener1 called');
    console.log(data);
    data =55;
    // data.forEach(function (element,index) {
    //     console.log('a[' + index + '] = ' + element);
    // });
}


const listener2 = function(data) {
    console.log('listener2 called');
    console.log(data);
    data =55;
    // data.forEach(function (element,index) {
    //     console.log('a[' + index + '] = ' + element);
    // });
}

podiumObject.on({
    name: 'event1',// done
    block: true,
    channels: ['ch1'],
    clone:true,
    count: 2,//done
    filter: ['ch1'], // done
    spread: true,// done
    tags: true
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
    channel: 'ch2',
    tags: []
},arr,function(err){
    if(err){
        console.log("in error");
    }
    else{
        console.log("callback returned true---:O");
    }
});


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