import DailyRecords from './DailyRecords.template'
import {formatCurrency, getAmountClass} from "functions";

export default data => `${ data.length ? `
    <ul class="monthly-summary-list">
        ${data.map(month => `
            <li class="monthly-summary ${getAmountClass(month.amount)}">
                <div class="month-wrap">
                    <span class="month">${month.date && month.date.format('M')}</span>
                    <span class="amount">${formatCurrency(month.amount, false)}</span>
                </div>
                ${ month.daily.length ? `
                    ${DailyRecords(month.daily)}
                ` : ""}
            </li>
        `).join("\n")}$
    </ul>
` : ""}`;