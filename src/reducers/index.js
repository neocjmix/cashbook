import {sum, monthDays, dayRange} from '../functions/index';

function findByMomentRange(arr, mapper, range) {
    return arr.filter(value => range.contains(mapper(value))); //todo : improve performace (with search algorithm?)
}

function dailyAggrigation(day, records) {
    const dailyRecords = findByMomentRange(records, record => record.dateTime, dayRange(day));
    return ({
        date: day,
        content: "일합계",
        records: dailyRecords,
        amount: dailyRecords.map(record => record.amount).reduce(sum, 0)
    });
}

function monthlyAggrigation(month, records) {
    const daily = monthDays(month).map(day => dailyAggrigation(day, records));
    return {
        date: month,
        content: "월합계",
        daily: daily,
        amount : daily.map(record => record.amount).reduce(sum, 0)
    }
}

export {dailyAggrigation, monthlyAggrigation}