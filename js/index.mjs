import { APIURL } from "./api.mjs";

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const loginForm = document.querySelector("#login-form");
const errorContainer = document.querySelector("#error-container");

const baseURL = `${APIURL}/social/auth/login`;

// event listener for form
loginForm.addEventListener("submit", login);

/**
 * function to log user in
 * @param {Object} e - event emitter object with preventDefault() function
 */
function login(e) {
  e.preventDefault(); // prevent default refresh
  let emailVal = email.value;
  let passVal = password.value;

  // Validate email domain
  if (!isValidEmail(emailVal)) {
    displayError(
      "Invalid email address. You can only login with noroff.no or stud.noroff.no email."
    );
    return;
  }

  const data = {
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
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      // console.log(data);
      if (data?.errors) {
        displayError(data.errors[0].message);
      } else if (data?.accessToken) {
        // store user in local storage
        localStorage.setItem("media-user", JSON.stringify(data));
        // take user to profile
        window.location.href = "/profile";
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error.message);
      displayError("An error occurred. Please try again.");
    });
}

/**
 * The email value must be a valid stud.noroff.no or noroff.no email address.
 * @param {string} email - The email address to validate
 * @returns {boolean} - True if the email domain is valid, false otherwise
 */
function isValidEmail(email) {
  const validDomains = ["noroff.no", "stud.noroff.no"];
  const domain = email.split("@")[1];
  return validDomains.includes(domain);
}

/**
 * Display error message in the error container
 * @param {string} errorMessage - The error message to display
 */
function displayError(errorMessage) {
  errorContainer.innerHTML = `<p class="error-message">${errorMessage}</p>`;
}
