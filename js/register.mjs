import { APIURL } from "./api.mjs";

const name = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");
const registerForm = document.querySelector("#register-form");

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

  if (passVal !== confirmPassVal) return alert("passwords must match!");

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
