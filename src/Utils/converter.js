// hàm này dùng để tăng thời gian hiện tại lên 1 thời gian nào đó
module.exports.convertStringToDate = (str, _root = new Date()) => {
    const times = str.split(' ');
    const root = times.reduce((prev, curr) => {
        const signal = curr[curr.length - 1];
        const number = parseInt(curr.slice(0, -1));

        switch (signal) {
            case 's':
                prev.setSeconds(prev.getSeconds() + number);
                break;
            case 'm':
                prev.setMinutes(prev.getMinutes() + number);
                break;
            case 'h':
                prev.setMinutes(prev.getMinutes() + number);
                break;
            case 'd':
                prev.setDate(prev.getDate() + number);
                break;
        }
        return prev;
    }, _root);
    return root;
}

// hàm này dùng để chuyển 1 khoảng thời gian về milisecond
module.exports.convertStringToMilisecond = (str) => {
    const times = str.split(' ');
    const root = times.reduce((prev, curr) => {
        const signal = curr[curr.length - 1];
        const number = parseInt(curr.slice(0, -1));

        switch (signal) {
            case 's':
                prev = prev + number * 1000;
                break;
            case 'm':
                prev = prev + number * 60 * 1000;
                break;
            case 'h':
                prev = prev + number * 60 * 60 * 1000;
            case 'd':
                prev = prev + number * 24 * 60 * 60 * 1000;
                break;
        }
        return prev;
    }, 0);
    return root;
}

// hàm này để chuyển thời gian hiện tại về một thời gian nào đó
module.exports.convertParticularTimeStringToDate = (str, _root = new Date()) => {
    const convertToCorrectFormat = function (str) {
        let result = '';
        for (let i = 0; i < str.length; i++) {
            // neu la ky tu
            if (str[i] > '9' || str[i] < '0') {
                if (str[i - 1] !== ' ') {
                    result += `${str[i]} `;
                }
            } else {
                result += str[i];
            }

        }
        return result;
    }
    str = convertToCorrectFormat(str);
    const times = str.split(' ');
    const root = _root;
    times.forEach((curr) => {
        const signal = curr[curr.length - 1];
        const number = parseInt(curr.slice(0, -1));

        switch (signal) {
            case 's':
                root.setSeconds(number);
                break;
            case 'h':
                root.setHours(number);
                break;
            case 'm':
                root.setMinutes(number);
                break;
            case 'd':
                root.setDate(number);
                break;
            case 'mo':
                root.setMonth(number);
            case 'y':
                root.setYear(number);
        }
    });
    return root;
}

// 1y 1mo 1d 19h 30m 1s
module.exports.convertDateToCron = (date) => {
    const times = date.split(' ');
    const standard = { s: '*', m: '*', h: '*', d: '*', mo: '*', y: '*' };
    times.forEach((time) => {
        const signal = time[time.length - 1];
        const number = time.slice(0, -1);

        const signalValue = standard[signal];
        if (signalValue) {
            standard[signal] = number;
        }
    });
    const cron = Object.values(standard).reduce((prev, curr) => prev + ' ' + curr, '')
    return cron;
};