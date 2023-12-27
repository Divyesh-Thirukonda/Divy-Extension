// Step 1: Define the Monday constant list
const MondayA = [
  "10:10 - 11:50",
  "2:30 - 3:20",
  "3:35 - 4:25",
  "6:00 - 7:00",
  "NA"
];
const MondayB = [
  "BLAW Lecture",
  "CSCI 1913 Lecture",
  "CSCI 2011 Lecture",
  "Jim",
  "NA"
];

let currentDate = new Date();
let dayOfWeek = currentDate.getDay();
let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let dayName = daysOfWeek[dayOfWeek];

if(dayName == "Monday") {
  MondayA[0] = "10:10 - 11:50";
  MondayA[1] = "14:30 - 15:20";
  MondayA[2] = "15:35 - 16:25";
  MondayA[3] = "18:00 - 19:00";
  MondayA[4] = "NA";
  MondayB[0] = "BLAW Lecture";
  MondayB[1] = "CSCI 1913 Lecture";
  MondayB[2] = "CSCI 2011 Lecture";
  MondayB[3] = "Jim";
  MondayB[4] = "NA";
}
if(dayName == "Tuesday") {
  MondayA[0] = "NA";
  MondayA[1] = "10:00 - 14:00";
  MondayA[2] = "14:30 - 15:45";
  MondayA[3] = "16:40 - 18:35";
  MondayA[4] = "18:50 - 19:40";
  MondayB[0] = "NA";
  MondayB[1] = "Toaster";
  MondayB[2] = "CSCI 3003 Lecture";
  MondayB[3] = "CSCI 1913 Lab";
  MondayB[4] = "CSCI 2011 Discuss";
}
if(dayName == "Wednesday") {
  MondayA[0] = "10:10 - 11:50";
  MondayA[1] = "12:00 - 14:00";
  MondayA[2] = "14:30 - 15:20";
  MondayA[3] = "15:35 - 16:25";
  MondayA[4] = "18:00 - 19:00";
  MondayB[0] = "BLAW Lecture";
  MondayB[1] = "Toaster";
  MondayB[2] = "CSCI 1913 Lecture";
  MondayB[3] = "CSCI 2011 Lecture";
  MondayB[4] = "Jim";
}
if(dayName == "Thursday") {
  MondayA[0] = "10:00 - 14:00";
  MondayA[1] = "14:30 - 15:45";
  MondayA[2] = "18:00 - 19:00";
  MondayA[3] = "20:00 - 23:00";
  MondayA[4] = "NA";
  MondayB[0] = "Toaster";
  MondayB[1] = "CSCI 3003 Lecture";
  MondayB[2] = "College Apps";
  MondayB[3] = "EPS Intern";
  MondayB[4] = "NA";
}
if(dayName == "Friday") {
  MondayA[0] = "12:20 - 14:15";
  MondayA[1] = "14:30 - 15:20";
  MondayA[2] = "15:35 - 16:25";
  MondayA[3] = "18:00 - 19:00";
  MondayA[4] = "NA";
  MondayB[0] = "CSCI 3003 Lab";
  MondayB[1] = "CSCI 1913 Lecture";
  MondayB[2] = "CSCI 2011 Lecture";
  MondayB[3] = "Jim";
  MondayB[4] = "NA";
}
if(dayName == "Saturday" || dayName == "Sunday") {
  MondayA[0] = "10:00 - 12:00";
  MondayA[1] = "NA";
  MondayA[2] = "NA";
  MondayA[3] = "18:00 - 21:00";
  MondayA[4] = "22:00 - 23:59";
  MondayB[0] = "Netflix";
  MondayB[1] = "NA";
  MondayB[2] = "NA";
  MondayB[3] = "Develop App, Game, or Arduino";
  MondayB[4] = "DECA";
}


const dayOfWeekName = document.querySelectorAll('.dayOfWeekName');
dayOfWeekName[0].textContent = dayName;

// Step 2: Select all elements with class 'time-slot'
const timeSlots = document.querySelectorAll('.time-slot');
const activities = document.querySelectorAll('.activity');
// Step 3: Assign values from the 'Monday' list to the elements
timeSlots.forEach((element, index) => {
  if (MondayA[index]) {
    if(MondayA[index] == "NA") {
      element.remove();
    } else {
      element.textContent = convertTimeFormat(MondayA[index]);
    }
  }
});
activities.forEach((element, index) => {
  if (MondayB[index]) {
    element.textContent = MondayB[index];
    if(MondayA[index] == "NA") {
      element.remove();
    }
  }
});


function convertTimeFormat(input) {
  
  // Split the input string by the '-' delimiter
  const times = input.split(' - ');

  // Convert the start time
  const startTime = convertTo12HourFormat(times[0]);

  // Convert the end time
  const endTime = convertTo12HourFormat(times[1]);

  // Combine and return the result
  return `${startTime} - ${endTime}`;
}

function convertTo12HourFormat(militaryTime) {
  // Split the military time by ':' to get hours and minutes
  const [hours, minutes] = militaryTime.split(':');

  // Convert hours to a number
  const militaryHours = parseInt(hours);

  // Determine if it's AM or PM
  const period = militaryHours < 12 ? 'AM' : 'PM';

  // Convert military hours to 12-hour format
  const twelveHourHours = militaryHours % 12 || 12;

  // Format the time in 12-hour format
  return `${twelveHourHours}:${minutes} ${period}`;
}


