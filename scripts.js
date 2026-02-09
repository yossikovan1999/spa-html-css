const URL = `
https://newsapi.org/v2/top-headlines?country=us&apiKey=b90df0c2693b4cb58c44f10e3880ba00
`;

const articleLinks = (() => {
  const linksPage = document.getElementById("articles-links-page");
  const createArtcilePage = document.getElementById("create-article");
  const articles = document.getElementById("articles");

  function createArticleLink(articleData) {
    const article = document.createElement("article");

    article.classList.add("article");

    console.log(articleData.content);

    const articleHtmlString = `
          <div class="article-header">
            <img class=article-link-img src=${articleData.urlToImage} />
            <div class="article-header-text">
              <h3 class=text-paragraph>${articleData?.source?.name}</h3>
              <h2 class=text-paragraph>${articleData.title}</h2>
            </div>
          </div>
          <p class="text-paragraph">${articleData.content}</p>
        `;

    article.innerHTML = articleHtmlString;

    article.addEventListener("click", articlePage.showArticle);

    linksPage.appendChild(article);

    console.log(linksPage);
  }

  function articlesLinkPage() {
    linksPage.style.display = "grid";
    createArtcilePage.style.display = "none";
    articles.style.display = "none";
  }

  return { createArticleLink, articlesLinkPage };
})();

const articlePage = (() => {
  const linksPage = document.getElementById("articles-links-page");
  const createArtcilePage = document.getElementById("create-article");
  const article = document.getElementById("articles");

  function hideOtherPages() {
    linksPage.style.display = "none";
    createArtcilePage.style.display = "none";
    article.style.display = "block";
  }

  function showArticle(event) {
    const articleLink = event.currentTarget;

    console.log(articleLink);

    const publisher = articleLink.getElementsByTagName("h3");
    const title = articleLink.getElementsByTagName("h2");
    const content = articleLink.getElementsByTagName("p");
    const img = articleLink.querySelector(".article-link-img");

    console.log(typeof publisher.item(0));

    console.log(typeof publisher);

    console.log(img);

    const articleDiv = `
      <article class="full-article">
            <img src=${img.src}>
             <h2>${title.item(0).innerHTML}</h2>
            <h3>${publisher.item(0).innerHTML}</h3>
            <p>
             ${content.item(0).innerHTML} 
            </p>
      </article>
    `;

    article.innerHTML = articleDiv;
    hideOtherPages();
  }

  return { showArticle };
})();

const createArticle = (() => {
  const linksPage = document.getElementById("articles-links-page");
  const createArtcilePage = document.getElementById("create-article");
  const articles = document.getElementById("articles");

  function addArticle(event) {
    event.preventDefault();
  }

  function createArticlePage() {
    linksPage.style.display = "none";
    createArtcilePage.style.display = "flex";
    articles.style.display = "none";
  }

  return { addArticle, createArticlePage };
})();

document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("create-article-form");
  const articleLinksBtn = document.getElementById("articles-links-btn");
  const createArticleBtn = document.getElementById("create-article-btn");

  const sources = await fetch(URL);
  const json = await sources.json();

  for (const article of json.articles) {
    console.log(article);

    articleLinks.createArticleLink(article);
  }

  form.addEventListener("submit", createArticle.addArticle);
  createArticleBtn.addEventListener("click", createArticle.createArticlePage);
  articleLinksBtn.addEventListener("click", articleLinks.articlesLinkPage);
});
