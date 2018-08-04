import data from './data/shinhan.json'

const shinhanDataAdaptor = shinhanRecords => ({
    content: shinhanRecords["내용"],
    briefs: shinhanRecords["적요"],
    withdrawal: shinhanRecords["입금"],
    deposit: shinhanRecords["출금"],
    dateTime: new Date(shinhanRecords["거래일자"] + "T" + shinhanRecords["시간"].replace(/(..)(..)(..)/g, "$1:$2:$3")),
    balance: shinhanRecords["잔액"]
});

function getShinhanData() {
    return data["R_RIBD1110_1"];
}

export {shinhanDataAdaptor, getShinhanData}