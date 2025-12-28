"use strict";

// TIMER LENGTHS
// CONVERT TO SECONDS

let FOCUS_TIME = 25 * 60; // DEF. 25
let SHORT_TIME = 10 * 60; // DEF. 10
let LONG_TIME = 15 * 60; // DEF. 15
let IS_RUNNING = false;
let TIME_REMAINING = FOCUS_TIME;
let TIMER_MODE = "focus";
let MINUTES;
let SECONDS;
let TIMER = document.getElementById("timer");
let TIMER_INTERVAL;

let COMPLETED = document.getElementById("completed");
let COMPLETED_COUNT = 0;

function updateCompleted() {
    IS_RUNNING = false;
    COMPLETED_COUNT += 1;
    COMPLETED.innerHTML = "Completed: " + COMPLETED_COUNT;
}

function startTimer() {
    document.getElementById("start-button").innerHTML = "Stop";
    if (!IS_RUNNING) {
        IS_RUNNING = true;
        TIMER_INTERVAL = setInterval(updateTimer, 1000);
    } else {
        resetStartButton();
        IS_RUNNING = false;
        clearInterval(TIMER_INTERVAL);
    }
}

function updateTimer() {
    TIME_REMAINING -= 1;
    MINUTES = Math.floor(TIME_REMAINING / 60);
    SECONDS = Math.floor(TIME_REMAINING - (MINUTES * 60)).toString().padStart(2, "0");
    TIMER.innerHTML = MINUTES + ":" + SECONDS;
    console.log("Time remaining:" + TIME_REMAINING);

    // TIMER MODE SWITCHING + COMPLETED CHECKER

    if (TIMER_MODE == "focus" && TIME_REMAINING < 0 && ((COMPLETED_COUNT + 1) % 4 != 0)) {
        updateCompleted();
        setShortBreak();
        playAlarm();

    } else if (TIMER_MODE == "focus" && TIME_REMAINING < 0 && (COMPLETED_COUNT + 1) % 4 == 0) {
        updateCompleted();
        setLongBreak();
        playAlarm();
    }

    if ((TIMER_MODE == "short" || TIMER_MODE == "long") && TIME_REMAINING == 0) {
        setFocus();
        playAlarm();
    }
}

function resetStartButton() {
    document.getElementById("start-button").innerHTML = "Start";
}

function setTimer() {
    TIMER.innerHTML = MINUTES + ":" + SECONDS;
}

function setFocus() {
    TIMER_MODE = "focus";
    markerFocus();
    resetStartButton();
    clearInterval(TIMER_INTERVAL);
    TIME_REMAINING = FOCUS_TIME;
    MINUTES = Math.floor(FOCUS_TIME / 60);
    SECONDS = Math.floor(FOCUS_TIME - (MINUTES * 60)).toString().padStart(2, "0");
    setTimer();
}

function setShortBreak() {
    TIMER_MODE = "short";
    markerShort();
    resetStartButton();
    clearInterval(TIMER_INTERVAL);
    TIME_REMAINING = SHORT_TIME;
    MINUTES = Math.floor(SHORT_TIME / 60);
    SECONDS = Math.floor(SHORT_TIME - (MINUTES * 60)).toString().padStart(2, "0");
    setTimer();
}

function setLongBreak() {
    TIMER_MODE = "long";
    markerLong();
    resetStartButton();
    clearInterval(TIMER_INTERVAL);
    TIME_REMAINING = LONG_TIME;
    MINUTES = Math.floor(LONG_TIME / 60);
    SECONDS = Math.floor(LONG_TIME - (MINUTES * 60)).toString().padStart(2, "0");
    setTimer();
}

function markerFocus() {
    activeMarker.style.top = "130%";
    activeMarker.style.left = "13%";
}

function markerShort() {
    activeMarker.style.top = "130%";
    activeMarker.style.left = "42%";
}

function markerLong() {
    activeMarker.style.top = "130%";
    activeMarker.style.left = "78%";
}

function getSettings() {
    let focusInput = document.getElementById("focus-input").value;
    let shortInput = document.getElementById("short-input").value;
    let longInput = document.getElementById("long-input").value;
    FOCUS_TIME = focusInput * 60;
    SHORT_TIME = shortInput * 60;
    LONG_TIME = longInput * 60;
    setShortBreak();
    setLongBreak();
    setFocus();
    getAlarmChoice();
    console.log(alarmChoice, alarmSound);
}

// EVENT LISTENERS

let startButton = document.getElementById("start-button");
let focusButton = document.getElementById("focus-button");
let shortButton = document.getElementById("short-button");
let longButton = document.getElementById("long-button");
let saveButton = document.getElementById("save-button");

let activeMarker = document.getElementById("active-marker");
let settingsButton = document.getElementById("settings-icon");
let settingsWindow = document.getElementById("settings-window");

startButton.addEventListener("click", startTimer);

focusButton.addEventListener("click", function () {
    resetStartButton();
    markerFocus();
    setFocus();
});

shortButton.addEventListener("click", function () {
    resetStartButton();
    markerShort();
    setShortBreak();
});

longButton.addEventListener("click", function () {
    resetStartButton();
    markerLong();
    setLongBreak();
});

settingsButton.addEventListener("click", function () {
    settingsWindow.classList.toggle("settings-hide");
});

saveButton.addEventListener("click", getSettings)

// ALARM SOUNDS

let alarmChoice;
let alarmSound;

function getAlarmChoice() {
    alarmChoice = document.getElementById("alarm-choices").value;

    if (alarmChoice == "default") {
        alarmSound = new Audio("Assets/Audio/beep.mp3")
    } else if (alarmChoice == "bedside") {
        alarmSound = new Audio("Assets/Audio/bedside.mp3")
    } else if (alarmChoice == "electronic") {
        alarmSound = new Audio("Assets/Audio/electronic.mp3")
    }
    return alarmSound;
}

function playAlarm() {
    alarmSound.play();
}

