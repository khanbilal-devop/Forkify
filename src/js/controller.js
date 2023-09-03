import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model';
import RecipeView from './view/recipeView';
import SearchView from './view/searchView';
import ResultsView from './view/resultsView';
import PaginationView from './view/paginationView';
import BookMarkView from './view/bookMarkView';

// if(module.hot){
//   module.hot.accept()
// }

const { state } = model;

//https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


const controlRecipe = async (id) => {
  try {
    // Rendering spinner
    RecipeView.renderSpinner();

    //fetching Recipie
    await model.fetchRecipe(id);
    const { recipe } = state

    ResultsView.update(state?.search?.paginatedRecipes)

    // Rendering recepie
    if (Object.keys(recipe).length) {
      RecipeView.render(recipe);
    }

    //Book Mark View
    state.isReloaded ?
      BookMarkView.render(state.bookMarks)
      : BookMarkView.update(state.bookMarks);

    model.changeRelaoded();

  } catch (err) {
    //Hiding spinner
    RecipeView.hideSpinner();
    //Showing error 
    RecipeView.showError(err.message)
  }
}

const controlSearchRecipe = async () => {
  try {
    // Validating query
    const query = SearchView.getSearchQuery();
    if (!query) return;

    //Rednering Spinner
    ResultsView.renderSpinner();

    // fetching recpie list for a query
    await model.searchRecipe(query);
    const { search } = state;

    //Rendering recipe results
    ResultsView.render(search?.paginatedRecipes);

    //Rendering pagination
    PaginationView.render(search);
  } catch (err) {
    ResultsView.hideSpinner();
    ResultsView.showError(err?.message);
  }
}


const controlPagination = upComingPage => {
  // Update search State
  model.updateStateForSearch(upComingPage);

  //Rendering recipe results
  ResultsView.render(state?.search?.paginatedRecipes);

  //Rendering pagination
  PaginationView.render(state?.search);
}

const controlServing = (servings) => {
  // updating servings
  model.updateServings(servings)

  //Render recipe
  RecipeView.render(state?.recipe);
}


const controlAddAndRemoveBookMark = (id) => {
  const { recipe } = state

  //Checking wheter to add or remove from bookmarks
  if (recipe.bookMarked)
    model.addAndRemoveBookMark(id);
  else
    model.addAndRemoveBookMark(id);

  // Update the view based on bookMark flag
  RecipeView.update(state.recipe);

  //Render BookMarks List
  BookMarkView.render(state.bookMarks);
}

const init = () => {
  RecipeView.addViewHandler(controlRecipe, controlServing, controlAddAndRemoveBookMark);
  SearchView.addViewHandler(controlSearchRecipe);
  PaginationView.addViewHandler(controlPagination)
}
init();
