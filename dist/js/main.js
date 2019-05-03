"use strict";var input=document.querySelector("#input_field"),submitBtn=document.querySelector("#submit"),newsFeed=document.querySelector(".news-feed"),refreshBtn=document.querySelector("#refresh");input.focus(),submitBtn.addEventListener("click",getNews),refreshBtn.addEventListener("click",refreshNews);var apiKey="363d26dd3d664d199ca63adc371e22aa",url="https://newsapi.org/v2/everything";function getNews(){var e="?q=".concat(input.value),n=input.value,t="".concat(url).concat(e,"&apiKey=").concat(apiKey,"&pageSize=").concat(10,"&page=").concat(1);n?fetch(t).then(function(e){if(e.ok)return input.focus=!1,e.json()},function(e){console.log(e.message)}).then(function(e){var n=e.articles;console.log(n),console.log("News Loaded"),renderNews(n)}):newsFeed.innerHTML="<h2>Please type something</h2>"}function refreshNews(e){e.preventDefault(),getNews(),console.log("Refreshing...")}function renderNews(e){newsFeed.innerHTML="";var n=[];e.forEach(function(e){n.push('<article class="single-news"><div class="news-img"><img src="'.concat(e.urlToImage,'"/></div><div class="news-body"><h1 class="headline"><a target="_blank" href="').concat(e.url,'">').concat(e.title,'</a></h1><p class="description">').concat(e.description,"</p></div></article>"))}),n.forEach(function(e){newsFeed.innerHTML+=e,refreshBtn.style.visibility="visible"})}