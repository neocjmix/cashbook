import './base.scss'
import { getKbCardData, getShinhanBankData, getShinhanCardData } from './repository'
import { groupByDays, groupByMonths } from './reducers'
import isBefore from 'date-fns/isBefore'
import { $div } from 'dognut/src/htmlComponent'
import Graph from './components/Graph'
import MonthlyRecords from './components/MonthlyRecords'

(async () => {
  const records = []
    .concat(await getShinhanBankData())
    .concat(await getShinhanCardData())
    .concat(await getKbCardData())
    .map((record, index) => ({
      ...record, ...{
        id: index,
        dateTime: new Date(record.dateTime)
      }
    }))
    .sort((record1, record2) => isBefore(record1.dateTime, record2.dateTime) ? -1 : 1)

  const store = {
    records: records,
    monthly: groupByMonths(records).map(monthRecords => ({
      ...monthRecords,
      daily: groupByDays(monthRecords.records)
    }))
  }

  $div`#app`(
    $div`#graph-wrapper`(
      Graph(store)
    ),
    $div`#records-wrapper`(
      MonthlyRecords(store.monthly)
    )
  ).render(document.getElementById('app'))
})()
