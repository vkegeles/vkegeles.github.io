const langList = ["HTML", "CSS", "JavaScript"];
const footerText = document.getElementById("footer-page-text");
footerText.innerHTML = generateText(langList);

function generateText(arr) {
    let text = "This page was built using: "
    for (let i = 0; i < arr.length - 1; i++) {
        text += arr[i] + ', '
    };
    if (arr.length > 1) {
        text += 'and ';
    }
    text += arr[arr.length - 1];
    return text
}