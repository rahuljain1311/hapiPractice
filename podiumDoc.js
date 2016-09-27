/**
 * Created by rahuljain on 9/18/16.
 */
const Podium = require('podium');

const podiumObject = new Podium(); // new emitter

//this works fine
// podiumObject.registerEvent({
//     name: 'event1'
// });

// this works for registering events
podiumObject.registerEvent('event1');

podiumObject.on('event1',function(update){
    console.log('inside autonomous listener without name! data:', update);
});

const listener1 = function() {
    console.log('listener1 called');
}

const listener2 = function(canAlsoRecieveArgsSentFromEmit) {
    console.log('listener2 called data:', canAlsoRecieveArgsSentFromEmit);
}

const listener3 = function(canAlsoRecieveArgsSentFromEmit) {
    console.log('listener3 called data:', canAlsoRecieveArgsSentFromEmit);
}

podiumObject.on('event1',listener1);

podiumObject.once('event1',listener2);

podiumObject.addListener('event1',listener3);

podiumObject.emit('event1','data sent by emit()');
podiumObject.emit('event1','only listener1 and listener3 and autonomous gets called');
podiumObject.removeListener('event1',listener1);
podiumObject.emit('event1','only autonomous listener and listener3 gets called');

if(podiumObject.hasListeners('event1')){
    console.log('this event has some listeners left');
}
else{
    console.log('this event has no listeners');
}

// podiumObject.removeAllListeners('event1');
podiumObject.emit('event1','no listener is called');

if(podiumObject.hasListeners('event1')){
    console.log('this event has some listeners left');
}
else{
    console.log('this event has no listeners');
}

//////////////////
console.log('new segment');

const podiumObject2 = new Podium(); // new emitter

podiumObject2.registerPodium(podiumObject);
podiumObject2.registerEvent('event2');

podiumObject2.on('event2',function () {
    console.log('event2 function');
});

podiumObject2.emit('event2');
podiumObject2.emit('event1');
console.log('here');
// podiumObject2.on('event1',listener1);
podiumObject.emit('event1');
podiumObject2.emit('event1');



