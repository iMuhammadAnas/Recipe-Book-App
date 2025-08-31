import React from "react";
import { useDispatch } from "react-redux";
import { addRecipe } from "../features/recipes/recipesSlice";
import RecipeForm from "../features/recipes/components/RecipeForm";
import { useNavigate } from "react-router-dom";

const AddRecipe: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddRecipe = (recipe: any) => {
    dispatch(addRecipe(recipe));
    navigate("/"); // ✅ Redirect only once
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Add New Recipe</h1>
      <RecipeForm onSubmit={handleAddRecipe} />
    </div>
  );
};

export default AddRecipe;
