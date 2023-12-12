import { APIURL } from "./api.mjs";

let feedDetailsContainer = document.querySelector(".feed-details");
const feedId = window.location.href.split("=")[1];
const baseURL = `${APIURL}/social/posts/${feedId}`;

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
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.status}`);
      }
      return res.json();
    })
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
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
} else {
  console.error("No stored user found");
}
