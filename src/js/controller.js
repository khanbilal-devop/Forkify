import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model';
import RecipeView from './view/recipeView';
import SearchView from './view/searchView';
import ResultsView from './view/resultsView';

if(module.hot){
  module.hot.accept()
}

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
      RecipeView.hideSpinner();
    //Showing error 
    RecipeView.showError()
  }
}

const controlSearchRecipe = async () => {
  try{
     // Validating query
     const query = SearchView.getSearchQuery();
     if(!query) return;

     //Rednering Spinner
     ResultsView.renderSpinner();

    // fetching recpie list for a query
    await model.searchRecipe(query);
    const recipes = state?.search;

    //Rendering
    ResultsView.render(recipes)
  }catch(err){
    ResultsView.hideSpinner();
    
    ResultsView.showError(err?.message);
  }
}


const init = () => {
  RecipeView.addViewHandler(controlRecipe);
  SearchView.addViewHandler(controlSearchRecipe);
}
init();
