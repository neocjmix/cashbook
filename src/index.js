import './base.scss'
import { getKbCardData, getShinhanBankData, getShinhanCardData } from './repository'
import App from './components/App'
import { groupByDays, groupByMonths, monthlyAggrigation } from './reducers'
import isBefore from 'date-fns/isBefore'
import { configure, observable } from 'mobx'

configure({ enforceActions: 'always' });

(async () => {
    const container = document.getElementById('app')
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

    const mainStore = observable({
        records: records,
        monthly: groupByMonths(records).map(monthRecords => ({
            ...monthRecords,
            daily: groupByDays(monthRecords.records)
        }))
    })

    App(mainStore, container)
})()
