import './base.scss'
import {getKbCardData, getShinhanBankData, getShinhanCardData} from "./data";
import RecordList from "./components/RecordList.template";
import {bind, Store} from "./Framework";

const store = new Store({
    records: []
});

bind(document.getElementById("record-list-wrapper"), RecordList, store);

(async () => {
    const shinhanBankData = await getShinhanBankData();
    const shinhanCardData = await getShinhanCardData();
    const kbCardData = await getKbCardData();
    const records = []
        .concat(shinhanBankData)
        .concat(shinhanCardData)
        .concat(kbCardData)
        .sort((record1, record2) => record1.dateTime.valueOf() - record2.dateTime.valueOf());

    store.update({records})
})();