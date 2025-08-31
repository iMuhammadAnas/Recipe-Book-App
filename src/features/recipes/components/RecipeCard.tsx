import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteRecipe, toggleFavorite } from "../recipesSlice";
import ConfirmDialog from "./ConfirmDialog";
import { useNavigate } from "react-router-dom";

interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string;
  image?: string;
  category?: string;
  favorite?: boolean;
}

interface Props {
  recipe: Recipe;
}

const RecipeCard: React.FC<Props> = ({ recipe }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white shadow rounded-xl p-4 flex flex-col">
      {/* ✅ Clickable area for navigation */}
      <div
        onClick={() => navigate(`/recipe/${recipe.id}`)}
        className="cursor-pointer"
      >
        {recipe.image && (
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-40 object-cover rounded-md"
          />
        )}
        <h3 className="text-lg font-bold mt-3">{recipe.name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {recipe.instructions}
        </p>
      </div>

      {/* Buttons (don’t trigger navigation) */}
      <div className="flex justify-between items-center mt-4">
        <button
          className={`px-3 py-1 rounded-md text-sm cursor-pointer ${
            recipe.favorite ? "bg-yellow-400" : "bg-gray-200"
          }`}
          onClick={() => dispatch(toggleFavorite(recipe.id))}
        >
          {recipe.favorite ? "★ Favorite" : "☆ Favorite"}
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded-md text-sm cursor-pointer"
          onClick={() => setOpen(true)}
        >
          Delete
        </button>
      </div>

      {open && (
        <ConfirmDialog
          title="Delete Recipe?"
          message={`Are you sure you want to delete "${recipe.name}"?`}
          onConfirm={() => {
            dispatch(deleteRecipe(recipe.id));
            setOpen(false);
          }}
          onCancel={() => setOpen(false)}
        />
      )}
    </div>
  );
};

export default RecipeCard;
