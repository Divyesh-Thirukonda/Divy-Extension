// ***********************  CALENDAR WIDGET  *********************** //
function formatTimestamp(timestamp) {
  const dateObj = new Date(timestamp);

  const hoursStart = dateObj.getHours();
  const minutesStart = dateObj.getMinutes();

  // Convert hours to 12-hour format and determine AM/PM
  const formattedHoursStart = hoursStart % 12 || 12;
  const periodStart = hoursStart < 12 ? 'AM' : 'PM';

  // Add leading zero for minutes
  const formattedMinutesStart = minutesStart < 10 ? '0' + minutesStart : minutesStart;

  // Calculate end time (add 1 hour)
  const dateObjEnd = new Date(dateObj.getTime() + 60 * 60 * 1000);
  const hoursEnd = dateObjEnd.getHours();
  const minutesEnd = dateObjEnd.getMinutes();

  // Convert hours to 12-hour format and determine AM/PM
  const formattedHoursEnd = hoursEnd % 12 || 12;
  const periodEnd = hoursEnd < 12 ? 'AM' : 'PM';

  // Add leading zero for minutes
  const formattedMinutesEnd = minutesEnd < 10 ? '0' + minutesEnd : minutesEnd;

  // Construct the formatted time string
  const formattedTime = `${formattedHoursStart}:${formattedMinutesStart} ${periodStart} - ${formattedHoursEnd}:${formattedMinutesEnd} ${periodEnd}`;

  return formattedTime;
}
function getDayAbbreviation(dayIndex) {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return daysOfWeek[dayIndex];
}

var eventDayOfWeekAbbrv = "";

var script = document.createElement('script');
script.src = '';

const urlCAL = script.src;
fetch(urlCAL)
  .then(response => response.json())
  .then(jsonData => {
    console.log(jsonData);
    const calendarContainer = document.querySelector('.calendar');
    var myCalCounter = 0;
    for (var eventID in jsonData) {
      if (myCalCounter==0) {
        retNextTaskArduino = jsonData[eventID].title;
      }
      myCalCounter++;
      var eventDetails = jsonData[eventID];
      eventDayOfWeekRaw = new Date(eventDetails.startTime);

      if (eventDayOfWeekAbbrv != getDayAbbreviation(eventDayOfWeekRaw.getDay())) {
        var dayOfWeekElem = document.createElement("div");
        dayOfWeekElem.className = "dayOfWeekName";
        dayOfWeekElem.textContent = getDayAbbreviation(eventDayOfWeekRaw.getDay());
        calendarContainer.appendChild(dayOfWeekElem);
      }
      eventDayOfWeekAbbrv = getDayAbbreviation(eventDayOfWeekRaw.getDay());

      var timeSlotDiv = document.createElement("div");
      timeSlotDiv.className = "time-slot";
      timeSlotDiv.textContent = formatTimestamp(eventDetails.startTime);
      var activityDiv = document.createElement("div");
      activityDiv.className = "activity"
      var verticalCapsuleDiv = document.createElement("div");
      verticalCapsuleDiv.className = "vertical-capsule";


      if (eventDetails.color === "") {
        // Empty string, assume color 1
        var colorClass = "color-1";
        verticalCapsuleDiv.classList.add(colorClass);
      } else {
        // Non-empty string, use color based on the color number
        var colorClass = "color-" + eventDetails.color;
        verticalCapsuleDiv.classList.add(colorClass);
      }

      if (eventDetails.location != "") {
        timeSlotDiv.textContent += " @ " + eventDetails.location;
      }

      calendarContainer.appendChild(timeSlotDiv);
      activityDiv.appendChild(verticalCapsuleDiv);
      activityDiv.appendChild(document.createTextNode(eventDetails.title));
      calendarContainer.appendChild(activityDiv);
    }
  })
  .catch(error => console.error(`Failed to fetch data: ${error.message}`));







// ***********************  SPOTIFY WIDGET  *********************** //

function getCodeFromUrl(url) {
  if (url.indexOf('?') !== -1) {
      const queryString = url.split('?')[1];
      const queryParams = queryString.split('&');
      for (let i = 0; i < queryParams.length; i++) {
          const param = queryParams[i].split('=');
          if (param[0] === 'code') {
              return param[1];
          }
      }
  }
  return null;
}
const CLISEC = "[YOUR CLIENT SECRET]";
const CLIID = "[YOUR CLIENT ID]";
var redirect_uri = 'chrome-extension://ikjipnaemppnjilpbjjoeppflicchhld/newertab.html';

