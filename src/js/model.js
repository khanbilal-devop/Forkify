import { API_URL,TIME_OUT_SECONDS } from "./constant";
import { timeout } from "./helper";

export const state = {
    recipe: {}
}


export const fetchRecipe = async (id) => {
    const response = await Promise.race([fetch(`${API_URL}${id}`),timeout(TIME_OUT_SECONDS)]);
    // 5ed6604591c37cdc054bc880
    const data = await response.json();
    if (!response.ok) throw new Error(`Status : ${response?.status} \n${data?.message}`)
    recipe = data?.data?.recipe;
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

