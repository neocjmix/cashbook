export default data => `
    <ul>
        ${data.records.map(record => record.isCreditCard ? `
            <li class="bank-account">
                <dl>
                    <dt>내용</dt><dd>${record.content}</dd>
                    <dt>적요</dt><dd>${record.briefs}</dd>
                    <dt>금액</dt><dd>${record.amount}</dd>
                    <dt>거래일자</dt><dd>${record.dateTime}</dd>
                    <dt>잔액</dt><dd>${record.balance}</dd>
                </dl>           
            </li>
        ` : `
            <li class="credit-card">
                <dl>
                    <dt>내용</dt><dd>${record.content}</dd>
                    <dt>적요</dt><dd>${record.briefs}</dd>
                    <dt>금액</dt><dd>${record.amount}</dd>
                    <dt>거래일자</dt><dd>${record.dateTime}</dd>
                    <dt>잔액</dt><dd>${record.balance}</dd>
                </dl>           
            </li>
        `).join('\n')}
    </ul>`;