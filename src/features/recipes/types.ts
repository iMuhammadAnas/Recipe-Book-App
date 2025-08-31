export interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string;
  image?: string;
  category?: string;
  favorite?: boolean;
}

export interface RecipesState {
  items: Recipe[];
}
