import './RecordList.scss'
import dailyRecords from './dailyRecords.template'

export default data => `${ data.length ? `
    <ul class="monthly-summary-list">
        ${data.map(month => `
            <li class="monthly-summary">
                <div class="month-wrap">
                    <span class="month">${month.date && month.date.format('M')}</span>
                </div>
                ${ month.daily.length ? `
                    ${dailyRecords(month.daily)}
                ` : ""}
            </li>
        `).join("\n")}$
    </ul>
` : ""}`;