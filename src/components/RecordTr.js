export default record =>
    `<tr>
        <td>${record.content}</td>
        <td>${record.briefs}</td>
        <td>${record.withdrawal}</td>
        <td>${record.deposit}</td>
        <td>${record.dateTime}</td>
        <td>${record.balance}</td>           
    </tr>`