var finalCode = "";
if ((window.location.href).startsWith("chrome-extension://ikjipnaemppnjilpbjjoeppflicchhld/newertab.html?code=")) {
  finalCode = getCodeFromUrl(window.location.href);
  localStorage.setItem("myCode", finalCode);
} else {
  finalCode = localStorage.getItem("myCode");
}


var authOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(CLIID + ':' + CLISEC)
  },
  body: 'code=' + encodeURIComponent(finalCode) +
    '&redirect_uri=' + encodeURIComponent(redirect_uri) +
    '&grant_type=authorization_code'
};

fetch('https://accounts.spotify.com/api/token', authOptions)
.then(response => response.json())
.then(data => {
  console.log(data);
  if(data.error != "invalid_grant") {
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
  }
})
.catch(error => {
  console.error('Error:', error);
});

var retNextTaskArduino = "";

let port;
async function connect() {
  var retWeather = "";
  const currentTime = new Date();
  const retTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  const retDate = currentTime.toLocaleDateString(undefined, options);
  


  navigator.geolocation.getCurrentPosition(function (position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // Call the OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5e5cbad51669771e81f86a942df275dd&units=imperial`)
      .then(response => response.json())
      .then(data => {
        // Extract relevant weather information
        const weatherKind = data.weather[0].main;
        const city = data.name;
        const tempHigh = data.main.temp_max;
        const tempLow = data.main.temp_min;
        const temp = data.main.temp;

        retWeather = `${temp}F in ${city}`;
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  });


  try {
    port = await navigator.serial.requestPort({ baudRate: 9600 });
    console.log(retWeather);
    console.log(retTime);
    console.log(retDate);
    console.log(retNextTaskArduino);
    await port.open({ baudRate: 9600 });
    if (port) {
      const writer = port.writable.getWriter();
      console.log(writer);
      const data = new TextEncoder().encode(songTitle+"`"+songArtist+"/"+retTime+"@"+retDate+"^"+retWeather+"*"+retNextTaskArduino+" ");
      await writer.write(data);
      writer.releaseLock();
    }
  } catch (error) {
    console.error('Error connecting to serial port:', error);
  }
}

const connectButton = document.getElementById('connectButton');
connectButton.addEventListener('click', connect);

var songTitle = "";
var songArtist = "";
var songImgURL = "";

fetch('https://api.spotify.com/v1/me/player/currently-playing', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
  }
})
.then(newresponse => newresponse.json())
.then(newdata => {
  songTitle = (newdata.item.name);
  songArtist = (newdata.item.artists[0].name);
  songImgURL = (newdata.item.album.images[0].url);

  title = document.querySelector('.spotifyTitle');
  title.textContent = songTitle;
  
  title = document.querySelector('.spotifyArtist');
  title.textContent = songArtist;

  
  console.log(songImgURL);
  spotifySquareElement = document.querySelector('.spotifySquare');
  spotifySquareElement.style.background = `url("${songImgURL}") center/cover no-repeat`;
  spotifySource = document.querySelector('.sourceImage');
  spotifySource.src = songImgURL;
})
.catch(error => {
  console.error('Error fetching currently playing track:', error);
});


const getRefreshToken = async () => {
  const url = "https://accounts.spotify.com/api/token";
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: localStorage.getItem('refresh_token'),
      client_id: CLIID
    }),
  }

  const myAns = await fetch(url, payload);
  const response = await myAns.json();
  

  console.log(response);
  localStorage.setItem('access_token', response.access_token);
  localStorage.setItem('refresh_token', response.refresh_token);
}



// ***********************  GET TINT COLOR  *********************** //

var myTINT = "";

