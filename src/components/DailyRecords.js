import { $ul } from 'lib/dognut/src/htmlComponent'
import { DailyRecord } from './DailyRecord'

export default daily => daily.length > 0 &&
  $ul({ class: 'daily-summary-list' })(
    daily.map(data => DailyRecord({ data }))
  )
