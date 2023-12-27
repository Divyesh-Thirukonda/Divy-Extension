// Get the notes from local storage
chrome.storage.local.get(
  ["bote1", "bote2", "bote3", "bote4", "bote5"],
  function (result) {
    // Populate the note-taking areas with the saved notes

    if (result.bote1 != undefined) {
      document.getElementById("AchievementsText").value = result.bote1;
    } else {
      document.getElementById("AchievementsText").value = "";
    }
    if (result.bote2 != undefined) {
      document.getElementById("GoodText").value = result.bote2;
    } else {
      document.getElementById("GoodText").value = "";
    }

    if (result.bote3 != undefined) {
      document.getElementById("BadText").value = result.bote3;
    } else {
      document.getElementById("BadText").value = "";
    }

    if (result.bote4 != undefined) {
      document.getElementById("ThoughtsOne").value = result.bote4;
    } else {
      document.getElementById("ThoughtsOne").value = "";
    }
    if (result.bote5 != undefined) {
      document.getElementById("ThoughtsTwo").value = result.bote5;
    } else {
      document.getElementById("ThoughtsTwo").value = "";
    }
  }
);

document
  .getElementById("AchievementsText")
  .addEventListener("input", function () {
    chrome.storage.local.set({ bote1: this.value });
  });
document.getElementById("GoodText").addEventListener("input", function () {
  chrome.storage.local.set({ bote2: this.value });
});
document.getElementById("BadText").addEventListener("input", function () {
  chrome.storage.local.set({ bote3: this.value });
});

document.getElementById("ThoughtsOne").addEventListener("input", function () {
  chrome.storage.local.set({ bote4: this.value });
});
document.getElementById("ThoughtsTwo").addEventListener("input", function () {
  chrome.storage.local.set({ bote5: this.value });
});
