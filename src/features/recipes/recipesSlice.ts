import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Recipe type
export interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string;
  image?: string;
  category?: string;
  favorite?: boolean;
}

// State type
interface RecipesState {
  items: Recipe[];
  loading: boolean;
  error: string | null;
}

const initialState: RecipesState = {
  items: [],
  loading: false,
  error: null,
};

// Fetch recipes from API
export const fetchRecipes = createAsyncThunk<Recipe[]>(
  "recipes/fetchRecipes",
  async () => {
    const res = await fetch("https://dummyjson.com/recipes");
    const data = await res.json();

    return data.recipes.map((r: any) => ({
      id: r.id.toString(),
      name: r.name,
      ingredients: r.ingredients,
      instructions: r.instructions,
      image: r.image,
      category: r.cuisine,
      favorite: false,
    }));
  }
);

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    addRecipe: (state, action: PayloadAction<Recipe>) => {
      if (!state.items.some((r) => r.id === action.payload.id)) {
        state.items.unshift(action.payload);
      }
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch recipes";
      });
  },
});

export const { addRecipe, updateRecipe, deleteRecipe, toggleFavorite } =
  recipesSlice.actions;
export default recipesSlice.reducer;
