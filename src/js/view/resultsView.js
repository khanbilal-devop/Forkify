
import View from "./view";
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {

    _parentElement = document.querySelector('.results');


    render(recipes) {
        this._data = recipes;
        if (Array.isArray(recipes) && recipes.length === 0) {
            return this.showError('No data found for the query')
        }
        const html = this._generateMarkup();
        this.clearingAndInserting(html);
    }


    _generateMarkup() {
        const id = window.location.hash.slice(1);
        const recipes = this._data;
        const markup = (recipes || []).reduce((accumulator, each) => {
            return `${accumulator}<li class="preview">
        <a class="preview__link ${each.id === id ? 'preview__link--active' : ''} " href="#${each?.id}">
          <figure class="preview__fig">
            <img src="${each?.imageUrl}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${each?.title}</h4>
            <p class="preview__publisher">${each?.publisher}</p>
            <div class="recipe__user-generated ${each?.key ? '' : 'hidden'}">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          </div>
        </a>
      </li>`}, '');
        return markup;
    }

}

export default new ResultsView();