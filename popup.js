

window.addEventListener("load", function () {
  const loader = document.querySelector(".loading-screen");
  loader.className += " hidden";
});
// Get the notes from local storage
chrome.storage.local.get(
  ["note1", "note2", "note3", "note4", "note5", "note6", "note7"],
  function (result) {
    // Populate the note-taking areas with the saved notes

    if (result.note1 != undefined) {
      document.getElementById("note1").value = result.note1;
    } else {
      document.getElementById("note1").value = "";
    }
    if (result.note2 != undefined) {
      document.getElementById("note2").value = result.note2;
    } else {
      document.getElementById("note2").value = "";
    }

    if (result.note3 != undefined) {
      document.getElementById("note3").value = result.note3;
    } else {
      document.getElementById("note3").value = "";
    }

    if (result.note4 != undefined) {
      document.getElementById("note4").value = result.note4;
    } else {
      document.getElementById("note4").value = "";
    }
    if (result.note5 != undefined) {
      document.getElementById("note5").value = result.note5;
    } else {
      document.getElementById("note5").value = "";
    }

    // if (result.note6 != undefined) {
    //   document.getElementById("note6").value = result.note6;
    // } else {
    //   document.getElementById("note6").value = "";
    // }

    // if (result.note7 != undefined) {
    //   document.getElementById("note7").value = result.note7;
    // } else {
    //   document.getElementById("note7").value = "";
    // }
  }
);

// Save the notes to local storage when the user types in the note-taking areas
document.getElementById("note1").addEventListener("input", function () {
  chrome.storage.local.set({ note1: this.value });
});

document.getElementById("note2").addEventListener("input", function () {
  chrome.storage.local.set({ note2: this.value });
});
document.getElementById("note3").addEventListener("input", function () {
  chrome.storage.local.set({ note3: this.value });
});

document.getElementById("note4").addEventListener("input", function () {
  chrome.storage.local.set({ note4: this.value });
});
document.getElementById("note5").addEventListener("input", function () {
  chrome.storage.local.set({ note5: this.value });
});
// document.getElementById("note6").addEventListener("input", function () {
//   chrome.storage.local.set({ note6: this.value });
// });

// document.getElementById("note7").addEventListener("input", function () {
//   chrome.storage.local.set({ note7: this.value });
// });



// textBox = document.getElementById("note1").value;
// console.log(textBox);
// for (chr in textBox) {
//   console.log(chr);
// }

