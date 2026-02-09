const URL = `
https://newsapi.org/v2/top-headlines?country=us&apiKey=b90df0c2693b4cb58c44f10e3880ba00
`;

const loacalStorageHander = (() => {
  async function addToLocalStorage(url, publisher, title, content) {
        
    const articles = await JSON.parse(localStorage.getItem("articles")) || [];

    const article = { url, publisher, title, content };

    articles.push(article);

    localStorage.setItem("articles", JSON.stringify(articles));     
  }

  async function addToDom() {
    const articles = await JSON.parse(localStorage.getItem("articles")) || [];
    console.log(articles);
    
    for (const article of articles) {
      articleLinks.createArticleLink(
        article.url,
        article.publisher,
        article.title,
        article.content,
      );
    }
  }

  return { addToLocalStorage, addToDom };
})();

const articleLinks = (() => {
  const linksPage = document.getElementById("articles-links-page");
  const createArtcilePage = document.getElementById("create-article");
  const articles = document.getElementById("articles");

  function createArticleLink(imgUrl, publisher, title, content) {
    const article = document.createElement("article");

    article.classList.add("article");

    const articleHtmlString = `
          <div class="article-header">
            <img class=article-link-img src=${imgUrl} />
            <div class="article-header-text">
              <h3>${publisher || ""}</h3>
              <h2>${title || ""}</h2>
            </div>
          </div>
          <p class="text-paragraph">${content || ""}</p>
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

  const fileInput = document.getElementById("img-input");
  const publisher = document.getElementById("writer");
  const title = document.getElementById("input-header");
  const content = document.getElementById("article-text");

  function addArticle(event) {
    event.preventDefault();

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      const url = reader.result;
      articleLinks.createArticleLink(
        url,
        publisher.value,
        title.value,
        content.value,
      );

      loacalStorageHander.addToLocalStorage(url,
        publisher.value,
        title.value,
        content.value)
    });

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  function createArticlePage() {
    publisher.value = "";
    title.value = "";
    content.value = "";
    fileInput.value = "";

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

    articleLinks.createArticleLink(
      article.urlToImage,
      article?.source?.name,
      article.title,
      article.content,
    );
  }

  loacalStorageHander.addToDom();

  form.addEventListener("submit", createArticle.addArticle);
  createArticleBtn.addEventListener("click", createArticle.createArticlePage);
  articleLinksBtn.addEventListener("click", articleLinks.articlesLinkPage);
});
