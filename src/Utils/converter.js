module.exports.convertStringToDate = (str) => {
    const times = str.split(' ');
    const root = times.reduce((prev, curr)=>{
        const signal = curr[curr.length - 1];
        const number = parseInt(curr.slice(0, -1));
        
        switch(signal) {
            case 's':
                prev.setSeconds(prev.getSeconds() + number);
                break;
            case 'm':
                prev.setMinutes(prev.getMinutes() + number);
                break;
            case 'd':
                prev.setDate(prev.getDate() + number);
                break;
        }
        return prev;
    }, new Date());
    return root;
}

module.exports.convertStringToMilisecond = (str) => {
    const times = str.split(' ');
    const root = times.reduce((prev, curr)=>{
        const signal = curr[curr.length - 1];
        const number = parseInt(curr.slice(0, -1));
        
        switch(signal) {
            case 's':
                prev = prev + number*1000;
                break;
            case 'm':
                prev = prev + number*60*1000;
                break;
            case 'd':
                prev = prev + number*24*60*60*1000;
                break;
        }
        return prev;
    }, 0);
    return root;
}

module.exports.convertParticularTimeStringToDate = (str, _root = new Date()) => {
    const times = str.toLowerCase().split('h');
    const hour = parseInt(times[0]);
    const minute = parseInt(times[1]);
    const root = _root;
    root.setMinutes(minute);
    root.setHours(hour);
    return root;
}

// 1y 1mo 1d 19h 30m 1s
module.exports.convertDateToCron = (date) => {
    const times = date.split(' ');
    const standard = {s: '*', m: '*',h: '*', d: '*', mo: '*', y: '*'};
    times.forEach((time) => {
        const signal = time[time.length - 1];
        const number = time.slice(0, -1);

        const signalValue = standard[signal];
        if(signalValue) {
            standard[signal] = number;
        }
    });
    const cron = Object.values(standard).reduce((prev, curr)=>prev + ' ' + curr, '')
    return cron;
};