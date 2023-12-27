/*

var submitBtn = document.querySelector("button");
submitBtn.addEventListener("click", function () {
  var grades = [];
  var inputs = document.querySelectorAll("input");
  for (var i = 0; i < inputs.length; i++) {
    grades.push(inputs[i].value);
  }

  var d = new Date();
  var daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var dayOfWeekString = daysOfWeek[d.getDay()];

  if (dayOfWeekString == "Monday") {
    chrome.storage.local.set({ mongrade1: inputs[0].value });
    chrome.storage.local.set({ mongrade2: inputs[1].value });
    chrome.storage.local.set({ mongrade3: inputs[2].value });
    chrome.storage.local.set({ mongrade4: inputs[3].value });
    chrome.storage.local.set({ mongrade5: inputs[4].value });
    chrome.storage.local.set({ mongrade6: inputs[5].value });
  }
  if (dayOfWeekString == "Tuesday") {
    chrome.storage.local.set({ tuegrade1: inputs[0].value });
    chrome.storage.local.set({ tuegrade2: inputs[1].value });
    chrome.storage.local.set({ tuegrade3: inputs[2].value });
    chrome.storage.local.set({ tuegrade4: inputs[3].value });
    chrome.storage.local.set({ tuegrade5: inputs[4].value });
    chrome.storage.local.set({ tuegrade6: inputs[5].value });
  }
  if (dayOfWeekString == "Wednesday") {
    chrome.storage.local.set({ wedgrade1: inputs[0].value });
    chrome.storage.local.set({ wedgrade2: inputs[1].value });
    chrome.storage.local.set({ wedgrade3: inputs[2].value });
    chrome.storage.local.set({ wedgrade4: inputs[3].value });
    chrome.storage.local.set({ wedgrade5: inputs[4].value });
    chrome.storage.local.set({ wedgrade6: inputs[5].value });
  }
  if (dayOfWeekString == "Thursday") {
    chrome.storage.local.set({ thursgrade1: inputs[0].value });
    chrome.storage.local.set({ thursgrade2: inputs[1].value });
    chrome.storage.local.set({ thursgrade3: inputs[2].value });
    chrome.storage.local.set({ thursgrade4: inputs[3].value });
    chrome.storage.local.set({ thursgrade5: inputs[4].value });
    chrome.storage.local.set({ thursgrade6: inputs[5].value });
  }
  if (dayOfWeekString == "Friday") {
    chrome.storage.local.set({ frigrade1: inputs[0].value });
    chrome.storage.local.set({ frigrade2: inputs[1].value });
    chrome.storage.local.set({ frigrade3: inputs[2].value });
    chrome.storage.local.set({ frigrade4: inputs[3].value });
    chrome.storage.local.set({ frigrade5: inputs[4].value });
    chrome.storage.local.set({ frigrade6: inputs[5].value });
  }
  if (dayOfWeekString == "Sunday") {
    chrome.storage.local.set({ mongrade1: 70 });
    chrome.storage.local.set({ mongrade2: 70 });
    chrome.storage.local.set({ mongrade3: 70 });
    chrome.storage.local.set({ mongrade4: 70 });
    chrome.storage.local.set({ mongrade5: 70 });
    chrome.storage.local.set({ mongrade6: 70 });
    chrome.storage.local.set({ tuegrade1: 70 });
    chrome.storage.local.set({ tuegrade2: 70 });
    chrome.storage.local.set({ tuegrade3: 70 });
    chrome.storage.local.set({ tuegrade4: 70 });
    chrome.storage.local.set({ tuegrade5: 70 });
    chrome.storage.local.set({ tuegrade6: 70 });
    chrome.storage.local.set({ wedgrade1: 70 });
    chrome.storage.local.set({ wedgrade2: 70 });
    chrome.storage.local.set({ wedgrade3: 70 });
    chrome.storage.local.set({ wedgrade4: 70 });
    chrome.storage.local.set({ wedgrade5: 70 });
    chrome.storage.local.set({ wedgrade6: 70 });
    chrome.storage.local.set({ thursgrade1: 70 });
    chrome.storage.local.set({ thursgrade2: 70 });
    chrome.storage.local.set({ thursgrade3: 70 });
    chrome.storage.local.set({ thursgrade4: 70 });
    chrome.storage.local.set({ thursgrade5: 70 });
    chrome.storage.local.set({ thursgrade6: 70 });
    chrome.storage.local.set({ frigrade1: 70 });
    chrome.storage.local.set({ frigrade2: 70 });
    chrome.storage.local.set({ frigrade3: 70 });
    chrome.storage.local.set({ frigrade4: 70 });
    chrome.storage.local.set({ frigrade5: 70 });
    chrome.storage.local.set({ frigrade6: 70 });
    // chrome.storage.local.get(["tuegrade6"], function (result) {
    //   console.log(result.tuegrade6);
    // });
  }
});

*/