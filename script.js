let timeLeft;
let timerId = null;
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const modeToggleButton = document.getElementById('mode-toggle');

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
            if (timeLeft > 0) {  // Only decrement if we have time left
                timeLeft--;
                updateDisplay();
                if (timeLeft === 0) {
                    clearInterval(timerId);
                    timerId = null;
                    startButton.disabled = false;
                    alert('Time is up!');
                }
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
    timeLeft = modeToggleButton.textContent === '☀️' ? WORK_TIME : REST_TIME;
    updateDisplay();
    startButton.disabled = false;
}

function toggleMode() {
    if (modeToggleButton.textContent === '☀️') {
        // Switch to rest mode
        modeToggleButton.textContent = '🌙';
        timeLeft = REST_TIME;
    } else {
        // Switch to work mode
        modeToggleButton.textContent = '☀️';
        timeLeft = WORK_TIME;
    }
    resetTimer();
}

// Event Listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
modeToggleButton.addEventListener('click', toggleMode);

function updateTimer(minutes, seconds) {
    // Format the time with leading zeros if needed
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    
    // Update the page title with the current time
    document.title = `${formattedMinutes}:${formattedSeconds} - Pomodoro Timer`;
} 