// Get the notes from local storage
chrome.storage.local.get(
  [
    "sote1",
    "sote2",
    "sote3",
    "sote4",
    "sote5",
    "sote6",
    "sote7",
    "sote8",
    "sote9",
    "sote10",
    "sote11",
    "sote12",
    "sote13",
    "sote14",
    "sote15",
  ],
  function (result) {
    // Populate the note-taking areas with the saved notes

    if (result.sote1 != undefined) {
      document.getElementById("note1").value = result.sote1;
    } else {
      document.getElementById("note1").value = "";
    }
    if (result.sote2 != undefined) {
      document.getElementById("note2").value = result.sote2;
    } else {
      document.getElementById("note2").value = "";
    }
    if (result.sote3 != undefined) {
      document.getElementById("note3").value = result.sote3;
    } else {
      document.getElementById("note3").value = "";
    }
    if (result.sote4 != undefined) {
      document.getElementById("note4").value = result.sote4;
    } else {
      document.getElementById("note4").value = "";
    }
    if (result.sote5 != undefined) {
      document.getElementById("note5").value = result.sote5;
    } else {
      document.getElementById("note5").value = "";
    }

    if (result.sote6 != undefined) {
      document.getElementById("note6").value = result.sote6;
    } else {
      document.getElementById("note6").value = "";
    }
    // if (result.sote7 != undefined) {
    //   document.getElementById("note7").value = result.sote7;
    // } else {
    //   document.getElementById("note7").value = "";
    // }
    // if (result.sote8 != undefined) {
    //   document.getElementById("note8").value = result.sote8;
    // } else {
    //   document.getElementById("note8").value = "";
    // }
    // if (result.sote9 != undefined) {
    //   document.getElementById("note9").value = result.sote9;
    // } else {
    //   document.getElementById("note9").value = "";
    // }
    // if (result.sote10 != undefined) {
    //   document.getElementById("note10").value = result.sote10;
    // } else {
    //   document.getElementById("note10").value = "";
    // }

    // if (result.sote11 != undefined) {
    //   document.getElementById("note11").value = result.sote11;
    // } else {
    //   document.getElementById("note11").value = "";
    // }
    // if (result.sote12 != undefined) {
    //   document.getElementById("note12").value = result.sote12;
    // } else {
    //   document.getElementById("note12").value = "";
    // }
    // if (result.sote13 != undefined) {
    //   document.getElementById("note13").value = result.sote13;
    // } else {
    //   document.getElementById("note13").value = "";
    // }
    // if (result.sote14 != undefined) {
    //   document.getElementById("note14").value = result.sote14;
    // } else {
    //   document.getElementById("note14").value = "";
    // }
    // if (result.sote15 != undefined) {
    //   document.getElementById("note15").value = result.sote15;
    // } else {
    //   document.getElementById("note15").value = "";
    // }
  }
);
document.getElementById("note1").addEventListener("input", function () {
  chrome.storage.local.set({ sote1: this.value });
});
document.getElementById("note2").addEventListener("input", function () {
  chrome.storage.local.set({ sote2: this.value });
});
document.getElementById("note3").addEventListener("input", function () {
  chrome.storage.local.set({ sote3: this.value });
});
document.getElementById("note4").addEventListener("input", function () {
  chrome.storage.local.set({ sote4: this.value });
});
document.getElementById("note5").addEventListener("input", function () {
  chrome.storage.local.set({ sote5: this.value });
});

document.getElementById("note6").addEventListener("input", function () {
  chrome.storage.local.set({ sote6: this.value });
});
// document.getElementById("note7").addEventListener("input", function () {
//   chrome.storage.local.set({ sote7: this.value });
// });

// document.getElementById("note8").addEventListener("input", function () {
//   chrome.storage.local.set({ sote8: this.value });
// });


// document.getElementById("note9").addEventListener("input", function () {
//   chrome.storage.local.set({ sote9: this.value });
// });
// document.getElementById("note10").addEventListener("input", function () {
//   chrome.storage.local.set({ sote10: this.value });
// });

// document.getElementById("note11").addEventListener("input", function () {
//   chrome.storage.local.set({ sote11: this.value });
// });
// document.getElementById("note12").addEventListener("input", function () {
//   chrome.storage.local.set({ sote12: this.value });
// });
// document.getElementById("note13").addEventListener("input", function () {
//   chrome.storage.local.set({ sote13: this.value });
// });
// document.getElementById("note14").addEventListener("input", function () {
//   chrome.storage.local.set({ sote14: this.value });
// });
// document.getElementById("note15").addEventListener("input", function () {
//   chrome.storage.local.set({ sote15: this.value });
// });


const currentdatee = new Date();

// Extract the current hour and minute
const currentHour = currentdatee.getHours();
const currentMinute = currentdatee.getMinutes();

// Calculate the total minutes
const totalMinutes = currentHour * 60 + currentMinute;

var currentMinutes = totalMinutes;


// Loop through MondayA and check end times
for (let i = 0; i < MondayA.length; i++) {
  // Skip if the entry is "NA"
  if (MondayA[i] === "NA" || MondayB[i] === "NA") {
    continue;
  }

  // Split the time range into start and end times
  const [startTime, endTime] = MondayA[i].split(" - ");
  
  // Convert start and end times to minutes
  const [startHours, startMinutes] = startTime.split(":").map(Number);
  const [endHours, endMinutes] = endTime.split(":").map(Number);
  const startMinutesTotal = startHours * 60 + startMinutes;
  const endMinutesTotal = endHours * 60 + endMinutes;
  console.log("OH");
  // Check if the end time is less than the current time
  if (endMinutesTotal < currentMinutes) {
    // timeSlots[i].remove();
    // activities[i].remove();
    timeSlots[i].style.opacity = .4;
    activities[i].style.opacity = .4;
  }
}