const img = document.querySelector('.sourceImage');
img.crossOrigin = 'Anonymous';
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// When the image is loaded, calculate the average RGB values
img.onload = function() {
  console.log("U");    
    // Draw the image on the canvas
    context.drawImage(img, 0, 0, img.width, img.height);

    // Get the image data
    var imageData = context.getImageData(0, 0, img.width, img.height).data;
    
    var yellow = 0;
    var purple = 0;
    var cyan = 0;
    var blue = 0;
    var red = 0;
    var green = 0;

    // Loop through each pixel and accumulate RGB values
    for (var i = 0; i < imageData.length; i += 4) {
      pixR = imageData[i];     // Red channel
      pixG = imageData[i + 1]; // Green channel
      pixB = imageData[i + 2]; // Blue channel

      majR = pixR > 170;
      majG = pixG > 170;
      majB = pixB > 170;

      if (majR && majG && !majB) {
        yellow++;
      } else if (majR && majB && !majG) {
        purple++;
      } else if (majB && majG && !majR) {
        cyan++;
      } else if (majB && !majG && !majR) {
        blue++;
      } else if (majR && !majB && !majG) {
        red++;
      } else if (majG && !majR && !majB) {
        green++;
      }
      
    }

    const colors = [
      { name: 'yellow', value: yellow },
      { name: 'purple', value: purple },
      { name: 'cyan', value: cyan },
      { name: 'blue', value: blue },
      { name: 'red', value: red },
      { name: 'green', value: green },
    ];
  
    // Find the object with the maximum value
    const maxColor = colors.reduce((max, color) => (color.value > max.value ? color : max), colors[0]);
    myTINT = maxColor.name;
    var targCol = "";
    if (myTINT == 'green') {
      targCol = "rgba(17, 200, 0, 0.15)";
    }
    if (myTINT == 'blue') {
      targCol = "rgba(13, 0, 200, 0.15)";
    }
    if (myTINT == 'cyan') {
      targCol = "rgba(0, 177, 200, 0.15)";
    }
    if (myTINT == 'purple') {
      targCol = "rgba(93, 0, 200, 0.15)";
    }
    if (myTINT == 'yellow') {
      targCol = "rgba(187, 200, 0, 0.15)";
    }
    if (myTINT == 'red') {
      targCol = "rgba(200, 0, 0, 0.15)";
    }

    if (document.querySelector('.sourceImage').src == "https://i.scdn.co/image/ab67616d0000b273600adbc750285ea1a8da249f") {
      targCol = "rgba(200, 0, 0, 0.15)";
    }
    

    var tintElem = document.querySelector('.tint');
    tintElem.style.background = targCol;

    console.log(maxColor.name);
};


    





// ***********************  DAYS OF WORK  *********************** //

setTimeout(function() {
    // do something after 1000 milliseconds

class1 = (document.getElementById("note1").value);
class2 = (document.getElementById("note2").value);
class3 = (document.getElementById("note3").value);
class4 = (document.getElementById("note4").value);
class5 = (document.getElementById("note5").value);
classes = [class1, class2, class3, class4, class5];

function extractWorkDays(inputText) {
    const lines = inputText.split('\n');
    const workDays = new Set();
  
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      const matches = line.match(/\(([^)]+)\)/);
  
      if (matches && matches[1]) {
        const days = matches[1].split('/');
        days.forEach(day => {
          workDays.add(day.trim());
        });
      }
    }
  
    return Array.from(workDays);
  }
  function fixArray(arr) {
    const updatedWorkDays = [];
    workDaysList.forEach(days => {
      const splitDays = days.split(/(?=[MTWFS])/);
      splitDays.forEach(day => {
        if (day === 'Th') {
          updatedWorkDays.push('Th');
        } else {
          updatedWorkDays.push(day);
        }
      });
    });
    return updatedWorkDays;
  }

  const daysOfWeek = ["M", "T", "W", "Th", "F"];
  const colors = {
    blue: "blue",
    gray: "rgb(60, 60, 60)",
  };

  // Function to update the ball colors based on the days array
  function updateBallColors(daysArray, index) {
    ballContStr = "note" + index + "ball";
    ballThing = "ball" + index;
    const ballContainer = document.getElementById(ballContStr);
    const balls = ballContainer.getElementsByClassName(ballThing);

    for (let i = 0; i < daysOfWeek.length; i++) {
      const day = daysOfWeek[i];
      const ball = balls[i];

      if (daysArray.includes(day)) {
        ball.style.backgroundColor = colors.blue;
      } else {
        ball.style.backgroundColor = colors.gray;
      }
    }
  }

countee = 1;
for (i = 0; i < classes.length; i++) {
    clas = classes[i]
    workDaysList = extractWorkDays(clas);
    daysArray = fixArray(workDaysList);
    updateBallColors(daysArray, countee);
    countee++;
}

  
  
}, 200);