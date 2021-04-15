const form = document.querySelector("form");
const searchInput = document.querySelector(".search-input");
const btnSearch = document.querySelector(".btn__search");
const result = document.getElementById("result");

const API_URL = "https://api.github.com/users";
console.log(API_URL);

async function getUsers(url) {
  const res = await fetch(url);
  const data = await res.json();
  showUsers(data);
}

//Event Listerners
form.addEventListener("submit", handleSubmit);
btnSearch.addEventListener("click", handleSearch);
btnClear.addEventListener("click", handleClear);

// searchInput.addEventListener("keyup", handleKeyUp);

// Functions
function handleSubmit(e) {
  e.preventDefault();

  let searchTerm = searchInput.value;
  if (searchTerm.trim()) {
    getUsers(`${API_URL}/${searchTerm}`);
  }
}

function showUsers(data) {
  const { avatar_url, html_url, name, public_repos, bio } = data;
  result.innerHTML = "";
  console.log(data);
  if (data) {
    result.innerHTML = `
    <li>
    <img src="${avatar_url}" />
    <a href="${html_url}" target="_blank">
    <h3>${name}</h3>
    <p>Public Repos: <stron>${public_repos}</strong></p>
    <p>Bio: ${bio ? `Bio: ${bio}` : "Not provided"}</p>
    </li>
      `;

    searchInput.value = "";
  } else {
    alert("Please enter a search term");
  }
}

function handleSearch(e) {
  handleSubmit(e);
  showUsers();
}
