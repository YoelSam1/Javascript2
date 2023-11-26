const email = document.querySelector("#email");
const password = document.querySelector("#password");
const loginForm = document.querySelector("#login-form");

const baseURL = "https://api.noroff.dev/api/v1/social/auth/login";

// event listener for form
loginForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent default refresh
  let emailVal = email.value;
  let passVal = password.value;

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
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data?.errors) return alert(data.errors[0].message);

      if (data?.accessToken) {
        // store user in local storage
        localStorage.setItem("media-user", JSON.stringify(data));
        // take user to profile
        window.location.href = "/profile";
      }
    });
});
