
const readline = require('readline');
var mqtt = require('mqtt');

// Don't forget to update accessToken constant with your device access token
const thingsboardHost = "m12.cloudmqtt.com";
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream(process.cwd() +'/sample.txt')  // process.cwd return my current directoey 
});

console.log('Connecting to: %s using access token: %s', thingsboardHost);
var client  = mqtt.connect('mqtt://'+ thingsboardHost,{
username:'Mostafa.Radwan',
password:'024927138',
port:'12093'
 });
// Triggers when client is successfully connected to the Thingsboard server
client.on('connect', function () {
    console.log('Client connected!');
    // Uploads firmware version and serial number as device attributes using 'v1/devices/me/attributes' MQTT topic
  //  client.publish('radwan', JSON.stringify({"firmware_version":"1.0.1", "serial_number":"SN-001"}));
    // Schedules telemetry data upload once per second
    console.log('uploading tweets');
    setInterval(publishTelemetry, 10000);
});

rl.on('line', (line) => {
  console.log(`Line from file: ${line}`);
    client.publish('radwan', ${line}.toString().trim());
  //publishTelemetry(${line}.toString())
});

function publishTelemetry() {
    
    client.publish('radwan', line.toString().trim());
}


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

