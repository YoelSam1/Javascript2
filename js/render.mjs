import { APIURL } from "./api.mjs";
import { storedUser } from "./createorupdate.mjs";

/**
 * function to render data
 * @param {Array} data - array of objects with a created(date) property
 */
export default function render(
  data,
  feedsContainer,
  feedTitle,
  feedDescription,
  feedBtn,
  updatingFeedId
) {
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
        fetch(`${APIURL}/social/posts/${id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + storedUser.accessToken,
          },
        })
          .then((res) => {
            if (res.ok) {
              // No need to parse JSON for a successful DELETE request
              window.location.reload();
            } else {
              // Handle non-success status codes
              throw new Error(`Failed to delete feed. Status: ${res.status}`);
            }
          })
          .catch((error) => {
            console.error("Error deleting feed:", error.message);
            // Handle the error as needed
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
