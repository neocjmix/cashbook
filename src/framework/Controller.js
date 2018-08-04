class Controller {
    constructor(container, template, initStore = {}) {
        this.container = container;
        this.template = template;
        this.store = initStore;
    }

    render() {
        this.container.innerHTML = this.template(this.store);
    }
}

export default Controller