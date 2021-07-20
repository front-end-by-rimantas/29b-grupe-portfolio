class Services {
    constructor(selector, data) {
        this.selector = selector;
        this.data = data;

        this.DOM = null;

        this.init();
    }

    init() {
        // validacijos
        if (!this.isValidSelector() ||
            !this.isValidData() ||
            !this.findTargetElement()) {
            return false;
        }

        // logika
        this.render();
    }

    isValidSelector() {
        return true;
    }

    isValidData() {
        return true;
    }

    findTargetElement() {
        return true;
    }

    render() {
        console.log('rendering....');
    }
}

export { Services }