const readline = require('readline');
const fs = require('fs');
var mqtt = require('mqtt');

// Don't forget to update accessToken constant with your device access token
const thingsboardHost = "m12.cloudmqtt.com";



console.log('Connecting to: %s using access token: %s', thingsboardHost);
var client  = mqtt.connect('mqtt://'+ thingsboardHost,{
username:'Mostafa.Radwan',
password:'024927138',
port:'12093'
 });
// Triggers when client is successfully connected to the Thingsboard server
client.on('connect', function () {
    console.log('Client connected!');
    console.log('uploading tweets');
});
const rl = readline.createInterface({
    input: fs.createReadStream(process.cwd() + '/sample.txt')
});

var queue = [];

setInterval(function () {
    if (queue.length > 0) {
        var item = queue.shift();
        console.log(item);
        client.publish('radwan', item);
    }
}, 90000);


rl.on('line', function(input) {
    queue.push(input);
});

process.on('SIGINT', function () {
    console.log();
    console.log('Disconnecting...');
    client.end();
    console.log('Exited!');
    process.exit(2);
});

//Catches uncaught exceptions
process.on('uncaughtException', function(e) {
    console.log('Uncaught Exception...');
    console.log(e.stack);
    process.exit(99);
});
