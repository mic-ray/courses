var breakLength = 5;
var sessionLength = 25;
var time = sessionLength * 60;
var paused = true;

$(function () {
    initTimer();
    // Add event listener to new quote button
    $('#break-increment').click(() => {
        if (paused) {
            breakLength++;
            $('#break-length').text(breakLength);
            initTimer();
        }
    });
    $('#break-decrement').click(() => {
        if (paused) {
            if (breakLength > 1) {
                breakLength--;
                $('#break-length').text(breakLength);
                initTimer();
            }
        }
    });
    $('#session-increment').click(() => {
        if (paused) {
            if (sessionLength < 60) {
                sessionLength++;
                $('#session-length').text(sessionLength);
                time = sessionLength * 60;
                initTimer();
            }
        }
    });
    $('#session-decrement').click(() => {
        if (paused) {
            if (sessionLength > 1) {
                sessionLength--;
                $('#session-length').text(sessionLength);
                time = sessionLength * 60;
                initTimer();
            }
        }
    });
    $('#start_stop').click(() => {
        paused = !paused;
        timer();
    });
    $('#reset').click(() => resetTimer());
});

const initTimer = () => {
    $('#break-length').text(breakLength);
    $('#session-length').text(sessionLength);
    $('#time-left').text(convertTime(time));
};

const timer = () => {
    const updateTimer = () => {
        if (!paused) {
            time--;
            $('#time-left').text(convertTime(time));
            setTimeout(updateTimer, 1000);
        }
    };
    updateTimer();
};

const resetTimer = () => {
    breakLength = 5;
    sessionLength = 25;
    time = sessionLength * 60;
    paused = true;
    initTimer();
};

const convertTime = (time) => {
    return (
        Math.floor(time / 60)
            .toString()
            .padStart(2, '0') +
        ':' +
        (time % 60).toString().padStart(2, '0')
    );
};
