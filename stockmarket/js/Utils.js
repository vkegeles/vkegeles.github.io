export default class Utils {
    static formatMoney = function (money, currency) {
        if (currency) {
            return Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currency,
            }).format(money);
        } else {
            return Intl.NumberFormat('en-US', {
                style: 'decimal',
            }).format(money);
        }
    }

    static formatPercentage = function (value) {
        let sign = value >= 0 ? "+" : "";

        return sign + Intl.NumberFormat('en-US', {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    }

    static createDOMElement(dataObj) {
        let element = document.createElement(dataObj.tagName);
        for (let key in dataObj) {
            if (key != "tagName") {
                try {
                    element[key] = dataObj[key];
                } catch (err) {
                    console.log('key is incorrect', key);
                };
            }
        }
        return element;
    }
}