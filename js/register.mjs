const name = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");
const registerForm = document.querySelector("#register-form");

const baseURL = "https://api.noroff.dev/api/v1/social/auth/register";

// event listener for form
registerForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent default refresh
  let nameVal = name.value.trim();
  let emailVal = email.value;
  let passVal = password.value;
  let confirmPassVal = confirmPassword.value;

  // validation
  if (!validateName(nameVal)) return alert("Invalid name!");
  if (!validateEmail(emailVal))
    return alert("Email must be a valid @noroff.no or @stud.noroff.no!");
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
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data?.errors) return alert(data.errors[0].message);

      if (data?.id) alert("successfully registered, login now!");
      window.location.href = "/index.html";
    });
});

function validateName(name) {
  // Define a regular expression pattern for valid names
  var nameRegex = /^[a-zA-Z0-9_]+$/;

  // Return the validation result
  return nameRegex.test(name);
}

function validateEmail(email) {
  // Define a regular expression pattern for valid email addresses
  var emailRegex = /^[a-zA-Z0-9._-]+@(stud\.)?noroff\.no$/;

  // Return the validation result
  return emailRegex.test(email);
}
