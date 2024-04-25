// Get data from user
let hourInput = document.getElementById("hour");
let minuteInput = document.getElementById("minute");
let secondInput = document.getElementById("second");
let startBtn = document.getElementsByClassName("startBtn");

// Display time to user
let displayHour = document.getElementById("displayHour");
let displayMinute = document.getElementById("displayMinute");
let displaySecond = document.getElementById("displaySecond");

// Select setTime & clock div
let setTime = document.getElementById("setTime");
let clock = document.getElementById("clock");
//select title
let titleText = document.getElementById("title");
// Select status
let statusBar = document.getElementById("status");
//Welcome tune
let welcomeTune = () => {
  let welcome = new Audio("welcome.mp3");
  welcome.play();
};
welcomeTune();

// Start time counter function
const showTime = () => {
  // If every field empty
  if (
    hourInput.value === "" &&
    minuteInput.value === "" &&
    secondInput.value === ""
  ) {
    alert("Please enter values for hour, minute, and second.");
  } else {
    // If any fields are empty
    if (hourInput.value === "") {
      hourInput.value = 0;
    }
    if (minuteInput.value === "") {
      minuteInput.value = 0;
    }
    if (secondInput.value === "") {
      secondInput.value = 0;
    }

    // If input values are valid
    let hour = parseInt(hourInput.value);
    let minute = parseInt(minuteInput.value);
    let second = parseInt(secondInput.value);

    if (
      hour >= 0 &&
      hour < 24 &&
      minute >= 0 &&
      minute <= 60 &&
      second >= 0 &&
      second <= 60
    ) {
      // Hide setTime div
      setTime.classList.add("hidden");
      document.body.classList.add("flex", "flex-col", "justify-center");

      //Set title
      titleText.innerText = "Time Tracking Started!!";

      // Show clock div
      clock.classList.remove("hidden");
      clock.classList.add("flex");

      // Set initial values
      displayHour.innerText = hour;
      displayMinute.innerText = minute;
      displaySecond.innerText = second;

      let totalSeconds = hour * 3600 + minute * 60 + second;

      let intervalId = setInterval(() => {
        let hours = Math.floor(totalSeconds / 3600);
        let minutes = Math.floor((totalSeconds % 3600) / 60);
        let seconds = totalSeconds % 60;

        // Update display
        displayHour.innerText = hours;
        displayMinute.innerText = minutes;
        displaySecond.innerText = seconds;

        if (totalSeconds <= 10) {
          clock.classList.add("animate-pulse");
        }
        //when time ended
        if (totalSeconds <= 0) {
          clearInterval(intervalId);
          let audio = new Audio("alarm.mp3");
          audio.play();
          clock.classList.remove("animate-pulse");

          statusBar.classList.remove("hidden");
        }
        totalSeconds--;
      }, 1000);
    } else {
      // If time is invalid
      alert("Enter valid time (0-23 hours, 0-60 minutes, 0-60 seconds)!!");
    }
  }
};

// Start Button Event listener

for (let btn of startBtn) {
  btn.addEventListener("click", showTime);
}
// Event listener for Enter key press on input fields
hourInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    startBtn[0].click();
  }
});

minuteInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    startBtn[0].click();
  }
});

secondInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    startBtn[0].click();
  }
});
