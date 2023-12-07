let feedDetailsContainer = document.querySelector(".feed-details");
const feedId = window.location.href.split("=")[1];
const baseURL = "https://api.noroff.dev/api/v1/social/posts/" + feedId;

const storedUser = JSON.parse(localStorage.getItem("media-user"));

/**
 * if there is a stored user available, then fetch details
 */
if (storedUser) {
  fetch(baseURL, {
    method: "GET",
    headers: {
      "content-type": "Application/json",
      Authorization: "Bearer " + storedUser.accessToken,
    },
  })
    .then((res) => res.json())
    .then((feed) => {
      const { title, created, tags, body } = feed;
      feedDetailsContainer.innerHTML += ` 
           <h2 class="card-title">Title:${title}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">
              Created:${created}
            </h6>
            <p>Tags: ${tags.join(",")}</p>
            <p class="card-text">
              Body: ${body}
            </p>

        `;
      //if (data?.errors) return alert(data.errors[0].message);
    });
}
