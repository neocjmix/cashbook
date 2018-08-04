import * as Rx from "rxjs";

class Controller {
    constructor(container, template, initStore = {}) {
        this.container = container;
        this.template = template;
        this.state = initStore;
        this.storeStream = new Rx.Subject();
        this.storeStream.subscribe(state =>
            this.container.innerHTML = this.template(state));

        this.storeStream.next(this.state);
    }

    update(newState) {
        this.state = newState;
        this.storeStream.next(this.state);
    }
}

export default Controller