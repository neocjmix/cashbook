import DailyRecords from './DailyRecords'
import format from 'date-fns/format'
import {formatCurrency, getAmountClass} from 'functions'
import { $div, $li, $span, $ul } from 'lib/dognut/htmlComponent'

export default monthly => {
    return monthly.length ?
        $ul`.monthly-summary-list`(
            monthly.map(month => [
                $li`.monthly-summary.${getAmountClass(month.amount)}`(
                    $div`.month-wrap`(
                        $span`.month`(month.date && format(month.date, 'M')),
                        $span`.amount`(formatCurrency(month.amount, false))
                    ),
                    month.daily.length
                        ? DailyRecords(month.daily)
                        : ''
                ),
            ])
        ) : ''
}
