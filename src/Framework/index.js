import * as Rx from "rxjs";
import * as Immutable from "immutable";

class Store {
    constructor(initState = {}) {
        this.state = Immutable.Map(initState);
        this.stream = new Rx.Subject();
    }

    update(newState) {
        this.state = this.state.mergeDeep(newState);
        this.refresh();
    }

    subscribe(callback){
        this.stream.forEach(callback);
        this.refresh();
    }

    refresh() {
        this.stream.next(this.state.toJS());
    }
}

function bind (container, template, store = new Store()){
    store.subscribe(state => container.innerHTML = template(state));
}

export {bind, Store}