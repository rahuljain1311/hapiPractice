/**
 * Created by rahuljain on 9/18/16.
 */
const Podium = require('podium');
const source1 = new Podium('test');
const source2 = new Podium('test');

const emitter = new Podium(source1);
emitter.registerPodium(source2);

emitter.on('test', function(data){
console.log('test',data);
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

emitter.on('test',listener1);
emitter.on('test',listener2);
source1.on('test',listener3);

source1.emit('test', 1);
console.log("hi");
source2.emit('test', 2);
console.log("hi2");
emitter.emit('test', 2);

// basically test is an event and we are registering function on that event..... whenever we call that event it will
// call all the functions associated with it!
// emmitter p kuch bhi register hoga to vo source1 aur source2 pe automatically register ho jaenge but source1/source2 p
// register karenge to vo nai hoge