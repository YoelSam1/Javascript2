import { APIURL } from "./api.mjs";
import createOrUpdateFeed, { storedUser } from "./createorupdate.mjs";
import render from "./render.mjs";

const username = document.querySelector(".username");
const feedTitle = document.querySelector("#feedTitle");
const feedDescription = document.querySelector("#feedDescription");
const feedBtn = document.querySelector(".feedBtn");
let feedsContainer = document.querySelector(".feeds");
let updatingFeedId;

/**
 * if there is a stored user available, then proceed
 */
if (storedUser) {
  username.innerHTML = `
    <h1>Username: ${storedUser.name}</h1>
    <h1>Email: ${storedUser.email}</h1>
  `;
  const baseURL = `${APIURL}/social/profiles/${storedUser.name}/posts`;

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
      render(
        data,
        feedsContainer,
        feedTitle,
        feedDescription,
        feedBtn,
        updatingFeedId
      );
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      // Handle the error
    });

  feedBtn.addEventListener("click", () => {
    const title = feedTitle.value.trim();
    const body = feedDescription.value.trim();
    createOrUpdateFeed(title, body, feedBtn, updatingFeedId);
  });
}
