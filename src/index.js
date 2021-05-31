import articlesTpl from './templates/articles.hbs';
import './sass/main.scss';
import NewsApiService from './js/news-service';
import LoadMoreBtn from './js/components/load-more-btn';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  articlesContainer: document.querySelector('.js-articles-container'),
  // loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

const newsApiService = new NewsApiService();
const loadMoreBtn = new LoadMoreBtn({ selector: '[data-action="load-more"]', hidden: true });

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

function onSearch(e) {
  e.preventDefault();

  clearArticlesContainer();

  newsApiService.query = e.currentTarget.elements.query.value;

  if (newsApiService.query === '' || newsApiService.query === ' ') {
    return alert('Введи что-то нормальное');
  }
  loadMoreBtn.show();
  newsApiService.resetPage();

  fetchArticles();
}

function fetchArticles() {
  loadMoreBtn.disable();
  newsApiService.fetchArticles().then(articles => {
    appendArticlesMarkup(articles);
    loadMoreBtn.enable();
  });
}

function appendArticlesMarkup(articles) {
  refs.articlesContainer.insertAdjacentHTML('beforeend', articlesTpl(articles));
}

function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}
