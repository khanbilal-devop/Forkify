import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model';
import RecipeView from './view/recipeView';
import SearchView from './view/searchView';



const {state} = model; 

//https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


const controlRecipe = async (id) => {
  try {
    // Rendering spinner
    RecipeView.renderSpinner();

    //fetching Recipie
    await model.fetchRecipe(id);
    const {recipe} = state

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
    RecipeView.showError()
  }
}

const controlSearchRecipe = async () => {
  try{
     // Validating query
     const query = SearchView.getSearchQuery();
     if(!query) return;

    // fetching recpie list for a query
    await model.searchRecipe(query);
    const recipes = state?.search;

    //Rendering
    console.log(recipes);
  }catch(err){
    console.error(err);
  }
}


const init = () => {
  RecipeView.addViewHandler(controlRecipe);
  SearchView.addViewHandler(controlSearchRecipe);
}
init();
