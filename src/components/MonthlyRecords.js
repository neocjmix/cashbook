import format from 'date-fns/format'
import { formatCurrency, getAmountClass } from 'functions'
import { DIV, LI, SPAN, UL } from 'lib/dognut/src/htmlComponent'
import { DailyRecord } from './DailyRecord'

export default monthly =>
  monthly.length ?
    UL`.monthly-summary-list`(
      monthly.map(month => [
        LI`.monthly-summary.${getAmountClass(month.amount)}`(
          DIV`.month-wrap`(
            SPAN`.month`(month.date && format(month.date, 'M')),
            SPAN`.amount`(formatCurrency(month.amount, false))
          ),
          month.daily.length > 0 &&
          UL({ class: 'daily-summary-list' })(
            month.daily.map(data =>
              DailyRecord({ data }))
          )
        ),
      ])
    ) : ''
