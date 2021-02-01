import Utils from "./Utils.js";
export default class SearchResult {
    constructor(resultArea) {
        this.resultArea = resultArea;
    }

    renderResults = function (companies, searchValue) {
        this.clearResults();
        if (companies.length == 0) {
            let message = Utils.createDOMElement({
                tagName: 'div',
                className: "col-sm red",
                textContent: "Not found. Try another search"
            })
            this.resultArea.appendChild(message);
        } else {
            for (let company of companies) {
                let card = Utils.createDOMElement({
                    tagName: 'div',
                    className: "card"
                })
                let companyImg = Utils.createDOMElement({
                    tagName: 'img',
                    className: "card-img-top border-bottom",
                    src: `https://financialmodelingprep.com/images-New-jpg/${company.symbol}.jpg`,
                    alt: `logo`
                })
                let companyInfo = Utils.createDOMElement({
                    tagName: 'div',
                    className: "card-body"
                })
                let companyNameA = Utils.createDOMElement({
                    tagName: 'a',
                    className: "card-title",
                    href: `./company.html?symbol=${company.symbol}`,
                    innerHTML: `${company.name} (${company.symbol})`
                })
                this.highlight(companyNameA, searchValue);

                let priceChangeDiv = Utils.createDOMElement({
                    tagName: 'div',
                    className: "card-text " + ((company.changesPercentage >= 0) ? "green" : "red"),
                    textContent: Utils.formatPercentage(company.changesPercentage / 100)
                })

                this.resultArea.appendChild(card);
                card.appendChild(companyImg);
                card.appendChild(companyInfo);

                companyInfo.appendChild(companyNameA);
                companyInfo.appendChild(priceChangeDiv);
            }
        }
    }

    highlight = function (area, searchValue) {
        let search = searchValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        let re = new RegExp(search, 'ig');
        if (search.length > 0) {
            area.innerHTML = area.innerHTML.replace(re, `<mark>$&</mark>`);
        }
    }

    clearResults = function () {
        this.resultArea.innerHTML = "";
    }
}