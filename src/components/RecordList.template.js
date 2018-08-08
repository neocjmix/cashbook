import './RecordList.scss'
import currencyFormatter from 'currency-formatter'

export default data => `
    <div id="graph-wrapper"></div>
    <ul class="day-summary-list">
        ${data.daily.map(day => `
            <li class="day-summary collapsed">
                <div class="date-wrap">
                    <span class="date">${day.date && day.date.format('D')}</span>
                </div>
                <ul class="record-list">
                    ${day.records.map(record => record.isCreditCard ? `
                        <li class="record record-item credit-card">
                            <dl>
                                <dt>금액</dt><dd class="amount">${currencyFormatter.format(Math.abs(record.amount), {code: 'KRW'})}</dd>
                                <dt>내용</dt><dd class="content">${record.content}</dd>
                            </dl>           
                        </li>
                    ` : `
                        <li class="record record-item bank-account ${record.amount < 0 ? 'withdrawal' : 'deposit'}">
                            <dl>
                                <dt>금액</dt><dd class="amount">${currencyFormatter.format(Math.abs(record.amount), {code: 'KRW'})}</dd>
                                <dt>내용</dt><dd class="content">${record.content}</dd>
                            </dl>           
                        </li>
                    `).join('\n')}
                </ul>
                <div class="record day-summary-content">
                    <dl>
                        <dt>금액</dt><dd class="amount">${'...'}</dd>
                        <dt>내용</dt><dd class="content">합계</dd>
                    </dl>           
                </div>
            </li>        
        `).join('\n')}
    <ul class="record-list">
`;