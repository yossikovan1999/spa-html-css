const URL = `
https://gnews.io/api/v4/search?q=Google&lang=en&max=5&apikey=
10a443860df0d86403a8b407120b79b8
`;

const articleLinks = (() => {
  const linksPage = document.getElementById("articles-links-page");
  const createArtcilePage = document.getElementById("create-article");
  const articles = document.getElementById("articles");

  function createArticleLink(writer, articleHeader, articleText) {
    const article = document.createElement("article");

    article.classList.add("article");

    const articleHtmlString = `
          <div class="article-header">
            <img src="./jhon-doe.jpg" />
            <div class="article-header-text">
              <h3>${writer.value.trim()}</h3>
              <h2>${articleHeader.value.trim()}</h2>
            </div>
          </div>
          <p class="text-paragraph">${articleText.value.trim()}</p>
        `;
    
    article.addEventListener('click', articlePage.showArticle);
    
    linksPage.appendChild(article);
  }

  function articlesLinkPage() {
    linksPage.style.display = "grid";
    createArtcilePage.style.display = "none";
    articles.style.display = "none";
  }

  return { createArticleLink, articlesLinkPage };
})();

const articlePage = (() => {
  function hideOtherPager() {}

  function showArticle(event) {
    const articleLink = event.currentTarget;
  }
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
  const json = await sources.json()
  
  for(const article of json.articles){
    articleLinks.createArticleLink(article?.source?.name, article.title ,article.content);
  }
  
  form.addEventListener("submit", createArticle.addArticle);
  createArticleBtn.addEventListener("click", createArticle.createArticlePage);
  articleLinksBtn.addEventListener("click", articleLinks.articlesLinkPage);
});
