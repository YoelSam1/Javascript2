const APIURL = "your_api_url_here"; // Replace with your actual API URL

const name = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");
const registerForm = document.querySelector("#register-form");
const errorContainer = document.querySelector("#error-container");

const baseURL = `${APIURL}/social/auth/register`;

// event listener for form
registerForm.addEventListener("submit", register);

/**
 * function to register a user
 * @param {Object} e - event emitter with preventDefault() function
 */
function register(e) {
  e.preventDefault(); // prevent default refresh
  let nameVal = name.value.trim();
  let emailVal = email.value;
  let passVal = password.value;
  let confirmPassVal = confirmPassword.value;

  // validation
  if (!isValidPasswordConfirmation(password.value, confirmPassVal)) {
    displayError("Passwords do not match.");
    return;
  }

  const data = {
    name: nameVal,
    email: emailVal,
    password: passVal,
  };

  fetch(baseURL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "Application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      if (data?.errors) {
        throw new Error(data.errors[0].message);
      }

      if (data?.id) {
        alert("Successfully registered, login now!");
        window.location.href = "/index.html";
      }
    })
    .catch((error) => {
      // console.error("Error:", error.message);
      alert("An error occurred. Please try again.");
      // can log the error or perform additional error handling here.
    });
}

/**
 * The password confirmation value must match the password.
 * @param {string} password - The password to compare
 * @param {string} confirmPass - The confirmation password to validate
 * @returns {boolean} - True if the passwords match, false otherwise
 */
function isValidPasswordConfirmation(password, confirmPass) {
  return password === confirmPass;
}

/**
 * Displays an error message in the specified error container.
 * @param {string} errorMessage - The error message to display
 */
function displayError(errorMessage) {
  errorContainer.innerHTML = `<p class="error-message">${errorMessage}</p>`;
}
