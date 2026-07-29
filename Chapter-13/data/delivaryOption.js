import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

export const deliveryOptions = [
    {
        Id:'1',
        deliveryDays: 7,
        deliveryPrice:0
    },
    {
        Id:'2',
        deliveryDays: 3,
        deliveryPrice:499
    },
    {
        Id:'3',
        deliveryDays: 1,
        deliveryPrice:999
    }
]
function isWeekend(date){
    let dayDate = date.format('dddd')
   
    return dayDate === 'Saturday' || dayDate === 'Sunday';
}

export function deliveryOptionHtml2(deliveryDays){
    let remainingDays = deliveryDays.deliveryDays;
    let deliveryDate = dayjs();

    while (remainingDays > 0) {

        deliveryDate = deliveryDate.add(1, "day");

        if (!isWeekend(deliveryDate)) {
            remainingDays--;
        }

    }

    const deliveryFormatDate = deliveryDate.format('dddd, MMMM D');

    return deliveryFormatDate;
}