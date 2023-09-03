import View from "./View";


class BookMarkView extends View {
    _parentElement = document.querySelector('.bookmarks__list');


    render(recipes) {
        this._data = recipes;
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
            <img src="${each?.image}" alt="${each?.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${each?.title}</h4>
            <p class="preview__publisher">${each?.publisher}</p>
          </div>
        </a>
      </li>`}, '');
        return markup;
    }

}

export default new BookMarkView();