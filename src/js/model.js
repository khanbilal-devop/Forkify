import { API_URL, PAGINATION_LIMIT } from "./constant";
import { getJson } from "./helper";

export const state = {
    recipe: {},
    search: {
        recipes: [],
        paginatedRecipes: [],
        currentPage: 1,
        totalPage: 1,
        paginationLimit: PAGINATION_LIMIT
    }
}


export const fetchRecipe = async (id) => {
    const data = await getJson(`${API_URL}${id}`)
    let { recipe } = data?.data;
    recipe = {
        id: recipe?.id,
        title: recipe?.title,
        publisher: recipe?.publisher,
        sourceUrl: recipe?.source_url,
        image: recipe?.image_url,
        servings: recipe?.servings,
        cookingTime: recipe?.cooking_time,
        ingredients: recipe?.ingredients
    }
    state.recipe = recipe;
}


export const searchRecipe = async (query = "pizza") => {
    let { search } = state;
    const data = await getJson(`${API_URL}?search=${query}&key=acf9a8df-9ca2-4d85-8754-bc5e62d6e052`)
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
            title: each?.title

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

