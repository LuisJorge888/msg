function getCurrentDateFormatada(format = 'ISO', date = new Date){

    switch(format){
        case 'ISO':
           
            let dateFormat = date.toISOString().split("T")[0];
            let timeFormat = date.toISOString().split("T")[1].split(":", 2);
            return `${dateFormat} ${timeFormat[0]}:${timeFormat[1]}`;
    
        default:
            return date;
    }
}

module.exports = {
    getCurrentDateFormatada
}