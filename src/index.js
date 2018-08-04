import {getShinhanData} from "./shinhan";
import RecordTable from "./components/RecordTable";
import Controller from "./framework/Controller";
import * as Rx from "rxjs";

const controller = new Controller(document.getElementById("table-wrapper"), RecordTable, {
    records : []
});

Rx.Observable
    .fromEvent(document.getElementById("fetch-shinhan"), 'click')
    .flatMap(() => Rx.Observable.of(getShinhanData()))
    .map(records => ({...controller.state, ...{records}}))
    .forEach(controller.update.bind(controller));