import type { RootState } from "../../app/store";

export const selectAllRecipes = (state: RootState) => state.recipes.items;

export const selectRecipeById = (state: RootState, id: string) =>
  state.recipes.items.find((recipe) => recipe.id === id);

export const selectRecipesByCategory = (state: RootState, category: string) => {
  if (category === "fav") {
    return state.recipes.items.filter((recipe) => recipe.favorite);
  }
  return category
    ? state.recipes.items.filter((recipe) => recipe.category === category)
    : state.recipes.items;
};

export const searchRecipes = (state: RootState, query: string) =>
  state.recipes.items.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(query.toLowerCase()) ||
      recipe.ingredients.some((ing) =>
        ing.toLowerCase().includes(query.toLowerCase())
      )
  );
