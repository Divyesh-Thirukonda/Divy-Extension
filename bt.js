
function doSomething (lat, long) {
    console.log(lat, long);
}
// navigator.geolocation.getCurrentPosition((position) => {
//     doSomething(position.coords.latitude, position.coords.longitude);
//   });
//******************* THE FOLLOW DOES SMTH IMPORTART SO UNHIGHLIGHT IF U WANNA SEE A MAGIC TRICK IN THE CONSOLE */
// const watchID = navigator.geolocation.watchPosition((position) => {
//     doSomething(position.coords.latitude, position.coords.longitude);
//   });
//******************* END OF SMTH COOL */

// Define variables to store keystrokes and the maximum number of keystrokes to collect
const maxKeystrokes = 9; // Adjust this to your desired number of keystrokes
let keystrokes = [];

// Add an event listener to capture keypress events
document.addEventListener("keydown", function(event) {
  // Check if the event represents a character key (not a special key like Shift, Enter, etc.)
  if (event.key.length === 1) {
    // Add the key to the keystrokes array
    keystrokes.push(event.key);
    
    // Trim the array to store only the last n keystrokes
    if (keystrokes.length > maxKeystrokes) {
      keystrokes = keystrokes.slice(-maxKeystrokes);
    }
    
    // You can do something with the collected keystrokes here, like updating the UI
    if (keystrokes.join("") == "/fullnamr") {
      simulateTyping("Divyesh Thirukonda Gowri Shanka");
    }
    // document.activeElement.value = document.activeElement.value.replace(new RegExp("Shankare", "g"), "Shankar");
  }
});


function simulateTyping(textToType) {
  // Type a certain string
  document.activeElement.value = document.activeElement.value.replace(new RegExp("/fullnam", "g"), "");
  document.activeElement.value += textToType;
  document.activeElement.dispatchEvent(new Event('input', { bubbles: true }));
}


// async function connectToBluetoothDevice(device) {
//     try {
//         const server = await device.gatt.connect();
//         const batteryService = await server.getPrimaryService('battery_service');
//         const batteryLevelCharacteristic = await batteryService.getCharacteristic('battery_level');
        
//         // Read the battery level value
//         const batteryLevelValue = await batteryLevelCharacteristic.readValue();
        
//         // Display the battery level
//         document.getElementById('batteryLevel').textContent = `Battery Level: ${batteryLevelValue.getUint8(0)}%`;
//     } catch (error) {
//         console.error('Error connecting to Bluetooth device:', error);
//     }
// }


// JavaScript
// document.getElementById('discoverButton').addEventListener('click', async () => {

//     let options = {
//         filters: [
//           { services: ["heart_rate"] },
//           { services: [0x1802, 0x1803] },
//           { services: ["c48e6067-5295-48d3-8d5c-0395f61792b1"] },
//           { name: "ExampleName" },
//           { namePrefix: "Prefix" },
//         ],
//         optionalServices: ["battery_service"],
//       };
      
//       navigator.bluetooth
//         .requestDevice(options)
//         .then((device) => {
//           console.log(`Name: ${device.name}`);
//           // Do something with the device.
//         })
//         .catch((error) => console.error(`Something went wrong. ${error}`));

//         // try {
//         //     const device = await navigator.bluetooth.requestDevice({
//         //       // Bluetooth device options
//         //     });
//         //     // Handle the discovered device here
//         //   } catch (error) {
//         //     console.error('Bluetooth device request failed:', error);
//         //   }
        
// });

// async function updateDeviceList() {
//     const deviceList = document.getElementById('deviceList');
//     deviceList.innerHTML = '';

    

//     navigator.bluetooth.getAvailability().then((available) => {
//         if (available) {
//           console.log(available);
//         } else {
//           console.log("Bluetooth not supported");
//         }
//       });


//     // try {
//     //     const devices = await window.navigator.bluetooth.getDevices();
//     //     devices.forEach(device => {
//     //         const listItem = document.createElement('li');
//     //         listItem.textContent = device.name || 'Unnamed Device';
//     //         listItem.addEventListener('click', () => connectToBluetoothDevice(device));
//     //         deviceList.appendChild(listItem);
//     //     });
//     // } catch (error) {
//     //     console.error('Error fetching Bluetooth devices:', error);
//     // }
// }

// Initialize the app by updating the device list
// updateDeviceList();