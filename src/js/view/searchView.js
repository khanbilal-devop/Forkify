import View from "./view";

class SearchView extends View {

    _parentElement = document.querySelector('.search');


    getSearchQuery(){
        const query = this._parentElement.querySelector('.search__field').value;
        this._clearInput();
        return query;
    }

    _clearInput(){
        this._parentElement.querySelector('.search__field').value = '';
    }

    addViewHandler(searchBtnCallback){
      const searchBtn = this._parentElement.querySelector('.search__btn');
       searchBtn.addEventListener('click',searchBtnCallback)
    }
}

export default new SearchView();