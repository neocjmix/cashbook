import { dayRange, monthDays, sum } from 'functions'
import startOfMonth from 'date-fns/startOfMonth'
import startOfDay from 'date-fns/startOfDay'
import isBefore from 'date-fns/isBefore'

const groupByMonths = records => records.reduce((monthGroups, record) => {
    const recordMonth = startOfMonth(record.dateTime)
    const {length: groupLength, [groupLength - 1]:lastGroup} = monthGroups
    if (!lastGroup || isBefore(lastGroup.date, recordMonth)) {
        monthGroups.push({
            date: recordMonth,
            content: '월합계',
            amount: record.amount,
            records: [record],
        })
    }else{
        lastGroup.amount += record.amount
        lastGroup.records.push(record)
    }
    return monthGroups
}, [])

const groupByDays = records => records.reduce((dayGroups, record) => {
    const recordDay = startOfDay(record.dateTime)
    const {length: groupLength, [groupLength - 1]:lastGroup} = dayGroups
    if (!lastGroup || isBefore(lastGroup.date, recordDay)) {
        dayGroups.push({
            date: recordDay,
            content: '일합계',
            amount: record.amount,
            records: [record],
        })
    }else{
        lastGroup.amount += record.amount
        lastGroup.records.push(record)
    }
    return dayGroups
}, [])

const recentMonths = length => Array.from(moment.range(moment().subtract(length, 'months'), moment()).by('months'));

export { groupByMonths, groupByDays }
