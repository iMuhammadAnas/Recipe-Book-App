import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


export interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string;
  image?: string;
  category?: string;
  favorite?: boolean;
}

interface RecipesState {
  items: Recipe[];
}

const initialState: RecipesState = {
  items: [],
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    addRecipe: (state, action: PayloadAction<Recipe>) => {
      state.items.unshift(action.payload);
    },
    updateRecipe: (state, action: PayloadAction<Recipe>) => {
      const index = state.items.findIndex((r) => r.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteRecipe: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((r) => r.id !== action.payload);
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const recipe = state.items.find((r) => r.id === action.payload);
      if (recipe) {
        recipe.favorite = !recipe.favorite;
      }
    },
  },
});

export const { addRecipe, updateRecipe, deleteRecipe, toggleFavorite } =
  recipesSlice.actions;
export default recipesSlice.reducer;
