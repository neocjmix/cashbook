import {getShinhanData, shinhanDataAdaptor} from "./shinhan";
import RecordTable from "./components/RecordTable";
import Controller from "./framework/Controller";

const controller = new Controller(document.getElementById("table-wrapper"), RecordTable);
controller.store = {
    ...controller.store, ...{
        records: getShinhanData().map(shinhanDataAdaptor)
    }
};
controller.render();
