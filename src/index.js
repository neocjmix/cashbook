import {getShinhanData, shinhanDataAdaptor} from "./shinhan";
import RecordTable from "./components/RecordTable";
import Controller from "./framework/Controller";

const controller = new Controller(document.getElementById("table-wrapper"), RecordTable, {
    records : []
});

controller.update({
    ...controller.state, ...{
        records: getShinhanData().map(shinhanDataAdaptor)
    }
});