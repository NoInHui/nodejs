function getDefaultFileName() {
    let date = new Date();
    let year = date.getFullYear().toString();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    month = month >= 10 ? month.toString() : '0' + month;
    day = day >= 10 ? day.toString() : '0' + day;	
    hour = hour >= 10 ? hour.toString() : '0' + hour;
    minutes = minutes >= 10 ? day.toString() : '0' + minutes;	
    seconds = seconds >= 10 ? seconds.toString() : '0' + seconds;	
    
    return `${year}-${month}-${day}-${hour}-${minutes}-${seconds}`;
}

function dateFormat(date, type) {
    let year = date.getFullYear().toString();
    let month = date.getMonth()+1;
    let day = date.getDate();
    month = month >= 10 ? month.toString() : '0' + month;
    day = day >= 10 ? day.toString() : '0' + day;	
    let result = type == 'int' ? parseInt(`${year}${month}${day}`) : `${year}-${month}-${day}`;
    return result;
}