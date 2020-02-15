import DailyRecords from './DailyRecords'
import {formatCurrency, getAmountClass} from "functions";

export default (monthly, records) => `${ monthly.length ? `
    <ul class="monthly-summary-list">
        ${monthly.map(month => `
            <li class="monthly-summary ${getAmountClass(month.amount)}">
                <div class="month-wrap">
                    <span class="month">${month.date && month.date.format('M')}</span>
                    <span class="amount">${formatCurrency(month.amount, false)}</span>
                </div>
                ${ month.daily.length ? `
                    ${DailyRecords(month.daily, records)}
                ` : ""}
            </li>
        `).join("\n")}$
    </ul>
` : ""}`;
