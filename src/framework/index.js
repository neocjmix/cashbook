import * as Rx from "rxjs";
import * as Immutable from "immutable";

class Store {
    constructor(initState = {}) {
        this.state = Immutable.Map(initState);
        this.stream = new Rx.Subject();
    }

    update(newState) {
        this.state = this.state.mergeDeep(newState);
        this.stream.next(this.state.toJS());
    }
}

class Controller {
    constructor(container, template, store = new Store()) {
        this.container = container;
        this.template = template;
        this.store = store;
        this.store.stream.forEach(state =>
            this.container.innerHTML = this.template(state));
    }
}

export {Controller, Store}