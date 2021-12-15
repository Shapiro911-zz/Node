const moment = require("moment");
const EventEmitter = require('events');
const emitter = new EventEmitter();

//npm start for 03-03-03-2022 or node timers.js (date)

const dates = process.argv.slice(2);

let date = dates[0];

date = date.split('-');

let timerTime = new Date(date[3], date[2] - 1, date[1], date[0]);

if (isNaN(timerTime)) {
    console.log('Error! Not a date format');
    return;
}

flag = true;

if (timerTime < currentTime) {
    console.log('Error! Wrong date');
    return;
}

const run = async () => {
    setInterval(function () {
        if (flag) {
            let currentTime = new Date().getTime();
            let diffTime = timerTime - currentTime;
            let duration = moment.duration(diffTime, 'milliseconds');
            let payload = `${duration._data.years} years, ${duration._data.months} months, ${duration._data.days} days, ${duration._data.hours} hours, ${duration._data.minutes} minutes, ${duration._data.seconds} seconds`;
            timerTime = moment(timerTime).add(-1, 'seconds')
            if (duration <= 0) {
                payload = `Timer ended`;
                flag = false;
            }
            else {
                emitter.emit('timerTick', payload);
            }
        }
        else {
            return;
        }
    }, 1000)
}

class TimerHandler {
    static timerTick(payload) {
        console.log('Until timer end: ', payload);
    }
}

emitter.on('timerTick', TimerHandler.timerTick);

run();
