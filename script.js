let timeLeft;
let isRunning = false;
let timerInterval;

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const REST_TIME = 5 * 60;  // 5 minutes in seconds

const modeToggleButton = document.getElementById('mode-toggle');
const startPauseButton = document.getElementById('start-pause');
const resetButton = document.getElementById('reset');
const addFiveMinButton = document.getElementById('add-five');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');

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
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timerInterval);
            isRunning = false;
            startPauseButton.textContent = 'Start';
            startPauseButton.classList.remove('pause');
            startPauseButton.classList.add('start');
            alert('Time is up!');
        }
    }, 1000);
}

function toggleStartPause() {
    if (isRunning) {
        // Pause the timer
        clearInterval(timerInterval);
        isRunning = false;
        startPauseButton.textContent = 'Start';
        startPauseButton.classList.remove('pause');
        startPauseButton.classList.add('start');
    } else {
        // Start the timer
        isRunning = true;
        startPauseButton.textContent = 'Pause';
        startPauseButton.classList.remove('start');
        startPauseButton.classList.add('pause');
        startTimer();
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    // Set timeLeft based on current mode
    timeLeft = modeToggleButton.textContent === '☀️' ? WORK_TIME : REST_TIME;
    startPauseButton.textContent = 'Start';
    startPauseButton.classList.remove('pause');
    startPauseButton.classList.add('start');
    updateDisplay();
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
    updateDisplay();
}

function addFiveMinutes() {
    timeLeft += 5 * 60; // Add 5 minutes in seconds
    updateDisplay();
}

// Event Listeners
modeToggleButton.addEventListener('click', toggleMode);
startPauseButton.addEventListener('click', toggleStartPause);
resetButton.addEventListener('click', resetTimer);
addFiveMinButton.addEventListener('click', addFiveMinutes);

// Initialize the toggle button to work mode
modeToggleButton.textContent = '☀️'; 