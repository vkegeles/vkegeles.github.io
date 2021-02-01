import Utils from "./Utils.js";

export default class Marquee {
    marqueeArea;
    constructor(marqueeArea) {
        this.marqueeArea = marqueeArea;
        this.urlStock = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/stock/list`;
    }

    load = function () {
        this.getDataFromServer(this.urlStock);
    }

    getDataFromServer = async function (url) {
        try {
            const response = await fetch(url);
            if (response.status !== 200 && response.status !== 201) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                let text = await response.text();
                console.log(text);
                return;
            }
            let data = await response.json()
            console.log(data);
            let result = [...data];
            this.makeStock(result);
        } catch (err) {
            console.log('Fetch Error :-S', err);
        };
    }

    makeStock(stockData) {
        let str = "";
        let limit = 200;
        if (limit > stockData.length) {
            limit = stockData.length;
        }
        for (let i = 0; i < limit; i++) {
            str += stockData[i].symbol + '=' + Utils.formatMoney(stockData[i].price, "USD") + ' ';
        }
        let stockText = document.createElement("div");
        stockText.textContent = this.first_half(str);
        console.log(stockText.textContent);
        stockText.className = "marquee-div";
        stockText.style.animationDuration = limit * 4 + 's';
        stockText.style.animationDelay = '-' + (limit * 2) + 's';
        this.marqueeArea.appendChild(stockText);

        let stockText2 = document.createElement("div");
        stockText2.textContent = this.second_half(str);
        console.log(stockText2.textContent);
        stockText2.className = "marquee-div-delay";
        stockText2.style.animationDuration = limit * 4 + 's';
        this.marqueeArea.appendChild(stockText2);
        this.marqueeArea.style.width = stockText.style.width

    }

    first_half(str) {
        if (str.length % 2 == 0) {
            return str.slice(0, str.length / 2);
        }
        return " " + str.slice(0, (str.length - 1) / 2);
    }

    second_half(str) {
        if (str.length % 2 == 0) {
            return str.slice(str.length / 2, str.length);
        }
        return str.slice((str.length - 1) / 2, str.length);
    }

}