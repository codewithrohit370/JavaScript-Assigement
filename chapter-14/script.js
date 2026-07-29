import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

// 15a
let todayDate = dayjs();
// 15b
let afterTodayDate = todayDate.add(5,'days')
let displayDate = afterTodayDate.format("MMMM  D")
console.log(displayDate)

// 15c
let beforTodayDate = todayDate.subtract(1,'month')
console.log(beforTodayDate.format('MMMM D'))

// 15d
console.log(todayDate.format('dddd'))

// 15e
function isWeekend(date){
    let dayDate = date.format('dddd')
   
    return dayDate === 'Saturday' || dayDate === 'Sunday';
}



console.log(isWeekend(todayDate))
let after_3_days = todayDate.add(3,'days')
console.log(isWeekend(after_3_days))