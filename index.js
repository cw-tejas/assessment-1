document.querySelectorAll('input[type="text"], input[type="email"], textarea').forEach((input) => {
    input.addEventListener('input', () => {
      const errorMessage = input.nextElementSibling;
      if (errorMessage) {
        input.classList.remove("primary-red-border");
        errorMessage.style.display = 'none';
      }
    });
  });

document.querySelectorAll('input[name="qType"]').forEach((radio) => {
radio.addEventListener('change', () => {
    const errorMessage = document.querySelector('.query-type-message');
    if (errorMessage) {
    errorMessage.style.display = 'none';
    }
});
});

// Add event listener to consent checkbox
document.getElementById('consent').addEventListener('change', () => {
const errorMessage = document.querySelector('.consent-message');
if (errorMessage) {
    errorMessage.style.display = 'none';
}
});

document
  .querySelectorAll('.checkbox-item input[type="radio"]')
  .forEach((radio) => {
    radio.addEventListener("change", function () {
      // Remove 'selected' class from all radio cards
      document
        .querySelectorAll(".checkbox-item")
        .forEach((card) => card.classList.remove("selected-checkbox"));

      // Add 'selected' class to the parent of the clicked radio button
      this.parentElement.classList.add("selected-checkbox");
    });
  });

document.querySelector('button').addEventListener('click', (event) => {
    event.preventDefault();
    submitForm();
});

// Verify all fields and display errors
let isValid = true;
function verifyAllFields() {
    verifyName();
    verifyEmail();    
    verifyQueryType();
    verifyMessage();
    return isValid;
}

// submit
function submitForm() {
    if (!verifyAllFields()) {
        return;
    }

    showToaster();

    document.getElementById('fName').value = '';
    document.getElementById('lName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
    document.getElementById('consent').checked = false;
    document.querySelectorAll('.checkbox-item').forEach((card) => card.classList.remove('selected-checkbox'));
    document.querySelector('input[name="qType"]').checked = false;
}

// toaster
function showToaster() {
    const toaster = document.querySelector('.toaster');
    toaster.style.display = 'block';
    setTimeout(() => {
        toaster.style.display = 'none';
    }, 3000);
}


// verfiy name
function verifyName() {
    const fName = document.getElementById('fName');
    const lName = document.getElementById('lName');
    const fNameErrorMessage = fName.nextElementSibling;
    const lNameErrorMessage = lName.nextElementSibling;

    if (fName.value.trim() === '') {
        fName.classList.add('primary-red-border');
        fNameErrorMessage.style.display = 'block';
        isValid = false;
    } else {
        fName.classList.remove('primary-red-border');
        fNameErrorMessage.style.display = 'none';
        isValid = true;
    }

    if (lName.value.trim() === '') {
        lName.classList.add('primary-red-border');
        lNameErrorMessage.style.display = 'block';
        isValid = false;
    } else {
        lName.classList.remove('primary-red-border');
        lNameErrorMessage.style.display = 'none';
        isValid = true;
    }
}

// Verify email
function verifyEmail() {
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailErrorMessage = email.nextElementSibling;

    if (email.value.trim() === '') {
        email.classList.add('primary-red-border');
        emailErrorMessage.style.display = 'block';
        isValid = false;
    } else if (!email.value.match(emailRegex)) {
        email.classList.add('primary-red-border');
        emailErrorMessage.style.display = 'block';
        isValid = false;
    } else {
        email.classList.remove('primary-red-border');
        emailErrorMessage.style.display = 'none';
        isValid = true;
    }
}

// Verify query type
function verifyQueryType() {
    const queryType = document.querySelector('input[name="qType"]:checked');
    if (!queryType) {
        const queryTypeErrorMessage = document.querySelector('.query-type-message');
        queryTypeErrorMessage.style.display = 'block';
        isValid = false;
    } else {
        const queryTypeErrorMessage = document.querySelector('.query-type-message');
        queryTypeErrorMessage.style.display = 'none';
        isValid = true;
    }
}

// verify message
function verifyMessage() {
    const message = document.getElementById('message');
    const messageErrorMessage = message.nextElementSibling;

    if (message.value.trim() === '') {
        message.classList.add('primary-red-border');
        messageErrorMessage.style.display = 'block';
        isValid = false;
    } else {
        message.classList.remove('primary-red-border');
        messageErrorMessage.style.display = 'none';
        isValid = true;
    }

    // Verify consent
    const consent = document.getElementById('consent');
    const consentErrorMessage = document.querySelector('.consent-message');

    if (!consent.checked) {
        consentErrorMessage.style.display = 'block';
        isValid = false;
    } else {
        consentErrorMessage.style.display = 'none';
        isValid = true;
    }
}