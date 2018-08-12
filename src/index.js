import './base.scss'
import {getKbCardData, getShinhanBankData, getShinhanCardData} from "./data";
import RecordList from "./components/RecordList.template";
import {bind, Store} from "./Framework";
import Moment from "moment";
import {extendMoment} from 'moment-range';
import {sum, toNumber} from './Functions';

const moment = extendMoment(Moment);

function findByMomentRange(arr, mapper, range) {
    //todo : improve performace (with search algorithm?)
    return arr.filter(value => range.contains(mapper(value)));
}

(async () => {
    const start = moment().subtract(5, 'months');
    const end = moment();
    const records = []
        .concat(await getShinhanBankData())
        .concat(await getShinhanCardData())
        .concat(await getKbCardData())
        .map(record => ({
            ...record, ...{
                dateTime: moment(record.dateTime)
            }
        }))
        .sort((record1, record2) => record1.dateTime.isBefore(record2.dateTime) ? -1 : 1);

    const store = new Store({
        daily: Array.from(moment.range(start, end).by('days'))
            .map(day => ([day, findByMomentRange(
                records,
                record => record.dateTime,
                moment.rangeFromInterval('day', -1, day)
            )]))
            .map(([day, records]) => ({
                date: day,
                content: "합계",
                records: records,
                amount: records
                    .map(record => record.amount)
                    .map(toNumber)
                    .reduce(sum, 0),

            }))
    });

    bind(document.getElementById("app"), RecordList, store);
})();