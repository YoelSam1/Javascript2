let feedsContainer = document.querySelector(".feeds");
let searchInput = document.querySelector("#searchInput");
let filterSelect = document.querySelector("#filterSelect");

const baseURL = "https://api.noroff.dev/api/v1/social/posts";

const storedUser = JSON.parse(localStorage.getItem("media-user"));

/**
 * if there is a stored user available, then fetch feeds
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
    .then((data) => {
      // console.log(data);
      render(data);

      searchInput.addEventListener("input", () => {
        const text = searchInput.value.toLowerCase();
        const searchedData = data.filter(
          (d) =>
            (d.body && d.body.toLowerCase().includes(text)) ||
            (d.title && d.title.toLowerCase().includes(text))
        );
        render(searchedData);
      });

      filterSelect.addEventListener("change", () => {
        data = filterDataByDateOrder(data, filterSelect.value);
        render(data);
      });
    });
}

/**
 *function to render data
 * @param {Array} data - array of objects with a created(date) property
 */
function render(data) {
  feedsContainer.innerHTML = "";

  if (data.length === 0) {
    feedsContainer.innerHTML = "<h2>No feed found</h2>";
    return;
  }

  data.forEach((feed) => {
    // const d = new Date(feed.created);
    const { id, title, created, tags, body } = feed;

    // Check if body exists and is not null or undefined
    const truncatedBody = body
      ? body.slice(0, 10) + "..."
      : "No body available";

    feedsContainer.innerHTML += ` 
           <div class="card" id"card-style">
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">
                  ${created}
                </h6>
                <p class="card-text">
                  ${truncatedBody}
                </p>
                <a href="/feed-details/index.html?feedId=${id}" class="card-link">View Feed</a>
              </div>
            </div>
        `;
  });
}

/**
 * function to filter data by created date property
 * @param {Array} data - array of objects with a created(date) property
 * @param {string} order - orderby (newest or oldest)
 * @returns Array - sorted array based on created(date) property
 */
function filterDataByDateOrder(data, order) {
  const sortedData = [...data]; // Create a copy of the original data

  sortedData.sort((a, b) => {
    const dateA = new Date(a.created);
    const dateB = new Date(b.created);

    if (order === "newest") {
      return dateB - dateA; // Sort in descending order for "newest"
    } else if (order === "oldest") {
      return dateA - dateB; // Sort in ascending order for "oldest"
    } else {
      // Default to sorting by newest if the order is not specified
      return dateB - dateA;
    }
  });

  return sortedData;
}
