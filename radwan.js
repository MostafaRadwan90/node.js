var mqtt = require('/usr/local/bin/mqtt');
var client  = mqtt.connect('mqtt://iot.eclipse.org')

client.on('connect', function () {
  client.subscribe('radwan')
  client.publish('radwan', 'Hello mqtt yahoo')
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})
