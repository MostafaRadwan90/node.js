var mqtt = require('mqtt');

// Don't forget to update accessToken constant with your device access token
const thingsboardHost = "iot.eclipse.org";
// const accessToken = "9iVW44sUFyFjonL2xavX";
const minTemperature = 17.5, maxTemperature = 30, minHumidity = 12, maxHumidity = 90;

// Initialization of temperature and humidity data with random values
var data = {
    temperature: minTemperature + (maxTemperature - minTemperature) * Math.random() ,
    humidity: minHumidity + (maxHumidity - minHumidity) * Math.random()
};

// Initialization of mqtt client using Thingsboard host and device access token
console.log('Connecting to: %s using access token: %s', thingsboardHost);
var client  = mqtt.connect('mqtt://'+ thingsboardHost);

// Triggers when client is successfully connected to the Thingsboard server
client.on('connect', function () {
    console.log('Client connected!');
    // Uploads firmware version and serial number as device attributes using 'v1/devices/me/attributes' MQTT topic
    client.publish('radwan', JSON.stringify({"firmware_version":"1.0.1", "serial_number":"SN-001"}));
    // Schedules telemetry data upload once per second
    console.log('Uploading temperature and humidity data once per second...');
    setInterval(publishTelemetry, 1000);
});
/*
// radwan edit to get the recive
client.subscribe('radwan');
 
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString());
  client.end();
});  */
 

// Uploads telemetry data using 'v1/devices/me/telemetry' MQTT topic
function publishTelemetry() {
    data.temperature = genNextValue(data.temperature, minTemperature, maxTemperature);
    data.humidity = genNextValue(data.humidity, minHumidity, maxHumidity);
    client.publish('radwan', JSON.stringify(data));
}

// Generates new random value that is within 3% range from previous value
function genNextValue(prevValue, min, max) {
    var value = prevValue + ((max - min) * (Math.random() - 0.5)) * 0.03;
    value = Math.max(min, Math.min(max, value));
    return Math.round(value * 10) / 10;
}

//Catches ctrl+c event
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

