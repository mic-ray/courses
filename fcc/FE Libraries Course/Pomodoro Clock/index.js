var breakLength = 5;
var sessionLength = 25;

$(function () {
    initTimer();
    // Add event listener to new quote button
    $('#break-increment').click(() => {
        breakLength++;
        $('#break-length').text(breakLength);
    });
    $('#break-decrement').click(() => {
        if (breakLength > 1) {
            breakLength--;
            $('#break-length').text(breakLength);
        }
    });
    $('#session-increment').click(() => {
        sessionLength++;
        $('#session-length').text(sessionLength);
    });
    $('#session-decrement').click(() => {
        if (sessionLength > 1) {
            sessionLength--;
            $('#session-length').text(sessionLength);
        }
    });
    $('#start_stop').click(() => startSession());
});

const initTimer = () => {
    $('#break-length').text(breakLength);
    $('#session-length').text(sessionLength);
    $('#time-left').text(sessionLength + ':00');
};

function startSession() {
    var start = Date.now();
    var duration = sessionLength * 60;
    // does the same job as parseInt truncates the float
    var timer = setInterval(() => {
        var diff = duration - (((Date.now() - start) / 1000) | 0);

        minutes = Math.floor(diff / 60)
            .toString()
            .padStart(2, '0');
        seconds = (diff % 60).toString().padStart(2, '0');

        $('#time-left').text(minutes + ':' + seconds);
    }, 1000);
}
