import { $dd, $div, $dl, $dt, $li, $span, $ul } from 'dognut/htmlComponent'
// import { DailyRecord } from './DailyRecord'
import format from "date-fns/format"
import { formatCurrency, getAmountClass } from '../functions'

const store = new Proxy({
  collapsed: true
}, {

})

export default daily => daily.length > 0 &&
  $ul({ class: 'daily-summary-list' })(
    daily.map(day => $li({
        class: [
          'daily-summary',
          'record-list',
          store.collapsed ? 'collapsed' : '',
          day.date && format(day.date, 'dd').toLowerCase()
        ]
      })(
      $div({ class: 'date-wrap' })(
        $span({ class: 'date' })(day.date && format(day.date, 'd'))
      ),
      $div({ class: `record daily-summary-content ${getAmountClass(day.amount)}` })(
        $dl(
          $dt('금액'),
          $dd({ class: 'amount' })(formatCurrency(day.amount)),
          $dt('내용'),
          $dd({ class: 'content' })(day.content)
        )
      ),
      $ul({ class: 'record-list' })(
        day.records.map((record, index) =>
          $li({
            class: [
              'record',
              'record-item',
              getAmountClass(record.amount),
              record.isCreditCard ? 'credit-card' : 'bank-account'
            ].join(' '),
            style: `z-index:${day.records.length - index}`
          })(
            $dl(
              $dt('금액'),
              $dd({ class: 'amount' })(formatCurrency(record.amount)),
              $dt('내용'),
              $dd({ class: 'content' })(record.content)
            )
          )
        )
      ),
      )

    )
  )
