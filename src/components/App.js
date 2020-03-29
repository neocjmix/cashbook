import './RecordList.scss'
import Graph from './Graph'
import MonthlyRecords from './MonthlyRecords'
import { DIV } from 'lib/dognut/src/htmlComponent'

export default (store, container) => {
  DIV`#app`(
    DIV`#graph-wrapper`(
      Graph(store)
    ),
    DIV`#records-wrapper`(
      MonthlyRecords(store.monthly)
    )
  ).render(container)
}
