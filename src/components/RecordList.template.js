import './RecordList.scss'
import currencyFormatter from 'currency-formatter'

export default data => `
    <ul class="record-list">
        ${data.records.map(record => record.isCreditCard ? `
            <li class="credit-card">
                <dl>
                    <dt>금액</dt><dd class="amount">${currencyFormatter.format(Math.abs(record.amount), { code : 'KRW'})}</dd>
                    <dt>내용</dt><dd class="content">${record.content}</dd>
                </dl>           
            </li>
        ` : `
            
            <li class="bank-account ${record.amount < 0 ? 'withdrawal' : 'deposit'}">
                <dl>
                    <dt>금액</dt><dd class="amount">${currencyFormatter.format(Math.abs(record.amount), { code : 'KRW'})}</dd>
                    <dt>내용</dt><dd class="content">${record.content}</dd>
                </dl>           
            </li>
        `).join('\n')}
    </ul>`;