import {table, thead, tr} from './recordTemplates'
import {getShinhanData, shinhanDataAdaptor} from "./shinhan";

const render = store =>
    document.getElementById("table-wrapper").innerHTML = table({
        thead: thead(),
        trs: store.records.map(tr)
    });

let store = {};

store = {
    ...store, ...{
        records: getShinhanData().map(shinhanDataAdaptor)
    }
};
render(store);
