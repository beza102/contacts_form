document.getElementById('contact-form').onsubmit = (event) => {
    clearErrors();
    let isValid = true;

    // Validate first name
    let fname = document.getElementById('fname').value.trim();
    if (fname === "") {
        document.getElementById("err-fname").style.display = "block";
        isValid = false;
    }

    // Validate last name
    let lname = document.getElementById('lname').value.trim();
    if (lname === "") {
        document.getElementById("err-lname").style.display = "block";
        isValid = false;
    }

    // Validate job title
    let title = document.getElementById('title').value.trim();
    if (title === "") {
        document.getElementById("err-title").style.display = "block";
        isValid = false;
    }

    // Validate company
    let company = document.getElementById('company').value.trim();
    if (company === "") {
        document.getElementById("err-company").style.display = "block";
        isValid = false;
    }

    // Validate LinkedIn URL
    let linkedin = document.getElementById('linkedin').value.trim();
    const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/.+$/;
    if (linkedin === "" || !linkedinRegex.test(linkedin)) {
        document.getElementById("err-linkedin").style.display = "block";
        isValid = false;
    }

    // Validate email
    let email = document.getElementById('email').value.trim();
    if (email === "" || email.indexOf("@") === -1 || email.indexOf(".") === -1) {
        document.getElementById("err-email").style.display = "block";
        isValid = false;
    }

    // Validate how we met
    let place = document.getElementById('place').value;
    if (place === "none") {
        document.getElementById("err-place").style.display = "block";
        isValid = false;
    }

    return isValid;
};

function clearErrors() {
    let errors = document.getElementsByClassName("err");
    for (let i = 0; i < errors.length; i++) {
        errors[i].style.display = "none";
    }
}