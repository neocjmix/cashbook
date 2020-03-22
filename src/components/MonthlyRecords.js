import format from 'date-fns/format'
import { formatCurrency, getAmountClass } from 'functions'
import { $div, $li, $span, $ul } from 'lib/dognut/src/htmlComponent'
import { DailyRecord } from './DailyRecord'

export default monthly =>
  monthly.length ?
    $ul`.monthly-summary-list`(
      monthly.map(month => [
        $li`.monthly-summary.${getAmountClass(month.amount)}`(
          $div`.month-wrap`(
            $span`.month`(month.date && format(month.date, 'M')),
            $span`.amount`(formatCurrency(month.amount, false))
          ),
          month.daily.length > 0 &&
          $ul({ class: 'daily-summary-list' })(
            month.daily.map(data =>
              DailyRecord({ data }))
          )
        ),
      ])
    ) : ''
