const storedUser = JSON.parse(localStorage.getItem("media-user"));
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
    console.log(data);
  });
