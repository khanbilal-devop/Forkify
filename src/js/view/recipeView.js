import icons from 'url:../../img/icons.svg';

class RecipeView {

     _parentElement = document.querySelector('.recipe');
    _data;



    renderSpinner = () => {
        const spinner = `
        <div class="spinner">
            <svg>
                <use href="${icons}#icon-loader"></use>
            </svg>
        </div> `;
       this._parentElement.textContent = '';
        this._parentElement.insertAdjacentHTML("afterbegin", spinner);
    }


    render() {
        this._data = recipe;
        const html = this._generateMarkup();
        this._parentElement.innerHTML = '';
        this._parentElement.insertAdjacentHTML("afterbegin", html);
    }

    hideSpinner = () =>  this._parentElement.textContent = '';


    showError = (errorMessage = 'Something went wrong') => {
        const errorHtml = ` <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${errorMessage}</p>
      </div>`
      this._parentElement.insertAdjacentHTML("afterbegin", errorHtml);
    
    }
    

    _generateMarkup() {
        const { image, title, cookingTime, servings, ingredients } = this._data
        const markup = `
       <figure class="recipe__fig">
       <img src="${image}" alt="${title}" class="recipe__img" />
       <h1 class="recipe__title">
         <span>${title}</span>
       </h1>
     </figure>
    
     <div class="recipe__details">
       <div class="recipe__info">
         <svg class="recipe__info-icon">
           <use href="${icons}#icon-clock"></use>
         </svg>
         <span class="recipe__info-data recipe__info-data--minutes">${cookingTime}</span>
         <span class="recipe__info-text">minutes</span>
       </div>
       <div class="recipe__info">
         <svg class="recipe__info-icon">
           <use href="${icons}#icon-users"></use>
         </svg>
         <span class="recipe__info-data recipe__info-data--people">${servings}</span>
         <span class="recipe__info-text">servings</span>
    
         <div class="recipe__info-buttons">
           <button class="btn--tiny btn--increase-servings">
             <svg>
               <use href="${icons}#icon-minus-circle"></use>
             </svg>
           </button>
           <button class="btn--tiny btn--increase-servings">
             <svg>
               <use href="${icons}#icon-plus-circle"></use>
             </svg>
           </button>
         </div>
       </div>
    
       <div class="recipe__user-generated">
         <svg>
           <use href="${icons}#icon-user"></use>
         </svg>
       </div>
       <button class="btn--round">
         <svg class="">
           <use href="${icons}#icon-bookmark-fill"></use>
         </svg>
       </button>
     </div>
    
     <div class="recipe__ingredients">
       <h2 class="heading--2">Recipe ingredients</h2>
       <ul class="recipe__ingredient-list">
          ${(ingredients || []).map(each =>
            `<li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${each?.quantity}</div>
            <div class="recipe__description">
              <span class="recipe__unit">${each?.unit}</span>
              ${each?.description}
            </div>
          </li>`
        ).join("")}
      
       </ul>
     </div>
    
     <div class="recipe__directions">
       <h2 class="heading--2">How to cook it</h2>
       <p class="recipe__directions-text">
         This recipe was carefully designed and tested by
         <span class="recipe__publisher">The Pioneer Woman</span>. Please check out
         directions at their website.
       </p>
       <a
         class="btn--small recipe__btn"
         href="http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/"
         target="_blank"
       >
         <span>Directions</span>
         <svg class="search__icon">
           <use href="${icons}#icon-arrow-right"></use>
         </svg>
       </a>
     </div> `;
        return markup;
    }

}

export default new RecipeView();

