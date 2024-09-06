// Add event listeners for input fields to remove error messages on input
document.querySelectorAll('input[type="text"], input[type="email"], textarea').forEach((input) => {
    input.addEventListener('input', () => {
        const errorMessage = input.parentElement.querySelector('.error-message');
        if (errorMessage) {
            input.classList.remove("primary-red-border");
            errorMessage.remove();
        }
    });
});

document.querySelectorAll('input[name="qType"]').forEach((radio) => {
    radio.addEventListener('change', () => {
        const errorMessage = document.querySelector('.query-type-field .error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    });
});

// Add event listener to consent checkbox
document.getElementById('consent').addEventListener('change', () => {
    const errorMessage = document.querySelector('.consent-field .error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
});

// Add selected class on radio selection
document.querySelectorAll('.checkbox-item input[type="radio"]').forEach((radio) => {
    radio.addEventListener('change', function () {
        document.querySelectorAll(".checkbox-item").forEach((card) => card.classList.remove("selected-checkbox"));
        this.parentElement.classList.add("selected-checkbox");
    });
});

// Handle form submission
document.querySelector('button').addEventListener('click', (event) => {
    event.preventDefault();
    submitForm();
});

let isValid = true;

// Remove all error messages before resetting the form
function clearErrorMessages() {
    document.querySelectorAll('.error-message').forEach((errorMessage) => {
        errorMessage.remove();
    });
    document.querySelectorAll('.primary-red-border').forEach((element) => {
        element.classList.remove('primary-red-border');
    });
}

function verifyAllFields() {
    isValid = true;  // Reset validation status
    verifyName();
    verifyEmail();    
    verifyQueryType();
    verifyMessage();
    verifyConsent();  // Include consent verification
    return isValid;
}

// Submit form
function submitForm() {
    clearErrorMessages(); // Clear previous error messages before validation

    if (!verifyAllFields()) {
        return;
    }

    showToaster();

    // Reset form fields after successful submission
    document.getElementById('fName').value = '';
    document.getElementById('lName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
    document.getElementById('consent').checked = false;
    document.querySelectorAll('.checkbox-item').forEach((card) => card.classList.remove('selected-checkbox'));
    document.querySelector('input[name="qType"]').checked = false;
}

// Show toaster notification
function showToaster() {
    const toaster = document.querySelector('.toaster');
    toaster.style.display = 'block';
    setTimeout(() => {
        toaster.style.display = 'none';
    }, 3000);
}

// Create error message element
function createErrorMessage(field, message) {
    let existingErrorMessage = field.querySelector('.error-message');
    if (existingErrorMessage) {
        return; // If error message already exists, do nothing
    }

    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.style.color = 'red';
    errorElement.textContent = message;
    field.appendChild(errorElement);
}

// Verify first and last names
function verifyName() {
    const nameRegex = /^[a-zA-Z\s]+$/;
    const fName = document.getElementById('fName');
    const lName = document.getElementById('lName');

    if (fName.value.trim() === '') {
        fName.classList.add('primary-red-border');
        createErrorMessage(fName.parentElement, 'First name is required');
        isValid = false;
    } else if (!fName.value.match(nameRegex)) {
        fName.classList.add('primary-red-border');
        createErrorMessage(fName.parentElement, 'Invalid first name');
        isValid = false;
    }

    if (lName.value.trim() === '') {
        lName.classList.add('primary-red-border');
        createErrorMessage(lName.parentElement, 'Last name is required');
        isValid = false;
    } else if (!lName.value.match(nameRegex)) {
        lName.classList.add('primary-red-border');
        createErrorMessage(lName.parentElement, 'Invalid last name');
        isValid = false;
    }
}

// Verify email address
function verifyEmail() {
    const email = document.getElementById('email');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email.value.trim() === '') {
        email.classList.add('primary-red-border');
        createErrorMessage(email.parentElement, 'Email is required');
        isValid = false;
    } else if (!email.value.match(emailRegex)) {
        email.classList.add('primary-red-border');
        createErrorMessage(email.parentElement, 'Please enter a valid email address');
        isValid = false;
    }
}

// Verify query type selection
function verifyQueryType() {
    const queryType = document.querySelector('input[name="qType"]:checked');
    const queryTypeField = document.querySelector('.query-type-field');
    
    if (!queryType) {
        createErrorMessage(queryTypeField, 'Please select a query type');
        isValid = false;
    }
}

// Verify message field
function verifyMessage() {
    const message = document.getElementById('message');

    if (message.value.trim() === '') {
        message.classList.add('primary-red-border');
        createErrorMessage(message.parentElement, 'Message is required');
        isValid = false;
    }
}

// Verify consent checkbox
function verifyConsent() {
    const consent = document.getElementById('consent');
    const consentField = document.querySelector('.consent-field');

    if (!consent.checked) {
        createErrorMessage(consentField, 'Please consent to submit this form');
        isValid = false;
    }
}
