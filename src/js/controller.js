import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model';
import RecipeView from './view/recipeView';

const recipeContainer = document.querySelector('.recipe');


//https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


const fetchRecipie = async (id) => {
  try {
    // Rendering spinner
    RecipeView.renderSpinner();

    //fetching Recipie
    await model.fetchRecipe(id);
    const {recipe} = model.state

    // Rendering recepie
    if (Object.keys(recipe).length) {
      RecipeView.render(recipe);
    }
  } catch (err) {
    //Hiding spinner
    const isSpinnerPresent = recipeContainer.querySelectorAll(":is(div).spinner").length;
    if(isSpinnerPresent){
      RecipeView.hideSpinner();
    }
    //Showing error 
    RecipeView.showError('No recipes found for your query. Please try again!')
  }
}


const init = () => {
  RecipeView.addViewHandler(fetchRecipie);
}
init();
