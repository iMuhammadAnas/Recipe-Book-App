"use client";
import React from "react";
import RecipeCard from "./RecipeCard";


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
  recipes: Recipe[];
}

const RecipeGrid: React.FC<Props> = ({ recipes }) => {
  if (recipes.length === 0) {
    return <p className="text-center text-gray-500">No recipes found.</p>;
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeGrid;
