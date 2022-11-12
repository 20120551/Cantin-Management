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

    // root.setHours(root.getHours() + 7);
    const result = root.toLocaleString('de-DE');
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