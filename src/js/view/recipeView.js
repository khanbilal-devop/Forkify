import icons from 'url:../../img/icons.svg';
import View from './view.js';

class RecipeView extends View {

  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'No recipes found for your query. Please try again!';
  _succesMessage = 'Success';



  render(recipe) {
    this._data = recipe;
    const html = this._generateMarkup();
    this.clearingAndInserting(html);
  }



  _generateMarkup() {
    const { image, title, cookingTime, servings, ingredients, bookMarked ,id} = this._data
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
           <button data="${servings - 1}" class="btn--tiny btn--increase-servings">
             <svg>
               <use href="${icons}#icon-minus-circle"></use>
             </svg>
           </button>
           <button data="${servings + 1}"  class="btn--tiny btn--increase-servings">
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
       <button data=${id} class="btn--round btn--bookmark">
         <svg class="">
           <use href="${icons}#icon-bookmark${bookMarked ? '-fill' : ''}"></use>
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
            <div class="recipe__quantity">${each?.quantity || ''}</div>
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

  addViewHandler = (recipeRenderCallback, servingBtnCallBack,bookMarkHandler) => {
    ['load', 'hashchange'].forEach(event => {
      window.addEventListener(event, (e) => {
        const id = (e.target.location.hash).substring('1');
        id && recipeRenderCallback(id);
      })
    });

    this._parentElement.addEventListener('click', (e) => {
      //Selecting serving btn and validating the same
      const servingBtn = e.target.closest('.btn--increase-servings');
      const bookMarkBtn = e.target.closest('.btn--bookmark');
      if (servingBtn){      
        // Fetching serving from dom and validating
        const newServings = servingBtn.getAttribute('data');
        if (+newServings > 0){
          servingBtnCallBack(+newServings);
        }
      }else if(bookMarkBtn){
        // Fetching recipe id from dom
       const id =  bookMarkBtn.getAttribute('data');
       bookMarkHandler(id);
      }else {
        return;
      }
    });
  }

}

export default new RecipeView();

