export default class SearchForm {
    constructor(formArea, loaderArea) {
        this.formArea = formArea;
        this.loaderArea = loaderArea;
        this.fillFormQuery();
    }

    fillFormQuery() {
        let params = new URLSearchParams(location.search);
        if (params.has('query')) {
            this.formArea.value = params.get('query');
        }
    }

    bindCallback = async function (updateCallback, clearCallback) {
        this.formArea.onkeyup = this.debounce((e) => {
            clearCallback();
            this.addQuery();
            this.onSearch(updateCallback);
        }, 1000);

        window.onload = () => {
            if (this.formArea.value) {
                this.onSearch(updateCallback);
            }
        }
    }

    addQuery = () => {
        window.history.pushState({}, null, `?query=${this.formArea.value}`)
    }

    debounce(callback, delayInMs) {
        let timeout;
        return (...args) => {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => callback.apply(context, args), delayInMs || 0);
        };
    }

    onSearch = async function (callbackFunction) {
        this.urlSearch = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${this.formArea.value}&limit=10&exchange=NASDAQ`;
        this.showLoader(true, this.loaderArea);
        this.getDataFromServer(this.urlSearch).then((result) => {
            const urlProfiles = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quote/${this.getStringCompanies(result)}`;
            console.log(urlProfiles);
            this.getDataFromServer(urlProfiles).then((result) => {
                this.showLoader(false, this.loaderArea);
                callbackFunction(result, this.formArea.value);
            });
        });
    }

    getDataFromServer = async function (url) {
        try {
            const response = await fetch(url);
            if (response.status !== 200 && response.status !== 201) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                let text = await response.text();
                console.log(text);
                return [];
            }
            let data = await response.json()
            console.log(data);
            return [...data];
        } catch (err) {
            console.log('Fetch Error :-S', err);
        };
    }

    showLoader = function (show, loaderArea) {
        if (show && !loaderArea.hasChildNodes()) {
            let loaderElement = document.createElement('div');
            loaderElement.className = "loader";
            loaderArea.appendChild(loaderElement);
        } else if (!show && loaderArea.hasChildNodes()) {
            loaderArea.innerHTML = '';
        }
    }

    getStringCompanies = function (listData) {
        let strOfsym = "";
        for (const element of listData) {
            if (!strOfsym) {
                strOfsym += element.symbol;
            } else {
                strOfsym += ',' + element.symbol;
            }
        }
        return strOfsym;
    }
}