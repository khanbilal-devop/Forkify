import { API_URL, PAGINATION_LIMIT,KEY } from "./constant";
import { getJson, postJson } from "./helper";

export const state = {
    isReloaded : true,
    recipe: {},
    search: {
        recipes: [],
        paginatedRecipes: [],
        currentPage: 1,
        totalPage: 1,
        paginationLimit: PAGINATION_LIMIT
    },
    bookMarks: []
}


export const fetchRecipe = async (id) => {
    const { bookMarks } = state;
    const data = await getJson(`${API_URL}${id}?key=${KEY}`)
    state.recipe  =createRecipeObject(data);

    const bookMarked = ((bookMarks || []).map(each => each?.id)).includes(id);
    state.recipe.bookMarked = bookMarked;
}



export const searchRecipe = async (query = "pizza") => {
    let { search } = state;

    //Based on the search key we will be able to identify wheter the recipe was posted by us or not
    const data = await getJson(`${API_URL}?search=${query}&key=${KEY}`)
    let { recipes } = data?.data;

    // Splicing data for pagination
    const totalPage = Math.ceil(recipes.length / PAGINATION_LIMIT);
    search = {
        ...search,
        recipes,
        totalPage
    }
    state['search'] = search;
    updateStateForSearch();
}


export const updateStateForSearch = (currentPage = 1) => {
    let { search } = state;
    const start = (currentPage - 1) * PAGINATION_LIMIT;
    const end = currentPage * PAGINATION_LIMIT;
    let paginatedRecipes = (search?.recipes || []).slice(start, end);
    paginatedRecipes = (paginatedRecipes || []).map(each => (
        {
            id: each?.id,
            imageUrl: each?.image_url,
            publisher: each?.publisher,
            title: each?.title,
            ...(each.key && { key: each.key }),

        }
    ));
    search = {
        ...search,
        currentPage,
        paginatedRecipes
    }
    state['search'] = search;
}

export const updateServings = (updatedServings) => {
    const { recipe } = state;

    // Caluculating ingredient quantity accordinng to servings
    //    new qty = old qty * new serving / old serving
    (recipe?.ingredients || []).forEach(each =>
        each.quantity = each?.quantity * (updatedServings / recipe?.servings)
    );

    recipe.servings = updatedServings;
}

const createRecipeObject = function (data) {
    const { recipe } = data.data;
    return {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
      ...(recipe.key && { key: recipe.key }),
    };
  };


// Add or reomove bookMark data from model
export const addAndRemoveBookMark = (id) => {
    const { bookMarks, recipe } = state;
    recipe.bookMarked = !recipe.bookMarked;
    if (recipe.bookMarked) {
        bookMarks.push(recipe);
        state['bookMarks'] = bookMarks;
    } else {
        newBookMarks = bookMarks.filter(each => each?.id !== id);
        state['bookMarks'] = newBookMarks;
    }
    localStorage.setItem('bookMarks',JSON.stringify(bookMarks));
    state['recipe'] = recipe;

}

export const uploadRecipe = async function (newRecipe) {
    try {
      const ingredients = Object.entries(newRecipe)
        .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
        .map(ing => {
          const ingArr = ing[1].split(',').map(el => el.trim());
          if (ingArr.length !== 3)
            throw new Error( 'Wrong ingredient fromat! Please use the correct format :)');
  
          const [quantity, unit, description] = ingArr;
  
          return { quantity: quantity ? +quantity : null, unit, description };
        });
  
      const recipe = {
        title: newRecipe.title,
        source_url: newRecipe.sourceUrl,
        image_url: newRecipe.image,
        publisher: newRecipe.publisher,
        cooking_time: +newRecipe.cookingTime,
        servings: +newRecipe.servings,
        ingredients,
      };
  
      const data = await postJson(`${API_URL}?key=${KEY}`, recipe);
      state.recipe = createRecipeObject(data);
      addAndRemoveBookMark();
    } catch (err) {
      throw err;
    }
  };
  

export const changeRelaoded = () => state.isReloaded = !state.isReloaded;

// getting bookmarks from local Storage
const getBookMark = () => {
   const bookMarks = localStorage.getItem('bookMarks');
   if(!bookMarks) return;
   state.bookMarks = JSON.parse(bookMarks);;
}

const init = () => getBookMark()

init();