import './RecordList.scss'
import Graph from './Graph'
import MonthlyRecords from './MonthlyRecords'
import { $div } from 'lib/dognut/src/htmlComponent'

export default (store, container) => {
  $div`#app`(
    $div`#graph-wrapper`(
      Graph(store)
    ),
    $div`#records-wrapper`(
      MonthlyRecords(store.monthly)
    )
  ).render(container)
}
