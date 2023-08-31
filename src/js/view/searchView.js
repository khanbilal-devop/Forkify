import View from "./view";

class SearchView extends View {

    #parentElement = document.querySelector('.search');


    getSearchQuery(){
        const query = this.#parentElement.querySelector('.search__field').value;
        this.#clearInput();
        return query;
    }

    #clearInput(){
        this.#parentElement.querySelector('.search__field').value = '';
    }

    addViewHandler(searchBtnCallback){
      const searchBtn = this.#parentElement.querySelector('.search__btn');
       searchBtn.addEventListener('click',searchBtnCallback)
    }
}

export default new SearchView();