const tr = record =>
    `<tr>
        <td>${record.content}</td>
        <td>${record.briefs}</td>
        <td>${record.withdrawal}</td>
        <td>${record.deposit}</td>
        <td>${record.dateTime}</td>
        <td>${record.balance}</td>           
    </tr>`;

const thead = () =>
    `<thead>
        <th>내용</th>
        <th>적요</th>
        <th>입금</th>
        <th>출금</th>
        <th>거래일자</th>
        <th>잔액</th>
    </thead>`;

const table = ({thead = '', trs = [], tfoot = '', id}) =>
    `<table ${id ? 'id="+id+"' : ''}>
        ${thead}
        ${tfoot}
        <tbody>
            ${trs.join('\n')}
        </tbody>
    </table>`;

export {tr, thead, table}