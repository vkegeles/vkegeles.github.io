var form = document.getElementsByTagName("form")[0];
form.addEventListener("submit", function (e) {
    e.preventDefault();
    printData();
});

function printData() {
    var XHR = new XMLHttpRequest();
    let otputStr = "";

    otputStr += `First Name: ${form.querySelector("[name='firstname']").value}, `;
    otputStr += `Last Name: ${form.querySelector("[name='lastname']").value}, `;
    otputStr += `Email: ${form.querySelector("[name='email']").value}, `;
    otputStr += `Comment: ${form.querySelector("[name='comments']").value}, `;
    let radio = document.getElementsByName("rate");
    for (var i = 0, length = radio.length; i < length; i++) {
        if (radio[i].checked) {
            otputStr += `Rate: ${radio[i].value} stars.`;
        }
    }

    console.log(otputStr);
}

function checkForm() {
    console.log("checkform")
    let firstname = document.getElementById("firstname").value;
    let email = document.getElementById("email").value;
    let conmments = document.getElementById("conmments").value;

    var cansubmit = (firstname.length > 0) && (email.length > 0) && (conmments.length > 0);
    document.getElementById("myButton").disabled = !cansubmit;

};