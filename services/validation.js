export function validateForm(contact) {
    const errors = [];

    // Validate first name
    if (!contact.fname || contact.fname.trim() === "") {
        errors.push("First name is required");
    }

    // Validate last name
    if (!contact.lname || contact.lname.trim() === "") {
        errors.push("Last name is required");
    }

    // Validate job title
    if (!contact.title || contact.title.trim() === "") {
        errors.push("Title is required");
    }

    // Validate company
    if (!contact.company || contact.company.trim() === "") {
        errors.push("Company is required");
    }

    // Validate LinkedIn URL
    const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/.+$/;
    if (!contact.linkedin || !linkedinRegex.test(contact.linkedin.trim())) {
        errors.push("Valid LinkedIn URL is required");
    }

    // Validate email
    if (!contact.email || contact.email.trim() === "" || contact.email.indexOf("@") === -1 || contact.email.indexOf(".") === -1) {
        errors.push("Email is required and must be valid");
    }

    // Validate 'How we met'
    if (contact.place === "none") {
        errors.push("Select how we met");
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
}