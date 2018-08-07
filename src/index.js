import {getKbCardData, getShinhanBankData, getShinhanCardData} from "./data";
import RecordTable from "./components/RecordTable";
import {bind, Store} from "./Framework";

const store = new Store({
    records: []
});

bind(document.getElementById("table-wrapper"), RecordTable, store);

(async () => {
    const shinhanBankData = await getShinhanBankData();
    const shinhanCardData = await getShinhanCardData();
    const kbCardData = await getKbCardData();
    const records = []
        .concat(shinhanBankData)
        .concat(shinhanCardData)
        .concat(kbCardData)
        .sort((record1, record2) => record2.dateTime.valueOf() - record1.dateTime.valueOf());

    store.update({records})
})();