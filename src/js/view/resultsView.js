
import View from "./view";

class ResultsView extends View{

    _parentElement = document.querySelector('.results');


    render(recipes){
        this._data = recipes;
        if(Array.isArray(recipes) && recipes.length === 0){
            return this.showError('No data found for the query')
        }
        const html = this._generateMarkup();
        this.clearingAndInserting(html);
    }


    _generateMarkup() {
        const recipes  = this._data;
       const markup = (recipes || []).reduce((accumulator,each) => {
        return `${accumulator}<li class="preview">
        <a class="preview__link " href="#${each?.id}">
          <figure class="preview__fig">
            <img src="${each?.imageUrl}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${each?.title}</h4>
            <p class="preview__publisher">${each?.publisher}</p>
          </div>
        </a>
      </li>`},'');
        return markup;
    }

}

export default new ResultsView();