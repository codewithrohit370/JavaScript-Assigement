
export function isWeekend(date){
    let dayDate = date.format('dddd')
   
    return dayDate === 'Saturday' || dayDate === 'Sunday';
}