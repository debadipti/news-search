// dom references
const form = document.querySelector("#form");
const input = document.querySelector("#input_field");
const newsFeed = document.querySelector(".news-feed");

// get the input field in focuswhen the page loads
input.focus();

// event listener for the form
form.addEventListener("submit", getNews);

// api and url information
const apiKey = "363d26dd3d664d199ca63adc371e22aa";
const url = "https://newsapi.org/v2/everything";

// getNews()
function getNews(e) {
  // prevent submitting to the form
  e.preventDefault();

  const query = `?q=${input.value}`;
  const pageSize = 10;
  const page = 1;

  // request endpoint
  const endpoint = `${url}${query}&apiKey=${apiKey}&pageSize=${pageSize}&page=${page}`;

  // checking the input field in not blank
  if (input.value !== "") {
    // fetch api
    fetch(endpoint)
      .then(
        response => {
          // check if response returned with ok status
          if (response.ok) {
            // clear the input field
            input.value = "";
            input.focud = false;
            // convert to json
            return response.json();
          }
        },
        // in case of network errors
        networkError => {
          console.log(networkError.message);
        }
      )
      .then(jsonResponse => {
        const newsArray = jsonResponse.articles;
        // rendernews function to render the news in the DOM
        renderNews(newsArray);
      });
  } else {
    newsFeed.innerHTML = `<h2>Please type something</h2>`;
  }
}

// renderNews()
function renderNews(arr) {
  // clear the div in case previous search results
  newsFeed.innerHTML = "";
  // saving each news in an array
  const newsList = [];
  // foreach in arr returned from fetch
  arr.forEach(i => {
    newsList.push(
      `<article class="single-news"><div class="news-img"><img src="${
        i.urlToImage
      }"/></div><div class="news-body"><h1 class="headline"><a target="_blank" href="${
        i.url
      }">${i.title}</a></h1><p class="description">${
        i.description
      }</p></div></article>`
    );
  });
  newsList.forEach(n => {
    // append the articles to the newsList div
    newsFeed.innerHTML += n;
  });
}
