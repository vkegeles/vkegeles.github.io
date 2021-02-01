const cities = [{
        city: "Magnitogorsk",
        src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d152233.01794044397!2d58.91929476476142!3d53.40336322714271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x43d12593a4f92e4f%3A0xdcb8574965828068!2z0JzQsNCz0L3QuNGC0L7Qs9C-0YDRgdC6LCDQp9C10LvRj9Cx0LjQvdGB0LrQsNGPINC-0LHQuy4sINCg0L7RgdGB0LjRjw!5e0!3m2!1sru!2sil!4v1600718294166!5m2!1sru!2sil"

    },
    {
        city: "Chelyabinsk",
        src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d291812.1935034817!2d61.12838700421243!3d55.15208014436863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x43c592cb104a3a8d%3A0xef224a2a6d1711bf!2z0KfQtdC70Y_QsdC40L3RgdC6LCDQp9C10LvRj9Cx0LjQvdGB0LrQsNGPINC-0LHQuy4sINCg0L7RgdGB0LjRjw!5e0!3m2!1sru!2sil!4v1600720678563!5m2!1sru!2sil"
    },
    {
        city: "Naharia",
        src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53528.88192467039!2d35.10175395077443!3d33.0155025828962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151dce1f090dac99%3A0x4cad9e4e66b0e416!2z0J3QsNCz0LDRgNC40Y8!5e0!3m2!1sru!2sil!4v1600720735427!5m2!1sru!2sil"
    },
    {
        city: "Netanya",
        src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107912.33635336567!2d34.79034722308585!3d32.30485420952424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d400493c075d5%3A0x2cd995be543c3f22!2z0J3QtdGC0LDQvdC40Y8!5e0!3m2!1sru!2sil!4v1600720788774!5m2!1sru!2sil"
    }
];

const buttonPrev = document.getElementById("prev");
const buttonNext = document.getElementById("next");
const iFrame = document.getElementById("city-map");

console.log(" button" + buttonPrev);

let currentCityIndex = 0;
iFrame.src = cities[currentCityIndex].src;
setupButtons(currentCityIndex);

buttonPrev.addEventListener('click', event => {
    currentCityIndex--;
    console.log("prev button " + currentCityIndex);
    iFrame.src = cities[currentCityIndex].src;
    setupButtons(currentCityIndex);
});

buttonNext.addEventListener('click', event => {
    currentCityIndex++;
    console.log("next button " + currentCityIndex);
    iFrame.src = cities[currentCityIndex].src;
    setupButtons(currentCityIndex);
});

function setupButtons(currentCityIndex) {
    if (currentCityIndex == 0) {
        buttonPrev.disabled = true;
    } else {
        buttonPrev.disabled = false;
    }
    if (currentCityIndex == cities.length - 1) {
        buttonNext.disabled = true;
    } else {
        buttonNext.disabled = false;
    }
}