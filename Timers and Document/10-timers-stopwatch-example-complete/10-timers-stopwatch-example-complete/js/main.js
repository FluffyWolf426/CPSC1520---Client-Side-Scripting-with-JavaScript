/*
Timer Fundamentals
1. select all of the button elements and the lap elements
2. add an event listener for the start button
3. create variables for the currentTime, an isStopWatchRunning and the timerInterval
4. create a function named "startTimer" to start the interval
    - set the isStopWatchRunning to true
    - use setInterval to set the "timerInterval" variable
        - set the "time interval" or "delay" to 10ms
    - in the setInterval callback function, increment the time
5. create function named setTimerValue that will display the time on the page
    - call this function in the setInterval callback from the previous step
    - make it more readable (i.e. seconds:hundredths of seconds)
6. in the stop button listener, set the isStopWatchRunning to false and clear the interval
    - observe the page how the timer stops
    - if you click start, the timer continues
7. create a function to add new lap
    - get the lap time which is the current lap time minus the last lap time
    - display it on the page with the following html (in all laps section)
         <li class="list-group-item">Lap CURRENT LAP: CURRENT LAP TIME</li>
    - increase the currentLap
    - add the lastLapTime
8. in the add lap event listener, call the function above
*/

// selected buttons
let stopButton = document.querySelector(".stop")
let startButton = document.querySelector(".start")
let lapButton = document.querySelector(".lap")

// lap section
let allLaps = document.querySelector(".all-laps")

// the timer value
let timerValue = document.querySelector(".timer-value")

// boolean for if the stop watch is running.
let isStopWatchRunning = false

// the the time displayed (will be in hundreds of seconds)
let currentTime = 0

// lap variables
let lastLapTime = 0
let currentLap = 1

// lap
lapButton.addEventListener("click", ()=> {
  // call add new lap so that we can see the laps
  addNewLap()
})

// start
startButton.addEventListener("click", () => {
    // start the timer.
    if (!isStopWatchRunning){
        startTimer()
    }
})

// stop
stopButton.addEventListener("click", ()=> {
    isStopWatchRunning = false
})

// add a new lap based on the last ime.
const addNewLap = () => {
    // get the lap time
    let lapTime = currentTime - lastLapTime
    // display the information on the page of the last lap.
    allLaps.innerHTML += `<li class="list-group-item">Lap ${currentLap}: ${getReadableTime(lapTime)}</li>`

    // increment the lap, get a new last lap time.
    currentLap += 1
    lastLapTime = currentTime
}


// format the time so that it's readable.
const getReadableTime = (value) => {
    return `${Math.floor(value/100)}:${value % 100}`
}

// use my variable of current time and display it on the page.
const setTimerValue = () => {
    timerValue.innerText = getReadableTime(currentTime)
}

const startTimer = () => {

    // set the isStopWatchRunning to true because our timer is running.
    isStopWatchRunning = true
    const TIME_DELAY = 10 // just 10 ms
    // set an interval that will execute every 10ms.
    let timerInterval = setInterval(()=> {
        // it's going add 1 to the time.
        currentTime += 1
        console.log(currentTime)
        // it's going to set the timer value on the page.
        setTimerValue()

        // check if the stopwatch running boolean is set to false I want to clear this timeout.
        if (!isStopWatchRunning){
            clearInterval(timerInterval) // remove the interval that was created.
        }
    }, TIME_DELAY)
    
}



