import { $dd, $div, $dl, $dt, $li, $span, $ul } from 'lib/dognut/htmlComponent'
import 'to-style'
import format from 'date-fns/format'
import { formatCurrency, getAmountClass } from '../functions'

const store = new Proxy({
  collapsed: true
}, {
  set (obj, prop, newval) {
    obj[prop] = newval
    return true
  }
})

export const DailyRecord = ({ data }) =>
  $li({
    class: [
      'daily-summary',
      'record-list',
      store.collapsed ? 'collapsed' : '',
      data.date && format(data.date, 'dd').toLowerCase()
    ],
    onClick: () => store.collapsed = !store.collapsed,
  })(
    $div({ class: 'date-wrap' })(
      $span({ class: 'date' })(data.date && format(data.date, 'd'))
    ),
    $div({ class: `record daily-summary-content ${getAmountClass(data.amount)}` })(
      $dl(
        $dt('금액'),
        $dd({ class: 'amount' })(formatCurrency(data.amount)),
        $dt('내용'),
        $dd({ class: 'content' })(data.content)
      )
    ),
    $ul({ class: 'record-list' })(
      data.records.map((record, index) =>
        $li({
          class: [
            'record',
            'record-item',
            getAmountClass(record.amount),
            record.isCreditCard ? 'credit-card' : 'bank-account'
          ],
          style: {
            zIndex: data.records.length - index
          }
        })(
          $dl(
            $dt('금액'),
            $dd({ class: 'amount' })(formatCurrency(record.amount)),
            $dt('내용'),
            $dd({ class: 'content' })(record.content)
          )
        )
      )
    ))
