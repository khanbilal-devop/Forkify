import { API_URL } from "./constant";
import { getJson } from "./helper";

export const state = {
    recipe: {},
    search: []
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
    const data = await getJson(`${API_URL}?search=${query}&key=acf9a8df-9ca2-4d85-8754-bc5e62d6e052`)
    let { recipes } = data?.data;
    recipes = (recipes || []).map(each => {
        return {
            id: each?.id,
            imageUrl: each?.image_url,
            publisher: each?.publisher,
            title: each?.title

        }
    })
    state['search'] = recipes;
}
