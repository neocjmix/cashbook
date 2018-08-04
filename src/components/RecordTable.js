import RecordThead from "./RecordThead";
import RecordTr from "./RecordTr";

export default data =>
    `<table>
        ${RecordThead()}
        <tbody>
            ${data.records.map(RecordTr).join('\n')}
        </tbody>
    </table>`