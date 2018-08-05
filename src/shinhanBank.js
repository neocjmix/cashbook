import data from './data/shinhanBank.json'

function getShinhanBankData() {
    return data["R_RIBD1110_1"].map(records => ({
        content: records["내용"],
        briefs: records["적요"],
        withdrawal: records["입금"],
        deposit: records["출금"],
        dateTime: new Date(records["거래일자"] + "T" + records["시간"].replace(/(..)(..)(..)/g, "$1:$2:$3")),
        balance: records["잔액"]
    }));
}

export {getShinhanBankData}