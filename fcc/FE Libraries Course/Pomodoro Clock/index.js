// Length of break
var breakLength = 5;
// Length of session
var sessionLength = 25;
// Current left time
var time = sessionLength * 60;
// Flag, that displays, whether timer
// is paused at the moment or not
var paused = true;
// State displaying whether a session
// or a break is running
var state = 'Session';

// On window load
$(function () {
    // Initiliaze the timers
    initTimer();
    // Add event listeners to
    // session/break in/decrement
    $('#break-increment').click(() => {
        if (paused) {
            if (breakLength < 60) {
                breakLength++;
                initTimer();
            }
        }
    });
    $('#break-decrement').click(() => {
        if (paused) {
            if (breakLength > 1) {
                breakLength--;
                initTimer();
            }
        }
    });
    $('#session-increment').click(() => {
        if (paused) {
            if (sessionLength < 60) {
                sessionLength++;
                time = sessionLength * 60;
                initTimer();
            }
        }
    });
    $('#session-decrement').click(() => {
        if (paused) {
            if (sessionLength > 1) {
                sessionLength--;
                time = sessionLength * 60;
                initTimer();
            }
        }
    });
    // Switch paused flag and update
    // timer when start stop is clicked
    $('#start_stop').click(() => {
        paused = !paused;
        timer();
    });
    // Add event listener to reset timer
    // when reset button is pressed
    $('#reset').click(() => resetTimer());
});

/**
 * Initializes the timer and labels
 */
const initTimer = () => {
    $('#break-length').text(breakLength);
    $('#session-length').text(sessionLength);
    $('#time-left').text(convertTime(time));
    $('#timer-label').text(state);
};

/**
 * Handles timer functionality
 */
const timer = () => {
    /**
     * Inner function, that ticks down
     * the timer
     */
    const updateTimer = () => {
        // If the timer ran out
        if (time < 0) {
            // Switch timer function
            timeSwitch();
            // If timer is not paused
        } else if (!paused) {
            // Show current time
            $('#time-left').text(convertTime(time));
            // Decrease time
            time--;
            // Call inner function after a second again
            setTimeout(updateTimer, 1000);
        }
    };
    updateTimer();
};

/**
 * Handles session/break switch of timer
 */
const timeSwitch = () => {
    // Play audio sound
    document.getElementById('beep').play();
    // Pause the timer
    paused = true;
    // Switch the state
    // and assign corresponding time
    if (state === 'Session') {
        state = 'Break';
        time = breakLength * 60;
    } else {
        state = 'Session';
        time = sessionLength * 60;
    }
    // Set label to current state
    $('#timer-label').text(state);
    // Unpause timer again
    paused = false;
    timer();
};

/**
 * Resets the whole timer
 */
const resetTimer = () => {
    // Stop and reset beep sound
    document.getElementById('beep').pause();
    document.getElementById('beep').currentTime = 0;
    // Set all lengths and labels
    // back to default values
    breakLength = 5;
    sessionLength = 25;
    time = sessionLength * 60;
    state = 'Session';
    paused = true;
    initTimer();
};

/**
 * Converts given [time] value to a mm:ss string
 * @param {*} time Time value (in seconds)
 */
const convertTime = (time) => {
    return (
        Math.floor(time / 60)
            .toString()
            .padStart(2, '0') +
        ':' +
        (time % 60).toString().padStart(2, '0')
    );
};
