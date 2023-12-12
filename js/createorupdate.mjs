import { APIURL } from "./api.mjs";

export const storedUser = JSON.parse(localStorage.getItem("media-user"));

/**
 * function to update feed if feedBtn has "Update Feed" as text, else
 */
export default function createOrUpdateFeed(
  title,
  body,
  feedBtn,
  updatingFeedId
) {
  if (!title || !body) return alert("Enter title and description");

  const data = { title, body };

  if (feedBtn.innerHTML === "Update Feed" && updatingFeedId) {
    fetch(`${APIURL}/social/posts/${updatingFeedId}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + storedUser.accessToken,
      },
    })
      .then((res) => {
        if (res.ok) {
          // No need to parse JSON for a successful PUT request
          window.location.reload();
        } else {
          // Handle non-success status codes
          throw new Error(`Failed to update feed. Status: ${res.status}`);
        }
      })
      .catch((error) => {
        console.error("Error updating feed:", error.message);
        // Handle the error as needed
      });
  } else
    fetch(`${APIURL}/social/posts`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + storedUser.accessToken,
      },
    })
      .then((res) => {
        if (res.ok) {
          // Check if there is a content-type header indicating JSON
          const contentType = res.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            return res.json();
          } else {
            // If no JSON, return an empty object
            return {};
          }
        } else {
          // Handle non-success status codes
          throw new Error(`Failed to create feed. Status: ${res.status}`);
        }
      })
      .then((data) => {
        if (data.id) {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Error creating feed:", error.message);
        // Handle the error as needed
      });
}
