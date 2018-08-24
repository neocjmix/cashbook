import './RecordList.scss'
import currencyFormatter from 'currency-formatter'

const getAmountClass = amount => amount === 0 ? "" : amount < 0 ? 'withdrawal' : 'deposit';
const formatCurrency = amount => currencyFormatter.format(Math.abs(amount), {code: 'KRW'});
const isWeekend = date => date.day() === 0 || date.day() === 6;

export default data => `${ data.length ? `
    <ul class="daily-summary-list">
        ${data.map(day => `
            <li class="daily-summary collapsed ${day.date.format('ddd').toLowerCase()}">
                <div class="date-wrap">
                    <span class="date">${day.date && day.date.format('D')}</span>
                </div>
                ${ day.records.length ? `
                    <ul class="record-list">
                        ${day.records.map(record => record.isCreditCard ? `
                            <li class="record record-item credit-card ${getAmountClass(record.amount)}">
                                <dl>
                                    <dt>금액</dt><dd class="amount">${formatCurrency(record.amount)}</dd>
                                    <dt>내용</dt><dd class="content">${record.content}</dd>
                                </dl>           
                            </li>
                        ` : `
                            <li class="record record-item bank-account ${getAmountClass(record.amount)}">
                                <dl>
                                    <dt>금액</dt><dd class="amount">${formatCurrency(record.amount)}</dd>
                                    <dt>내용</dt><dd class="content">${record.content}</dd>
                                </dl>           
                            </li>
                        `).join('\n')}
                    </ul>
                ` : ""}
                <div class="record daily-summary-content ${getAmountClass(day.amount)}">
                    <dl>
                        <dt>금액</dt><dd class="amount">${formatCurrency(day.amount)}</dd>
                        <dt>내용</dt><dd class="content">${day.content}</dd>
                    </dl>           
                </div>
            </li>        
        `).join('\n')}
    </ul>
` : ""}`;