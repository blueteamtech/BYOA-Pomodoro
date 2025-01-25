let timeLeft;
let timerId = null;
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const workModeButton = document.getElementById('work-mode');
const restModeButton = document.getElementById('rest-mode');
const modeText = document.getElementById('mode-text');

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const REST_TIME = 5 * 60;  // 5 minutes in seconds

// Initialize timer
timeLeft = WORK_TIME;
updateDisplay();

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    // Update the page title
    document.title = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} - Pomodoro Timer`;
}

function startTimer() {
    if (timerId === null) {
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                alert('Time is up!');
            }
        }, 1000);
        startButton.disabled = true;
    }
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
    startButton.disabled = false;
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = workModeButton.classList.contains('active') ? WORK_TIME : REST_TIME;
    updateDisplay();
    startButton.disabled = false;
}

function setWorkMode() {
    workModeButton.classList.add('active');
    restModeButton.classList.remove('active');
    modeText.textContent = 'Work Time';
    timeLeft = WORK_TIME;
    resetTimer();
}

function setRestMode() {
    restModeButton.classList.add('active');
    workModeButton.classList.remove('active');
    modeText.textContent = 'Rest Time';
    timeLeft = REST_TIME;
    resetTimer();
}

function updateCurrentTime() {
    const currentTime = new Date().toLocaleTimeString();
    document.getElementById('current-time').textContent = currentTime;
}

// Update time every second
setInterval(updateCurrentTime, 1000);
updateCurrentTime(); // Initial call

// Event Listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
workModeButton.addEventListener('click', setWorkMode);
restModeButton.addEventListener('click', setRestMode);

function updateTimer(minutes, seconds) {
    // Format the time with leading zeros if needed
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    
    // Update the page title with the current time
    document.title = `${formattedMinutes}:${formattedSeconds} - Pomodoro Timer`;
} 