import Marquee from "./Marquee.js";
import SearchResult from "./SearchResult.js";
import SearchForm from "./SearchForm.js";

let main = function () {
    const marquee = new Marquee(document.getElementById("stock-marquee"));
    marquee.load();
    const form = new SearchForm(document.getElementById("search-input"), document.getElementById("loader-area-search"));
    const results = new SearchResult(document.getElementById("search-list"));

    form.bindCallback((companies, searchValue) => {
            results.renderResults(companies, searchValue)
        },
        () => {
            results.clearResults()
        })
}();