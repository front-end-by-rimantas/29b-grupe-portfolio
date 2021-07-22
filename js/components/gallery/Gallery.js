class Gallery {
    constructor(selector, data) {
        this.selector = selector;
        this.data = data;

        this.DOM = null;
        this.maxItems = 3;
        this.renderingStrategiesOptions = ['first', 'last', 'random'];
        this.renderingStrategy = this.renderingStrategiesOptions[0];

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
        // events
    }

    isValidSelector() {
        if (typeof this.selector !== 'string' ||
            this.selector === '') {
            return false;
        }
        return true;
    }

    isValidData() {
        // this.data turi buti tikras objektas
        if (typeof this.data !== 'object' ||
            this.data === null ||
            Array.isArray(this.data)) {
            return false;
        }

        // this.data.imgPath turi buti ne tuscias tekstas
        const imgPath = this.data.imgPath;
        if (typeof imgPath !== 'string' ||
            imgPath === '') {
            return false;
        }

        // this.data.list turi buti ne tuscias array (sarasas)
        const list = this.data.list;
        if (!Array.isArray(list) ||
            list.length === 0) {
            return false;
        }

        // this.data.maxItems turi buti teigiamas sveikasis skaicius
        const maxItems = this.data.maxItems;
        if (typeof maxItems === 'number' &&
            isFinite(maxItems) &&
            maxItems > 0 &&
            maxItems % 1 === 0) {
            this.maxItems = maxItems;
        }

        // this.data.renderingStrategy turi buti ne tuscias tekstas ir priklausyti imanomu strategiju sarasui
        const renderingStrategy = this.data.renderingStrategy;
        if (typeof renderingStrategy === 'string' &&
            renderingStrategy !== '' &&
            this.renderingStrategiesOptions.includes(renderingStrategy)) {
            this.renderingStrategy = renderingStrategy;
        }

        return true;
    }

    findTargetElement() {
        this.DOM = document.querySelector(this.selector);
        return !!this.DOM;
    }
}

export { Gallery }