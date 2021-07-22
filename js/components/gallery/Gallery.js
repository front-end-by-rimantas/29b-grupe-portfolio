class Gallery {
    constructor(selector, data) {
        this.selector = selector;
        this.data = data;

        this.DOM = null;
        this.maxItems = 3;
        this.renderingStrategiesOptions = ['first', 'last', 'random', 'xyz'];
        this.renderingStrategy = this.renderingStrategiesOptions[0];
        this.validItems = [];
        this.usedItems = [];

        this.init();
    }

    init() {
        // validacijos
        if (!this.isValidSelector() ||
            !this.isValidData() ||
            !this.findTargetElement() ||
            !this.filterOnlyValidDataList()) {
            return false;
        }

        // logika
        this.filterContentList();
        this.render();

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

    filterOnlyValidDataList() {
        for (const item of this.data.list) {
            if (this.isValidItem(item)) {
                this.validItems.push(item);
            }
        }

        if (this.validItems.length === 0) {
            return false;
        } else {
            return true;
        }
    }

    isValidItem(item) {
        if (typeof item !== 'object' ||
            item === null ||
            Array.isArray(item)) {
            return false;
        }

        if (typeof item.img !== 'string' ||
            item.img === '') {
            return false;
        }

        if (typeof item.alt !== 'string' ||
            item.alt === '') {
            return false;
        }

        if (typeof item.text !== 'string' ||
            item.text === '') {
            return false;
        }

        if (typeof item.link !== 'string' ||
            item.link === '') {
            return false;
        }

        if (!Array.isArray(item.tags) ||
            item.tags.length === 0) {
            return false;
        }

        const validTags = [];
        for (const tag of item.tags) {
            if (typeof tag === 'string' &&
                tag !== '') {
                validTags.push(tag);
            }
        }
        if (validTags.length === 0) {
            return false;
        }

        return true;
    }

    filterContentList() {
        if (this.renderingStrategy === 'first') {
            this.filterContentListFirst();
        }

        if (this.renderingStrategy === 'last') {
            this.filterContentListLast();
        }

        if (this.renderingStrategy === 'random') {
            this.filterContentListRandom();
        }
    }

    filterContentListFirst() {
        const validCount = this.validItems.length;

        if (validCount <= this.maxItems) {
            this.usedItems = this.validItems;
        } else {
            this.usedItems = this.validItems.slice(0, this.maxItems);
        }
    }

    filterContentListLast() {
        const validCount = this.validItems.length;

        if (validCount <= this.maxItems) {
            this.usedItems = this.validItems;
        } else {
            this.usedItems = this.validItems.slice(validCount - this.maxItems, validCount);
        }
    }

    filterContentListRandom() {
        const validCount = this.validItems.length;

        const count = validCount <= this.maxItems ? validCount : this.maxItems;

        // itraukiame tik norimu elementu index'us
        const selectedIndexes = [];

        while (selectedIndexes.length < count) {
            const randomIndex = Math.floor(Math.random() * validCount);
            if (!selectedIndexes.includes(randomIndex)) {
                selectedIndexes.push(randomIndex);
            }
        }

        for (const index of selectedIndexes) {
            this.usedItems.push(this.validItems[index]);
        }
    }

    render() {
        let itemsHTML = '';

        for (const item of this.usedItems) {
            itemsHTML += this.generateContentItemHTML(item);
        }

        let HTML = `<div class="filter">
                        <div class="tag active">All</div>
                        ${this.generateFilterTagsHTML()}
                    </div>
                    <div class="content">
                        ${itemsHTML}
                    </div>`;

        this.DOM.innerHTML = HTML;
    }

    generateFilterTagsHTML() {
        let HTML = '';

        let allTags = [];
        for (const item of this.usedItems) {
            allTags = [...allTags, ...item.tags];
        }

        const uniqueTags = [];
        for (const tag of allTags) {
            if (!uniqueTags.includes(tag.toLowerCase())) {
                uniqueTags.push(tag.toLowerCase());
            }
        }

        for (const tag of uniqueTags) {
            HTML += `<div class="tag">${tag}</div>`;
        }

        return HTML;
    }

    generateContentItemHTML(item) {
        return `<div class="item">
                    <img src="${this.data.imgPath + item.img}" alt="${item.alt}">
                    <div class="overlay">
                        <div class="title">${item.text}</div>
                        <div class="actions">
                            <a href="${item.link}" class="fa fa-link"></a>
                            <i class="fa fa-search-plus"></i>
                        </div>
                    </div>
                </div>`;
    }
}

export { Gallery }