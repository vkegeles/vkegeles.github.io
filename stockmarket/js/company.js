import Utils from "./Utils.js";
let companyPage = function () {
    let params = new URLSearchParams(location.search);
    const symbol = params.get('symbol');
    const companyName = document.getElementById("company-name");
    const descriptionBlock = document.getElementById("description");
    const priceBlock = document.getElementById("price");
    const buttonArea = document.getElementById("btn-area");
    const loaderAreaProfile = document.getElementById("loader-area");
    const loaderAreaChart = document.getElementById("loader-area-chart");


    const url_profile = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol} `;
    getDataFromServer(url_profile, "profile", fillProfile, loaderAreaProfile);
    const url_history = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`;
    getDataFromServer(url_history, "historical", fillChart, loaderAreaChart);


    const chart = document.getElementById('myChart').getContext('2d');
    let gradient = chart.createLinearGradient(0, 0, 0, 450);
    gradient.addColorStop(0, 'rgba(89, 64, 153,0.9)');
    gradient.addColorStop(0.5, 'rgba(89, 64, 153,0.5)');
    gradient.addColorStop(1, 'rgba(89, 64, 153,0.2)');

    async function getDataFromServer(url, field, updateFunction, loaderArea) {
        showLoader(true, loaderArea);
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
            let result = data[field];
            console.log(result);
            showLoader(false, loaderArea);
            updateFunction(result);
        } catch (err) {
            console.log('Fetch Error :-S', err);
        };
    }


    function showLoader(show, loaderArea) {
        if (show && !loaderArea.hasChildNodes()) {
            let loaderElement = document.createElement('div');
            loaderElement.className = "loader";
            loaderArea.appendChild(loaderElement);
        } else if (!show && loaderArea.hasChildNodes()) {
            loaderArea.innerHTML = '';
        }
    }

    function fillProfile(company) {
        let companyImg = Utils.createDOMElement({
            tagName: 'img',
            className: "pull-left m-3",
            src: company.image,
            alt: `logo`
        })
        companyName.appendChild(companyImg);
        companyName.append(company.companyName);
        if (company.description) {
            buttonArea.innerHTML = `<button class="btn btn-light " type="button" data-toggle="collapse" data-target="#description"> Description </button>`;

            let companyDescription = Utils.createDOMElement({
                tagName: 'p',
                textContent: company.description
            })
            descriptionBlock.appendChild(companyDescription);
        }
        let stockPrice = Utils.createDOMElement({
            tagName: 'h2',
            textContent: Utils.formatMoney(company.price, company.currency)
        })
        priceBlock.appendChild(stockPrice);

        let priceChange = Utils.createDOMElement({
            tagName: 'h2',
            className: company.changes >= 0 ? "green-light" : "red",
            textContent: company.changesPercentage
        })
        priceBlock.appendChild(priceChange);

    }


    function fillChart(array) {
        let dateArr = [],
            valueArr = [];
        for (const element of array) {
            dateArr.unshift(element.date);
            valueArr.unshift(element.close);
        }
        createChart(dateArr, valueArr)
    }


    function createChart(dateArr, valueArr) {
        let data = {
            labels: dateArr,
            datasets: [{
                label: 'Stock Price History',
                fill: true,
                backgroundColor: gradient,
                pointBackgroundColor: 'rgba(89, 64, 153,1 )',
                pointRadius: 0,
                borderWidth: 1,
                borderColor: 'rgba(89, 64, 153,1 )',
                pointDot: false,
                data: valueArr,
            }]
        };

        let options = {
            responsive: true,
            title: {
                display: false,
                text: 'Stock Price History'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Date'
                    },
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 20,
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Close'
                    },
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 20
                    }
                }]
            }
        }

        let chartInstance = new Chart(chart, {
            type: 'line',
            data: data,
            options: options
        });
    };



}();