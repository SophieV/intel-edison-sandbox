var express = require('express');
var app = express();
// Import the MRAA module
var mraa = require('mraa');

var getLocalIP = function getLocalIP() {
  return  new Promise(function(resolve, reject) {
    require('dns').lookup(require('os').hostname() + '.local', function (err, add, fam) {
      console.log(add);
      resolve(add);
    });
});
}

app.use(express.static(__dirname+'/files'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/api/test', (req, res) => {
    getLocalIP().then((ipAddr) => {
    res.send(ipAddr);
 });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
  
//   // Set up a digital input/output on MRAA pin 36 (GP14)
// var buttonPin = new mraa.Gpio(36);
// var buttonPin2 = new mraa.Gpio(48);
// 
// // Set that pin as a digital input (read)
// buttonPin.dir(mraa.DIR_IN);
// buttonPin2.dir(mraa.DIR_IN);
// 
// // Call the periodicActivity function
// periodicActivity();
// 
// // This function is called forever (due to the setTimeout() function)
// function periodicActivity() {
// 
//     // Read the value of the pin and print it to the screen
//     var val = buttonPin.read();
//     console.log('Button is ' + val);
// 
//     var val2 = buttonPin2.read();
//     console.log('Button2 is ' + val2);
// 
//     // Wait for 250 ms and call this function again
//     setTimeout(periodicActivity, 250);
// }

// Set up a digital input/output on MRAA pin 36 (GP14)
var buttonPin = new mraa.Gpio(36);
var buttonPin2 = new mraa.Gpio(48);

// Set that pin as a digital input (read)
buttonPin.dir(mraa.DIR_IN);
buttonPin2.dir(mraa.DIR_IN);

// Global counter
var num = 0;

// Our interrupt service routine - seems to not be working if with parameter
function serviceRoutine() {
    num++;
    console.log("BEEP " + num);
}

function serviceRoutine2() {
    num++;
    console.log("BOOP " + num);
}

// Assign the ISR function to the button push
buttonPin.isr(mraa.EDGE_FALLING, serviceRoutine);
buttonPin2.isr(mraa.EDGE_RISING, serviceRoutine2);

// Do nothing while we wait for the ISR
periodicActivity();
function periodicActivity() {
    setTimeout(periodicActivity, 2000);
}

});