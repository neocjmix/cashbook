import {getShinhanData, shinhanDataAdaptor} from "./shinhan";
import RecordTable from "./components/RecordTable";

class Controller{
    constructor(container, template, initStore = {}){
        this.container = container;
        this.template = template;
        this.store = initStore;
    }

    render(){
        this.container.innerHTML = this.template(this.store);
    }
}

const controller = new Controller(document.getElementById("table-wrapper"), RecordTable);
controller.store = {
    ...controller.store, ...{
        records: getShinhanData().map(shinhanDataAdaptor)
    }
};
controller.render();
