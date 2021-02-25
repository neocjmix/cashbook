import { updatable } from 'dognut/src'
import { DD, DIV, DL, DT, LI, SPAN, UL } from 'dognut/src/htmlComponent'
import format from 'date-fns/format'
import { formatCurrency, getAmountClass } from '../functions'

export const DailyRecord = updatable(({ data }, update) => {

  const store = new Proxy({
    collapsed: true,
    toggleCollapsed () {
      store.collapsed = !store.collapsed
    }
  }, {
    set (obj, prop, newValue) {
      obj[prop] = newValue
      update()
      return true
    }
  })

  return () =>
    LI({
      class: [
        'daily-summary',
        'record-list',
        store.collapsed ? 'collapsed' : '',
        data.date && format(data.date, 'dd').toLowerCase()
      ],
      onClick: store.toggleCollapsed
    })(
      DIV({ class: 'date-wrap' })(
        SPAN({ class: 'date' })(data.date && format(data.date, 'd'))
      ),
      DIV({
        class: [
          'record',
          'daily-summary-content',
          getAmountClass(data.amount)]
      })(
        DL(
          DT('금액'),
          DD({ class: 'amount' })(formatCurrency(data.amount)),
          DT('내용'),
          DD({ class: 'content' })(data.content)
        )
      ),
      UL({ class: 'record-list' })(
        data.records.map((record, index) =>
          LI({
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
            DL(
              DT('금액'),
              DD({ class: 'amount' })(formatCurrency(record.amount)),
              DT('내용'),
              DD({ class: 'content' })(record.content)
            )
          )
        )
      ))
})
