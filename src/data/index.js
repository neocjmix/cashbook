import shinhanBankData from './shinhanBank.json'
import shinhanCardData from './shinhanCard.csv'
import kbCardData from './kbCard.csv'

function toNumber(string = ""){
    return (string + "").replace(/[^\d]/g,"") || 0
}

function getShinhanBankData() {
    return new Promise(resolve => {
        resolve(shinhanBankData["R_RIBD1110_1"].map(record => ({
            content: record["내용"],
            briefs: record["적요"],
            amount: toNumber(record["입금"]) - toNumber(record["출금"]),
            dateTime: new Date(record["거래일자"] + "T" + record["시간"].replace(/(..)(..)(..)/g, "$1:$2:$3")),
            balance: record["잔액"],
            isCreditCard : false
        })));
    });
}

function getShinhanCardData() {
    return new Promise(resolve => {
        resolve(shinhanCardData.map(record => ({
            content : record["가맹점명"],
            briefs: record["이용구분"],
            amount : toNumber(record["이용금액"]),
            dateTime: new Date(record["이용일시"].replace(/\//g,"-").replace("  ","T")),
            balance : null,
            installment : record["이용구분"].indexOf("할부") >= 0 ? toNumber(record["이용구분"]) : 1,
            isCanceled : record["매입상태"].indexOf("취소") >=0,
            isCreditCard : true
        })));
    });
}

function getKbCardData() {
    return new Promise(resolve => {
        resolve(kbCardData.map(record => ({
            content : record["이용하신곳"],
            briefs: record["결제방법"],
            amount : toNumber(record["국내이용금액(원)"]) - toNumber(record["할인금액"]),
            dateTime: new Date(record["이용일"]+"T"+record["이용시간"]),
            balance : null,
            installment : record["결제방법"].indexOf("할부") >= 0 ? toNumber(record["결제방법"]) : 1,
            isCanceled : record["상태"].indexOf("취소") >=0,
            isCreditCard : true
        })));
    });
}

export {getShinhanBankData, getShinhanCardData, getKbCardData}