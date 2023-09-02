import icons from 'url:../../img/icons.svg';
import View from './view.js';


class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');



    render(search) {
        this._data = search;
        const html = this._generateMarkup();
        this.clearingAndInserting(html);
    }

    _generateMarkup() {
        const { currentPage, totalPage } = this._data;
        if((currentPage == totalPage) &&  (totalPage == 1)) return ;
        let markup;
        if (currentPage === 1) {
            markup = `
          <button data=${currentPage +1} class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
        } else if (totalPage === currentPage) {
            markup = `<button data=${currentPage - 1} class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1 }</span>
          </button>`;
        }else{
            markup = `<button data=${currentPage -1} class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage -1}</span>
          </button>
          <button data=${currentPage + 1} class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
        }
        return markup;
    }
    addViewHandler(btnClickedCallback){
          this._parentElement.addEventListener('click',(e) => {
          const upComingPage =   e.target.closest('.btn--inline').getAttribute('data');
          btnClickedCallback(Number(upComingPage));
         })
    }
  
}

export default new PaginationView();