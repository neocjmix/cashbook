import {getShinhanData} from "./shinhan";
import RecordTable from "./components/RecordTable";
import {Store, Controller} from "./framework";
import * as Rx from "rxjs";


const store = new Store({
    records: []
});

const controller = new Controller(document.getElementById("table-wrapper"), RecordTable, store);

Rx.Observable
    .fromEvent(document.getElementById("fetch-shinhan"), 'click')
    .flatMap(() => Rx.Observable.of(getShinhanData()))
    .map(records => ({...controller.state, ...{records}}))
    .forEach(store.update.bind(store));