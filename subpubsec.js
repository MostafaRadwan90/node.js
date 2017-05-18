
var mqtt = require('/usr/local/bin/mqtt');

// Don't forget to update accessToken constant with your device access token
const thingsboardHost = "iot.eclipse.org";


console.log('Connecting to: %s using access token: %s', thingsboardHost);
var client  = mqtt.connect('mqtt://'+ thingsboardHost,"radwan","12345678");

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


var stdin = process.openStdin();

stdin.addListener("data", function(d) {
    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that  
    // with toString() and then trim() 
    console.log("you entered: [" + 
        d.toString().trim() + "]");
client.publish('radwan',d.toString().trim());
  })
