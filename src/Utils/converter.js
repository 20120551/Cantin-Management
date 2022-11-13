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

module.exports.convertParticularTimeStringToDate = (str) => {
    const times = str.toLowerCase().split('h');
    const hour = parseInt(times[0]);
    const minute = parseInt(times[1]);
    const root = new Date();
    root.setMinutes(minute);
    root.setHours(hour);
    return root;
}

module.exports.convertDateToCron = (date) => {
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const days = date.getDate();
    const months = date.getMonth() + 1;
    const dayOfWeek = date.getDay();

    return `${minutes} ${hours} ${days} ${months} ${dayOfWeek}`;
};