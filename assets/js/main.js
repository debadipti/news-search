// dom references
const input = document.querySelector("#input_field");
const submitBtn = document.querySelector("#submit");
const newsFeed = document.querySelector(".news-feed");
const refreshBtn = document.querySelector("#refresh");

// get the input field in focuswhen the page loads
input.focus();

// event listeners
submitBtn.addEventListener("click", getNews);
refreshBtn.addEventListener("click", refreshNews);

// api and url information
const apiKey = "363d26dd3d664d199ca63adc371e22aa";
const url = "https://newsapi.org/v2/everything";

// getNews()
function getNews() {
  // fetch params
  const query = `?q=${input.value}`;
  const pageSize = 10;
  const page = 1;

  // input value
  let inputValue = input.value;

  // request endpoint
  const endpoint = `${url}${query}&apiKey=${apiKey}&pageSize=${pageSize}&page=${page}`;

  // checking the input field in not blank
  if (inputValue) {
    // fetch api
    fetch(endpoint)
      .then(
        response => {
          // check if response returned with ok status
          if (response.ok) {
            // focus the field
            input.focus = false;
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
        console.log(newsArray);
        // loaded console
        console.log("News Loaded");
        // rendernews function to render the news in the DOM
        renderNews(newsArray);
      });
  } else {
    // warn the user about invalid input
    newsFeed.innerHTML = `<h2>Please type something</h2>`;
  }
}

// refreshNews function
function refreshNews(e) {
  e.preventDefault();

  // call the fetchnews function
  getNews();

  // console log
  console.log("Refreshing...");
}

// function countDown() {
//   // grab the notification span in the DOM
//   const notificationBlock = document.querySelector(".notification");
//   // start the count
//   let count = 61;
//   // html content
//   notificationBlock.innerHTML = `Auto-refresh in <span id="countdown"></span> seconds`;
//   // every second substract 1 from the count
//   intervalId = setInterval(() => {
//     count--;
//     // grab the countdown span
//     const countdown = document.querySelector("#countdown");
//     // change inner text to be current count
//     countdown.textContent = count;
//     // display the countdown in the DOM
//     notificationBlock.style.visibility = "visible";
//     if (count <= 0) {
//       // hide the notification
//       notificationBlock.innerHTML = `Refreshing again...`;
//       //clear the interval after news got refreshed
//       clearInterval(intervalId);
//       // console a message
//       console.log("Timer Reset");
//     }
//   }, 1000);

//   // refresh news function
//   refresh();

//   function refresh() {
//     setTimeout(() => {
//       // call the getNews function that actually refreses the news
//       getNews();
//       // console log everytime the news refreshes
//       console.log("News got refreshed");
//     }, 61000);
//   }
// }

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
    // show the refresh btn
    refreshBtn.style.visibility = "visible";
  });
}
