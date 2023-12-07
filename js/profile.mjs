const username = document.querySelector(".username");
const feedTitle = document.querySelector("#feedTitle");
const feedDescription = document.querySelector("#feedDescription");
const feedBtn = document.querySelector(".feedBtn");
let feedsContainer = document.querySelector(".feeds");
let updatingFeedId;

const storedUser = JSON.parse(localStorage.getItem("media-user"));

/**
 * if there is a stored user available, then proceed
 */
if (storedUser) {
  username.innerHTML = `
    <h1>Username: ${storedUser.name}</h1>
    <h1>Email: ${storedUser.email}</h1>
  `;
  const baseURL = `https://api.noroff.dev/api/v1/social/profiles/${storedUser.name}/posts`;

  fetch(baseURL, {
    method: "GET",
    headers: {
      "content-type": "Application/json",
      Authorization: "Bearer " + storedUser.accessToken,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      render(data);
    });

  feedBtn.addEventListener("click", createOrUpdateFeed);
}

/**
 * function to render data
 * @param {Array} data - array of objects with a created(date) property
 */
function render(data) {
  feedsContainer.innerHTML = "";

  if (data.length === 0) {
    feedsContainer.innerHTML = "<h2>No feed found, Add some</h2>";
    return;
  }

  data.forEach((feed) => {
    // const d = new Date(feed.created);
    feedsContainer.innerHTML += ` 
           <div class="card" style="width: 18rem">
              <div class="card-body">
                <h5 class="card-title">${feed.title}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">
                  ${feed.created}
                </h6>
                <p class="card-text">
                  ${feed.body.slice(0, 10)}...
                </p>
                <a href="/feed-details/index.html?feedId=${
                  feed.id
                }" class="card-link">View Feed</a>
                <a href="#" feedId="${
                  feed.id
                }" class="card-link updateBtn">Update</a>
                <button feedId="${
                  feed.id
                }" class="card-link btn btn-danger deleteBtn">Delete</button>
              </div>
            </div>
        `;
  });

  // delete feed
  let deleteBtns = document.querySelectorAll(".deleteBtn");
  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", () => {
      const id = deleteBtn.getAttribute("feedId");
      if (confirm("Are you sure to delete feed:" + id + "?")) {
        fetch("https://api.noroff.dev/api/v1/social/posts/" + id, {
          method: "DELETE",
          headers: {
            "content-type": "Application/json",
            Authorization: "Bearer " + storedUser.accessToken,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            window.location.reload();
          });
      }
    });
  });

  // update feed
  let updateBtns = document.querySelectorAll(".updateBtn");
  updateBtns.forEach((updateBtn) => {
    updateBtn.addEventListener("click", () => {
      const id = updateBtn.getAttribute("feedId");
      const info = data.find((d) => d.id == id);

      feedTitle.value = info.title;
      feedDescription.value = info.body;
      feedBtn.innerHTML = "Update Feed";
      feedBtn.classList.add("btn-info");
      updatingFeedId = id;
    });
  });
}

/**
 * function to update feed if feedBtn has "Update Feed" as text, else
 */
function createOrUpdateFeed() {
  const title = feedTitle.value.trim();
  const body = feedDescription.value.trim();

  if (!title || !body) return alert("Enter title and description");

  const data = { title, body };

  if (feedBtn.innerHTML === "Update Feed" && updatingFeedId) {
    fetch("https://api.noroff.dev/api/v1/social/posts/" + updatingFeedId, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "content-type": "Application/json",
        Authorization: "Bearer " + storedUser.accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) window.location.reload();
        updatingFeedId = undefined;
      });
  } else {
    fetch("https://api.noroff.dev/api/v1/social/posts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "Application/json",
        Authorization: "Bearer " + storedUser.accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) window.location.reload();
      });
  }
}
