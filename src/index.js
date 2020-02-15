import './base.scss'
import {getKbCardData, getShinhanBankData, getShinhanCardData} from './repository'
import App from './components/App.template'
import {monthlyAggrigation} from './reducers'
import {recentMonths} from 'functions'
import Moment from 'moment'
import {autorun, configure, observable} from 'mobx'

configure({enforceActions: 'always'});

(async () => {
  const container = document.getElementById('app')
  const records = []
    .concat(await getShinhanBankData())
    .concat(await getShinhanCardData())
    .concat(await getKbCardData())
    .map((record, index) => ({
      ...record, ...{
        id: index,
        dateTime: Moment(record.dateTime)
      }
    }))
    .sort((record1, record2) => record1.dateTime.isBefore(record2.dateTime) ? -1 : 1)

  const mainStore = observable({
    records: records,
    monthly: recentMonths(5).map(month => monthlyAggrigation(month, records))
  })

  autorun(() => container.innerHTML = App(mainStore))
})()
