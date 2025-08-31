import type { RootState } from "../../app/store";

export const selectAllRecipes = (state: RootState) => state.recipes.items;

export const selectRecipeById = (state: RootState, id: string) =>
  state.recipes.items.find((recipe) => recipe.id === id);

export const selectRecipesByCategory = (state: RootState, category: string) =>
  state.recipes.items.filter((recipe) => recipe.category === category);

export const selectFavoriteRecipes = (state: RootState) =>
  state.recipes.items.filter((recipe) => recipe.favorite);

export const searchRecipes = (state: RootState, query: string) =>
  state.recipes.items.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(query.toLowerCase()) ||
      recipe.ingredients.some((ing) =>
        ing.toLowerCase().includes(query.toLowerCase())
      )
  );
