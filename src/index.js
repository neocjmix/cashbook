import './base.scss'
import {getKbCardData, getShinhanBankData, getShinhanCardData} from "./repository";
import RecordList from "./components/RecordList.template";
import {bind, Store} from "./Framework";
import {monthlyAggrigation} from "./reducers";
import {recentMonths} from "./functions"
import Moment from "moment";

(async () => {
    const records = []
        .concat(await getShinhanBankData())
        .concat(await getShinhanCardData())
        .concat(await getKbCardData())
        .map(record => ({
            ...record, ...{
                dateTime: Moment(record.dateTime)
            }
        }))
        .sort((record1, record2) => record1.dateTime.isBefore(record2.dateTime) ? -1 : 1);

    bind(document.getElementById("records-wrapper"), RecordList, new Store({
        monthly: recentMonths(5).map(month => monthlyAggrigation(month, records))
    }));
})();