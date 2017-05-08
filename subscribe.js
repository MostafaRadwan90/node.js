var mqtt = require('/usr/local/bin/mqtt');

// Don't forget to update accessToken constant with your device access token
const thingsboardHost = "iot.eclipse.org";


console.log('Connecting to: %s using access token: %s', thingsboardHost);
var client  = mqtt.connect('mqtt://'+ thingsboardHost);

// to look every second  use  setInterval(sub, 1000)  , sub is fuction 



// what i learned here that you should donot sub and publish on same topic to avoid duplicate
client.subscribe('radwan1');
 

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString());
var recieved=message.toString() ;

if (recieved=='y')
{
client.publish('radwan',"i got it");
}


 // client.end(); i comment this to make listenning forever

});
