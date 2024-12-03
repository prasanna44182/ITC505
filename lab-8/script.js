// Function to sanitize input and prevent XSS
function sanitizeInput(input) {
    // Create a temporary div element
    let element = document.createElement('div');
    
    // Set the input as the text content, which automatically escapes HTML tags
    element.innerText = input;
    
    // Return the sanitized string (with HTML entities like <, >, &, etc.)
    return element.innerHTML;
}

// Function to validate form fields
function validateForm() {
    // Get the form input values
    let firstName = sanitizeInput(document.getElementById("firstName").value);
    let lastName = sanitizeInput(document.getElementById("lastName").value);
    let email = sanitizeInput(document.getElementById("email").value);
    let password = sanitizeInput(document.getElementById("password").value);
    let confirmPassword = sanitizeInput(document.getElementById("confirmPassword").value);
    
    // Variable to hold error messages
    let errorMessage = '';

    // Check if any fields are empty
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        errorMessage = "All fields must be filled out.";
    }

    // Validate email format using regex
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        errorMessage = "Please enter a valid email address.";
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        errorMessage = "Passwords do not match.";
    }

    // If there's an error message, show it and prevent form submission
    if (errorMessage) {
        alert(errorMessage);
        return false;
    }

    // If all validations pass, show success message and allow form submission
    alert("Data submitted successfully!");
    return true;  // Allow form submission
}
