let navbarLinks = document.querySelector("#navbarSupportedContent");

const storedUser = JSON.parse(localStorage.getItem("media-user"));

/**
 * if there is a stored user available, then set links
 */
if (storedUser) {
  navbarLinks.innerHTML = `
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 text-center d-flex align-items-center">
              <li class="nav-item">
                <a
                  class="nav-link  fw-bold"
                  aria-current="page"
                  href="/feed"
                  >Feed</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link  fw-bold"
                  aria-current="page"
                  href="/profile"
                  >Profile</a
                >
              </li>
              <li class="nav-item">
                <button
                  class="nav-link  fw-bold"
                  aria-current="page"
                  id="logoutBtn"
                  >Logout</button>
              </li>
            </ul>
    `;
} else {
  navbarLinks.innerHTML = `
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 text-center">
              <li class="nav-item">
                <a class="nav-link  fw-bold" aria-current="page" href="/register"
                  >Register</a
                >
              </li>
        </ul>
    `;

  // window.location.href = "/";
}

/**
 * Retrieves the element with the id 'logoutBtn' and adds a click event listener.
 * When the button is clicked, it removes the 'media-user' from localStorage
 * and redirects the user to the home page ('/').
 */
document.addEventListener("DOMContentLoaded", function () {
  const logoutBtn = document.querySelector("#logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("media-user");
      window.location.href = "/";
    });
  }
});

//
