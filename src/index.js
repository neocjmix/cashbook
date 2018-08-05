import {getShinhanBankData} from "./shinhanBank";
import RecordTable from "./components/RecordTable";
import {Store, bind} from "./Framework";
import * as Rx from "rxjs";


const store = new Store({
    records: []
});

bind(document.getElementById("table-wrapper"), RecordTable, store);

Rx.Observable
    .fromEvent(document.getElementById("fetch-shinhan"), 'click')
    .flatMap(() => Rx.Observable.of(getShinhanBankData()))
    .map(records => ({records}))
    .forEach(store.update.bind(store));