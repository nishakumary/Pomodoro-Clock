const timer = document.querySelector(".timer");
const title = document.querySelector(".title");
const startBtn = document.querySelector(".startBtn");
const pauseBtn = document.querySelector(".pauseBtn");
const resumeBtn = document.querySelector(".resumeBtn");
const resetBtn = document.querySelector(".resetBtn");
const pomoCountDisplay = document.querySelector(".pomoCountDisplay");

const WORK_TIME = 25 * 60; // 25 minutes
const BREAK_TIME = 5 * 60; // 5 minutes

let currentTime = WORK_TIME;
let timerID = null;
let isPaused = false;
let isWorkTime = true; // Track work/break state
let pomoCount = 0; // Number of completed pomodoro rounds

// Function to display time in mm:ss format
const displayTime = (timeInSeconds) => {
  const mins = Math.floor(timeInSeconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (timeInSeconds % 60).toString().padStart(2, "0");
  timer.textContent = `${mins}:${secs}`;
};

// Function to update the title
const updateTitle = (msg) => {
  title.textContent = msg;
};

// Countdown function
const countDown = () => {
  if (currentTime > 0) {
    currentTime--;
    displayTime(currentTime);
  } else {
    stopTimer();

    // Switch between work and break
    if (isWorkTime) {
      updateTitle("Break Time! Take a 5 min rest.");
      currentTime = BREAK_TIME;
      isWorkTime = false;
    } else {
      pomoCount++;
      updateTitle("Work Time! Start working again.");
      currentTime = WORK_TIME;
      isWorkTime = true;
      updatePomoCountDisplay();
    }
    console.log(`Switching phase. isWorkTime: ${isWorkTime}`);
    // Automatically start the next phase (work or break)
    startTimer();
  }
};

// Function to start the timer
const startTimer = () => {
  if (timerID === null) {
    timerID = setInterval(countDown, 1000);
    updateTitle(isWorkTime ? "Work Time!" : "Break Time!");
    console.log(`Timer started. isWorkTime: ${isWorkTime}`);
  }
};

// Function to stop the timer
const stopTimer = () => {
  clearInterval(timerID);
  timerID = null;
  console.log("Timer stopped");
};

// Function to pause the timer
const pauseTimer = () => {
  if (timerID !== null) {
    stopTimer();
    isPaused = true;
    updateTitle("Timer Paused");
    console.log("Timer paused");
  }
};

// Function to resume the timer
const resumeTimer = () => {
  if (isPaused) {
    timerID = setInterval(countDown, 1000);
    isPaused = false;
    updateTitle(isWorkTime ? "Work Time!" : "Break Time!");
    console.log("Timer resumed");
  }
};

// Function to reset the timer
const resetTimer = () => {
  stopTimer();
  currentTime = WORK_TIME;
  isWorkTime = true;
  displayTime(currentTime);
  updateTitle("Click Start for Work Time");
  pomoCount = 0; // Reset Pomodoro count
  updatePomoCountDisplay(); // Hide Pomodoro count
  console.log("Timer reset");
};

// Function to update and show completed Pomodoro rounds
const updatePomoCountDisplay = () => {
  pomoCountDisplay.style.display = pomoCount > 0 ? "flex" : "none";
  pomoCountDisplay.querySelector(".count").textContent = pomoCount;
  console.log(`Pomodoro count updated: ${pomoCount}`);
};

// Event listeners for buttons
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resumeBtn.addEventListener("click", resumeTimer);
resetBtn.addEventListener("click", resetTimer);

// Initialize timer display
displayTime(currentTime);
updatePomoCountDisplay();
