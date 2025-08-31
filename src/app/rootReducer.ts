import { combineReducers } from "redux";
import recipesReducer from "../features/recipes/recipesSlice";

const rootReducer = combineReducers({
  recipes: recipesReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
