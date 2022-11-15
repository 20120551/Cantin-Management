module.exports = function(event) {
    event.on('schedule_err', (err)=>{
        console.log(`error: ${err.message}`);
        console.log(`cause: ${err.cause}`);
    })
}