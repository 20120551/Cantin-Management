
module.exports.getFirstDate = async (year, month) => { 
    const result = new Date(year, month - 1, 1, 5);
    return result;
}

module.exports.getLastDate = async (year, month) => { 
    let lastDate = new Date(year, month, 0).getDate();
    const result = new Date(year, month- 1, lastDate, 7);
    return result;
}